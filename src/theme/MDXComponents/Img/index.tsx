import React, {type ComponentProps, type ReactNode} from 'react';
import clsx from 'clsx';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useIsBrowser from '@docusaurus/useIsBrowser';
import {useColorMode} from '@docusaurus/theme-common';

/**
 * Images in Markdown.
 *
 * Swizzled from theme-classic so that a guide screenshot follows the site
 * theme. The app has a light theme and a dark one; a reader on a light screen
 * was shown a black phone for every step, which reads as a different app from
 * the one in their hand.
 *
 * The pairing is a file-naming convention and the Markdown knows nothing about
 * it: `vault-list.webp` is the dark shot, `vault-list-light.webp` is the same
 * screen in light. Which screens have a light twin is decided at build time in
 * `docusaurus.config.ts`, which reads the directory - so a screen shot in only
 * one theme (the Android autofill picker, the splash) keeps the single image it
 * has, and adding the missing shot later needs no edit here or in the docs.
 *
 * A name that spells out `-light` or `-dark` is left alone. That is the escape
 * for the place where the theme is the subject rather than the frame: the
 * Settings guide shows the app side by side in both themes to explain the Theme
 * setting, and that pair must not follow the reader.
 */

const EXT = '.webp';

/**
 * The guide name behind an image URL.
 *
 * By the time this runs the src is no longer the `/img/guide/vault-list.webp`
 * written in the Markdown: Docusaurus resolves Markdown images against
 * `static/`, hands them to webpack, and what arrives here is
 * `/assets/images/vault-list-<contenthash>.webp`. The name is still in there,
 * in front of the hash. Whatever comes back is checked against the real
 * directory listing before it is used, so a guess that lands on nothing simply
 * leaves the image as it came in.
 */
function guideName(src: string): string | undefined {
  if (!src.endsWith(EXT)) {
    return undefined;
  }
  const file = src.slice(src.lastIndexOf('/') + 1, -EXT.length);
  return file.replace(/-[0-9a-f]{8,}$/, '');
}

function Img(props: ComponentProps<'img'>): ReactNode {
  // eslint-disable-next-line jsx-a11y/alt-text
  return <img decoding="async" loading="lazy" {...props} />;
}

export default function MDXImg(props: ComponentProps<'img'>): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  const {colorMode} = useColorMode();
  const isBrowser = useIsBrowser();

  const shots = (siteConfig.customFields?.guideShots ?? []) as string[];
  const name = guideName(props.src ?? '');
  const twin = `${name}-light`;
  // The twin is served straight from `static/`, which webpack never sees, so
  // there is no content hash to borrow - the URL is the path it sits at.
  const twinUrl = useBaseUrl(`/img/guide/${twin}${EXT}`);

  if (name === undefined || !shots.includes(name)) {
    return <Img {...props} />;
  }

  // A name that spells out its theme is literal; only a bare one has a twin.
  const paired =
    !name.endsWith('-light') && !name.endsWith('-dark') && shots.includes(twin);

  if (!paired) {
    return <Img {...props} className={clsx(props.className, 'guideShot')} />;
  }

  // Both variants are rendered server-side and one is hidden in CSS, because
  // choosing just one needs the reader's theme, which the server does not have.
  // Picking there would mean a flash of the wrong theme on first paint, on the
  // images this guide is mostly made of. After hydration only the one in use is
  // left in the DOM, so the browser fetches a single image.
  const themes = isBrowser ? [colorMode] : ['light', 'dark'];
  return (
    <>
      {themes.map((theme) => (
        <Img
          {...props}
          key={theme}
          src={theme === 'light' ? twinUrl : props.src}
          className={clsx(
            props.className,
            'guideShot',
            'themedShot',
            `themedShot--${theme}`,
          )}
        />
      ))}
    </>
  );
}
