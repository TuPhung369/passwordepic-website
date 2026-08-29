import React, {type ReactNode} from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import StarToc from '@site/src/components/StarToc';

/**
 * Wraps every page. Root is the one theme component that survives outside the
 * router's page components, which is what the star contents panel needs: it is
 * global chrome, not part of any single page.
 *
 * `BrowserOnly` because StarToc decides whether to render at all by counting
 * headings in the DOM. Server-side that count is zero, so pre-rendering it
 * would emit nothing and then hydrate into something - a mismatch React logs on
 * every page load.
 */
export default function Root({children}: {children: ReactNode}): ReactNode {
  return (
    <>
      {children}
      <BrowserOnly>{() => <StarToc />}</BrowserOnly>
    </>
  );
}
