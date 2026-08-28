import React, {type ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Translate, {translate} from '@docusaurus/Translate';

/**
 * Landing page.
 *
 * Written for one job: convince a sceptical reader that their data really is
 * theirs alone. Two things do that, and neither is a slogan.
 *
 * 1. **Show the mechanism.** Every password manager claims "only you can see
 *    your data". What separates a credible claim from marketing is a specific,
 *    checkable structure - so the key split is on the page, including the row
 *    where the server *does* momentarily handle one share. A table that admits
 *    something is a table a reader believes.
 *
 * 2. **State the cost.** "We cannot recover your vault" is the strongest
 *    evidence here, not a disclaimer: a service able to restore a vault is a
 *    service able to read it. It belongs near the top, in those words.
 *
 * The fastest way to lose this audience is one discoverable overstatement, so
 * every claim traces back to the app repository. See CLAUDE.md.
 *
 * Every string carries an explicit `id`. Without one the extractor keys a
 * translation by its English text, so the day someone fixes a typo here every
 * other language silently reverts to English. Ids also keep the multi-line JSX
 * formatting below out of the lookup entirely.
 */

/**
 * A table cell whose first word carries the weight - "Never".
 *
 * Kept as two fields rather than markup inside one translated string: the
 * emphasised word is its own unit for translators, and word order around it
 * differs by language.
 */
type Cell = {emphasis: string; rest: string};

function EmphasisCell({cell}: {cell: Cell}): ReactNode {
  return (
    <>
      <strong>{cell.emphasis}</strong> {cell.rest}
    </>
  );
}

export default function Home(): ReactNode {
  // Built inside the component rather than at module scope: `translate()` reads
  // the locale of the page being rendered, and module-level constants are
  // evaluated once for the whole build - which would freeze every locale on
  // whichever one happened to render first.
  const controls = [
    {
      id: 'reset',
      title: translate({
        id: 'home.controls.reset.title',
        message: 'Erase everything, immediately',
      }),
      body: translate({
        id: 'home.controls.reset.body',
        message:
          'Settings → Reset Account wipes the vault and your account data from our servers. No queue, no retention window, no support ticket.',
      }),
    },
    {
      id: 'backup',
      title: translate({
        id: 'home.controls.backup.title',
        message: 'Backups go to your Drive',
      }),
      body: translate({
        id: 'home.controls.backup.body',
        message:
          'Not ours. Backup files are written to your own Google Drive account, encrypted. We never receive them.',
      }),
    },
    {
      id: 'device',
      title: translate({
        id: 'home.controls.device.title',
        message: 'You can see which device holds the account',
      }),
      body: translate({
        id: 'home.controls.device.body',
        message:
          'On paid tiers an account runs on one device at a time, and the app names the device holding it. A second sign-in is refused, not quietly allowed.',
      }),
    },
    {
      id: 'autofill',
      title: translate({
        id: 'home.controls.autofill.title',
        message: 'Nothing is filled without you',
      }),
      body: translate({
        id: 'home.controls.autofill.body',
        message:
          'Every autofill is gated behind a fingerprint or passcode check, every time.',
      }),
    },
  ];

  const never = translate({id: 'home.never', message: 'Never'});

  return (
    <Layout
      title={translate({
        id: 'home.meta.title',
        message: 'A password manager that cannot read your passwords',
      })}
      description={translate({
        id: 'home.meta.description',
        message:
          'Hardware-backed, zero-knowledge password manager for Android. Your passcode never leaves your device, and the vault key cannot be assembled without it.',
      })}>
      <header className="heroBanner">
        <h1 className="heroTitle">
          <Translate id="home.hero.title">
            A password manager that cannot read your passwords
          </Translate>
        </h1>
        <p className="heroSubtitle">
          <Translate id="home.hero.subtitle">
            Not as a promise — as a consequence of how the key is built. One
            share of it is created inside your phone&apos;s secure hardware and
            can never leave, so the vault key cannot be assembled anywhere but on
            your device, at the moment you unlock it.
          </Translate>
        </p>
        <Link
          className="button button--primary button--lg"
          to="/docs/how-it-works">
          <Translate id="home.hero.cta">See exactly how</Translate>
        </Link>
      </header>

      <main>
        <div className="sectionNarrow">
          <h2>
            <Translate id="home.who.heading">Who can see what</Translate>
          </h2>
          <p>
            <Translate id="home.who.intro">
              The interesting rows are the ones where the answer is
              &ldquo;never&rdquo; — and the one where it is not.
            </Translate>
          </p>
          <table>
            <thead>
              <tr>
                <th>
                  <Translate id="home.who.col.data">Data</Translate>
                </th>
                <th>
                  <Translate id="home.who.col.device">Your device</Translate>
                </th>
                <th>
                  <Translate id="home.who.col.server">Our servers</Translate>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <Translate id="home.who.passwords">Your passwords</Translate>
                </td>
                <td>
                  <Translate id="home.who.passwords.device">
                    Decrypted only while you are looking at them
                  </Translate>
                </td>
                <td>
                  <EmphasisCell
                    cell={{
                      emphasis: never,
                      rest: translate({
                        id: 'home.who.passwords.server',
                        message: '— encrypted entries are not uploaded',
                      }),
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <Translate id="home.who.passcode">Your passcode</Translate>
                </td>
                <td>
                  <Translate id="home.who.passcode.device">
                    Held only long enough to derive a key
                  </Translate>
                </td>
                <td>
                  <EmphasisCell
                    cell={{
                      emphasis: never,
                      rest: translate({
                        id: 'home.who.passcode.server',
                        message: '— it is not transmitted',
                      }),
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <Translate id="home.who.share1">Key share 1</Translate>
                </td>
                <td>
                  <Translate id="home.who.share1.device">
                    Created inside StrongBox/TEE, non-exportable
                  </Translate>
                </td>
                <td>
                  <EmphasisCell
                    cell={{
                      emphasis: never,
                      rest: translate({
                        id: 'home.who.share1.server',
                        message: '— this is what makes the rest hold',
                      }),
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <Translate id="home.who.share2">Key share 2</Translate>
                </td>
                <td>
                  <Translate id="home.who.share2.device">
                    Stored encrypted
                  </Translate>
                </td>
                <td>
                  <Translate id="home.who.share2.server">
                    Handled briefly during key derivation, and stored encrypted.
                    Useless without share 1
                  </Translate>
                </td>
              </tr>
              <tr>
                <td>
                  <Translate id="home.who.account">
                    Email, device model, security events
                  </Translate>
                </td>
                <td>—</td>
                <td>
                  <Translate id="home.who.account.server">
                    Yes — to run your account and refuse abuse
                  </Translate>
                </td>
              </tr>
            </tbody>
          </table>
          <p>
            <em>
              <Translate id="home.who.footnote">
                We list that fourth row rather than rounding it away. Our servers
                do handle one share of the key — and still cannot open your
                vault, because share 1 has never existed anywhere but your phone.
              </Translate>
            </em>
          </p>

          <h2>
            <Translate id="home.proof.heading">
              The proof is what we cannot do
            </Translate>
          </h2>
          <div className="admonition admonition-warning alert alert--warning">
            <div className="admonition-content">
              <p>
                <strong>
                  <Translate id="home.proof.lead">
                    There is no account recovery. If you forget your passcode or
                    lose the device, the vault is gone.
                  </Translate>
                </strong>
              </p>
              <p>
                <Translate id="home.proof.body">
                  No reset link, no recovery question, no support override — and
                  no way for us to be compelled into one. A service able to
                  restore your vault is a service able to read it; this is the
                  same fact stated from the other side.
                </Translate>
              </p>
              <p>
                <Translate id="home.proof.backups">
                  Backups and exports carry a layer tied to the device that wrote
                  them, so they open only there. Please keep that in mind before
                  the app becomes your only copy of something critical.
                </Translate>
              </p>
            </div>
          </div>

          <h2>
            <Translate id="home.controls.heading">What you control</Translate>
          </h2>
        </div>

        <div className="featureGrid">
          {controls.map(c => (
            <div className="featureCard" key={c.id}>
              <h3>{c.title}</h3>
              <p>{c.body}</p>
            </div>
          ))}
        </div>

        <div className="sectionNarrow">
          <h2>
            <Translate id="home.tiers.heading">
              Choose how much protection you want
            </Translate>
          </h2>
          <table>
            <thead>
              <tr>
                <th>
                  <Translate id="home.tiers.col.tier">Tier</Translate>
                </th>
                <th>
                  <Translate id="home.tiers.col.encryption">
                    Encryption
                  </Translate>
                </th>
                <th>
                  <Translate id="home.tiers.col.extras">Extras</Translate>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  🥈 <strong>Silver</strong>
                  <br />
                  <Translate id="home.tiers.free">Free</Translate>
                </td>
                <td>
                  <Translate id="home.tiers.silver.encryption">
                    AES-256-CTR with HMAC-SHA256, in software
                  </Translate>
                </td>
                <td>
                  <Translate id="home.tiers.silver.extras">
                    Unlimited devices
                  </Translate>
                </td>
              </tr>
              <tr>
                <td>
                  🥇 <strong>Gold</strong>
                </td>
                <td>
                  <Translate id="home.tiers.gold.encryption">
                    AES-256-GCM in native code, StrongBox/TEE-backed keys
                  </Translate>
                </td>
                <td>
                  <Translate id="home.tiers.gold.extras">
                    Cloud key share, one device per account
                  </Translate>
                </td>
              </tr>
              <tr>
                <td>
                  💎 <strong>Platinum</strong>
                </td>
                <td>
                  <Translate id="home.tiers.sameAsGold">Same as Gold</Translate>
                </td>
                <td>
                  <Translate id="home.tiers.platinum.extras">
                    Device attestation, certificate pinning, overlay and tamper
                    detection
                  </Translate>
                </td>
              </tr>
              <tr>
                <td>
                  🛡️ <strong>Titanium</strong>
                </td>
                <td>
                  <Translate id="home.tiers.sameAsGold">Same as Gold</Translate>
                </td>
                <td>
                  <Translate id="home.tiers.titanium.extras">
                    OPAQUE zero-knowledge protocol in Rust — the server never
                    sees anything derived from your passcode
                  </Translate>
                </td>
              </tr>
            </tbody>
          </table>
          <p>
            <em>
              <Translate id="home.tiers.footnote">
                Silver runs in JavaScript and does not use hardware key storage.
                The paid tiers move encryption into native code with
                hardware-backed keys.
              </Translate>
            </em>
          </p>

          <h2>
            <Translate id="home.availability.heading">Availability</Translate>
          </h2>
          <p>
            <strong>
              <Translate id="home.availability.lead">
                Android 7.0 and above.
              </Translate>
            </strong>{' '}
            <Translate id="home.availability.body">
              Hardware-backed tiers need a device with StrongBox or a TEE;
              screen-recording protection during passcode entry requires Android
              15. There is no iOS version.
            </Translate>
          </p>
        </div>
      </main>
    </Layout>
  );
}
