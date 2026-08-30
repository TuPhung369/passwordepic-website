import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useLocation} from '@docusaurus/router';
import {translate} from '@docusaurus/Translate';
import {FaStar} from 'react-icons/fa';
import styles from './styles.module.css';

/**
 * A floating table of contents behind a single star.
 *
 * Replaces Docusaurus' right-hand TOC column, which costs ~250px of width on
 * every page to show something a reader consults occasionally. Collapsed it is
 * one 40px button; open it is a panel over the content.
 *
 * A mouse opens it on hover, the way the sample project's does; a finger opens
 * it on tap. Because the panel grows out of the button rather than sitting
 * below it, there is no gap for a travelling pointer to fall through.
 *
 * Hover is gated on `pointerType === 'mouse'` rather than on a
 * `(hover: hover)` media query, and that distinction was a real bug rather
 * than a preference. Phones report `hover: hover` more often than you would
 * think - with "Request desktop site" on, with a mouse or stylus ever paired,
 * in DeX, in some in-app browsers - and where they do, a tap fires an emulated
 * `mouseenter` that opened the panel, and then the `click` toggled it straight
 * back shut. The button looked dead, on some phones and not others, with
 * nothing about the page to explain it. `pointerType` is the direct signal:
 * a finger is always `touch`, whatever the media query claims.
 *
 * It reads the DOM rather than the route's TOC data on purpose: this renders
 * from `src/theme/Root`, which sits outside the doc plugin's context and has no
 * access to that data. Headings are what a reader sees anyway, so scanning them
 * keeps Markdown pages, doc pages and hand-written React pages on one code
 * path.
 */

type Entry = {id: string; text: string; level: number};

/**
 * A heading's own text, without the anchor link Docusaurus appends to it.
 *
 * That link's content is a zero-width space, so `textContent` alone silently
 * appends U+200B to every label. Removing the element beats stripping the
 * character: it survives Docusaurus changing what it puts in there, and keeps
 * an invisible literal out of this file.
 */
function headingText(el: HTMLElement): string {
  const clone = el.cloneNode(true) as HTMLElement;
  clone.querySelectorAll('.hash-link').forEach(a => a.remove());
  return (clone.textContent ?? '').trim();
}

export default function StarToc(): React.ReactNode {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<number | null>(null);
  const {pathname, hash} = useLocation();

  const cancelClose = useCallback(() => {
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  useEffect(() => cancelClose, [cancelClose]);

  const collect = useCallback(() => {
    const main = document.querySelector('main');
    if (!main) {
      setEntries([]);
      return;
    }
    const found = Array.from(main.querySelectorAll<HTMLElement>('h2[id], h3[id]'))
      .filter(el => el.id && el.offsetParent !== null)
      .map(el => ({
        id: el.id,
        text: headingText(el),
        level: Number(el.tagName[1]),
      }))
      .filter(e => e.text.length > 0);
    setEntries(found);
  }, []);

  // Re-scan per route. The observer covers the rest: MDX content and the
  // client-side route transition both land after this effect runs.
  useEffect(() => {
    setOpen(false);
    collect();
    const main = document.querySelector('main');
    if (!main) {
      return undefined;
    }
    const observer = new MutationObserver(collect);
    observer.observe(main, {childList: true, subtree: true});
    return () => observer.disconnect();
  }, [pathname, collect]);

  // Highlight the heading the reader is actually under. rootMargin pins the
  // trigger line near the top of the viewport so a heading counts as current
  // once it reaches the navbar, not when it first peeks in from the bottom.
  useEffect(() => {
    if (entries.length === 0) {
      return undefined;
    }
    const observer = new IntersectionObserver(
      records => {
        const visible = records
          .filter(r => r.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      {rootMargin: '-80px 0px -70% 0px', threshold: 0},
    );
    entries.forEach(e => {
      const el = document.getElementById(e.id);
      if (el) {
        observer.observe(el);
      }
    });
    return () => observer.disconnect();
  }, [entries]);

  useEffect(() => {
    if (hash) {
      setActiveId(hash.replace('#', ''));
    }
  }, [hash]);

  // Outside click and Escape. Both are registered only while open so the page
  // carries no listeners in its resting state.
  useEffect(() => {
    if (!open) {
      return undefined;
    }
    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('touchstart', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('touchstart', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  // A page with one or two headings does not need a contents panel, and an
  // empty one would be a button that opens nothing.
  if (entries.length < 3) {
    return null;
  }

  const label = translate({
    id: 'starToc.label',
    message: 'Contents',
    description: 'Label for the floating table-of-contents button',
  });

  const jump = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) {
      return;
    }
    setActiveId(id);
    cancelClose();
    setOpen(false);
    el.scrollIntoView({behavior: 'smooth', block: 'start'});
    // Keep the URL shareable without letting the browser's own jump fight the
    // smooth scroll above.
    window.history.replaceState(null, '', `#${id}`);
  };

  return (
    <div
      ref={containerRef}
      className={styles.container}
      data-open={open || undefined}
      onPointerEnter={e => {
        if (e.pointerType !== 'mouse') {
          return;
        }
        cancelClose();
        setOpen(true);
      }}
      onPointerLeave={e => {
        if (e.pointerType !== 'mouse') {
          return;
        }
        // Closing on a delay, rather than immediately, is what stops the
        // flicker at the edges of the closed circle. The trigger is round
        // and the open panel is a rounded rectangle, so a pointer resting a
        // pixel or two inside one shape can be outside the other: it opens,
        // the shape changes underneath the pointer, the leave fires, it
        // closes, and the loop runs at frame rate. A short grace period
        // means the pointer is back inside before the close would run.
        cancelClose();
        closeTimer.current = window.setTimeout(() => setOpen(false), 220);
      }}>
      {/* One element in two states rather than a button with a panel hanging
          off it: closed it is the star, open it becomes the panel's header.
          The previous shape put a star in the button and another in the panel
          header directly below it, which read as a duplicate. */}
      <button
        type="button"
        className={styles.trigger}
        aria-expanded={open}
        aria-label={label}
        title={label}
        onClick={() => setOpen(v => !v)}>
        <FaStar aria-hidden />
        <span className={styles.triggerLabel}>{label}</span>
      </button>

      <div className={styles.panel} role="navigation" aria-label={label} hidden={!open}>
        <ul className={styles.list}>
          {entries.map(entry => (
            <li key={entry.id}>
              <a
                href={`#${entry.id}`}
                onClick={e => jump(e, entry.id)}
                className={styles.link}
                data-level={entry.level}
                data-active={entry.id === activeId || undefined}>
                {entry.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
