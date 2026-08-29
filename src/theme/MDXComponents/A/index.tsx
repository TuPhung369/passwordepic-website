import React, {type ComponentProps, type ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {useAnchorTargetClassName} from '@docusaurus/theme-common';

/**
 * Links in Markdown.
 *
 * Swizzled from theme-classic for one reason: `@docusaurus/Link` adds
 * `target="_blank"` to every link it considers external, and it counts
 * `mailto:` and `tel:` as external.
 *
 * That combination is bad on a desktop. The browser opens a blank tab, hands
 * the address to the operating system, and then - if no mail client is
 * configured, which is the normal state of a laptop where someone uses webmail
 * - leaves the reader looking at an empty tab and nothing else. On a phone it
 * is masked, because Android always has a mail app registered.
 *
 * `target={undefined}` wins because Link spreads its own props last, so the
 * attribute is simply not rendered and the click stays in the current tab: the
 * OS handler opens if there is one, and nothing happens if there is not.
 */
export default function MDXA(props: ComponentProps<'a'>): ReactNode {
  // MDX footnotes have ids such as <a id="user-content-fn-1-953011" ...>
  const anchorTargetClassName = useAnchorTargetClassName(props.id);
  const isHandoff = /^(mailto:|tel:)/i.test(props.href ?? '');
  return (
    <Link
      {...props}
      {...(isHandoff && {target: undefined})}
      className={clsx(anchorTargetClassName, props.className)}
    />
  );
}
