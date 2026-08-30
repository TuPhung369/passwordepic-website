import React, {type ReactNode} from 'react';
import Layout from '@theme/Layout';
import {translate} from '@docusaurus/Translate';

import Hero from '@site/src/components/home/Hero';
import Stats from '@site/src/components/home/Stats';
import Visibility from '@site/src/components/home/Visibility';
import {UnlockFlow, AutofillFlow} from '@site/src/components/home/Flows';
import Threats from '@site/src/components/home/Threats';
import Tiers from '@site/src/components/home/Tiers';
import Limits from '@site/src/components/home/Limits';
import CallToAction from '@site/src/components/home/CallToAction';

/**
 * Landing page.
 *
 * Written for one job: convince a sceptical reader that their data really is
 * theirs alone. Two things do that, and neither is a slogan.
 *
 * 1. **Show the mechanism.** Every password manager claims "only you can see
 *    your data". What separates a credible claim from marketing is a specific,
 *    checkable structure - so the key split is on the page, including the row
 *    where the server *does* momentarily handle one shard. A table that admits
 *    something is a table a reader believes.
 *
 * 2. **State the cost.** "We cannot recover your vault" is the strongest
 *    evidence here, not a disclaimer: a service able to restore a vault is a
 *    service able to read it.
 *
 * Section order follows that argument: the claim, the numbers behind it, who
 * sees what, how the key is actually built, then every worry a reader brings
 * with them answered one at a time, how a fill works, which tier does which,
 * and finally - before any call to action - what it costs you.
 *
 * The threats section deliberately replaced a feature grid. Listing StrongBox,
 * Play Integrity and certificate pinning as capabilities meant the strongest
 * part of this product read as jargon to everyone who is not already a security
 * engineer, which is nearly every reader.
 *
 * The fastest way to lose this audience is one discoverable overstatement, so
 * every claim traces back to the app repository. See CLAUDE.md, especially the
 * four claims that read naturally and are false.
 *
 * Every string carries an explicit `id`. Without one the extractor keys a
 * translation by its English text, so the day someone fixes a typo here every
 * other language silently reverts to English.
 */
export default function Home(): ReactNode {
  return (
    <Layout
      title={translate({
        id: 'home.meta.title',
        message: 'A password manager that cannot read your passwords',
      })}
      description={translate({
        id: 'home.meta.description',
        message:
          'Hardware-backed, zero-knowledge password manager for Android. Your passcode never leaves your device, and the DEK cannot be assembled without it.',
      })}>
      <Hero />
      <main>
        <Stats />
        <Visibility />
        <UnlockFlow />
        <Threats />
        <AutofillFlow />
        <Tiers />
        <Limits />
        <CallToAction />
      </main>
    </Layout>
  );
}
