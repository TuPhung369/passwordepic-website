import React, {type ComponentProps, type ReactNode} from 'react';

/**
 * The language switcher's icon.
 *
 * Swizzled to replace Docusaurus' default, which is the "translate" glyph -
 * a CJK character beside a Latin A. That reads as *translation*, an action
 * performed on text, rather than as *this page exists in other languages*.
 * A globe is the convention every reader already knows from every other site.
 *
 * Drawn as meridians and parallels rather than a filled world map: at 20px a
 * map is a smudge, and a wireframe globe stays legible at any size and in
 * either theme, because it is strokes in `currentColor`.
 */
export default function IconLanguage({
  // 22 rather than Docusaurus' 20: the colour-mode toggle beside this renders
  // its glyph in a 24px box, and at 20 the globe read as the smaller of a pair
  // that should look like one control. Not 24, because a full circle fills its
  // box where a crescent moon does not.
  width = 22,
  height = 22,
  ...props
}: ComponentProps<'svg'>): ReactNode {
  return (
    <svg
      viewBox="0 0 24 24"
      width={width}
      height={height}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}>
      <circle cx="12" cy="12" r="9.25" />
      <path d="M2.75 12h18.5" />
      {/* The two curves that make it read as a sphere rather than a target. */}
      <path d="M12 2.75a14 14 0 0 1 0 18.5" />
      <path d="M12 2.75a14 14 0 0 0 0 18.5" />
      <path d="M4.6 6.4a15 15 0 0 0 14.8 0" />
      <path d="M4.6 17.6a15 15 0 0 1 14.8 0" />
    </svg>
  );
}
