import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import isInternalUrl from '@docusaurus/isInternalUrl';
import IconExternalLink from '@theme/Icon/ExternalLink';
import type {Props} from '@theme/Footer/LinkItem';

/**
 * Footer links.
 *
 * Swizzled for the same reason as MDXComponents/A: `mailto:` counts as an
 * external link, so Docusaurus opens a blank tab before handing off to the
 * operating system. See that file for why that is worse than it sounds.
 *
 * The external-link glyph is dropped for those too - it promises a page that
 * is about to open, and a mail address does not open one.
 */
export default function FooterLinkItem({item}: Props): ReactNode {
  const {to, href, label, prependBaseUrlToHref, className, ...props} = item;
  const toUrl = useBaseUrl(to);
  const normalizedHref = useBaseUrl(href, {forcePrependBaseUrl: true});
  const isHandoff = /^(mailto:|tel:)/i.test(href ?? '');

  return (
    <Link
      className={clsx('footer__link-item', className)}
      {...(href
        ? {href: prependBaseUrlToHref ? normalizedHref : href}
        : {to: toUrl})}
      {...props}
      {...(isHandoff && {target: undefined})}>
      {label}
      {href && !isInternalUrl(href) && !isHandoff && <IconExternalLink />}
    </Link>
  );
}
