import React, {type ReactNode} from 'react';

/**
 * The one section shape the landing page uses: optional eyebrow, heading,
 * standfirst, elemental underline, then content.
 *
 * Layout classes live in src/css/custom.css rather than a module here because
 * the Markdown pages reuse them too, and a CSS module's hashed names are not
 * reachable from Markdown.
 */
export function Section({
  sunken,
  children,
}: {
  sunken?: boolean;
  children: ReactNode;
}): ReactNode {
  return (
    <section className={sunken ? 'peSection peSectionSunken' : 'peSection'}>
      <div className="peInner">{children}</div>
    </section>
  );
}

export function SectionHead({
  id,
  eyebrow,
  title,
  lead,
}: {
  /** Anchors the section and puts it in the floating star contents panel,
   *  which indexes `h2[id]`. This page is long enough to need it. */
  id: string;
  eyebrow?: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
}): ReactNode {
  return (
    <div className="peSectionHead">
      {eyebrow ? <div className="peEyebrow">{eyebrow}</div> : null}
      <h2 id={id}>{title}</h2>
      {lead ? <p>{lead}</p> : null}
      <div className="peUnderline" />
    </div>
  );
}
