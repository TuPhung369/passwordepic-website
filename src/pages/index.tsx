import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

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
 */

const controls = [
  {
    title: 'Erase everything, immediately',
    body: 'Settings → Reset Account wipes the vault and your account data from our servers. No queue, no retention window, no support ticket.',
  },
  {
    title: 'Backups go to your Drive',
    body: 'Not ours. Backup files are written to your own Google Drive account, encrypted. We never receive them.',
  },
  {
    title: 'You can see which device holds the account',
    body: 'On paid tiers an account runs on one device at a time, and the app names the device holding it. A second sign-in is refused, not quietly allowed.',
  },
  {
    title: 'Nothing is filled without you',
    body: 'Every autofill is gated behind a fingerprint or passcode check, every time.',
  },
];

export default function Home(): JSX.Element {
  return (
    <Layout
      title="A password manager that cannot read your passwords"
      description="Hardware-backed, zero-knowledge password manager for Android. Your passcode never leaves your device, and the vault key cannot be assembled without it.">
      <header className="heroBanner">
        <h1 className="heroTitle">
          A password manager that cannot read your passwords
        </h1>
        <p className="heroSubtitle">
          Not as a promise — as a consequence of how the key is built. One share
          of it is created inside your phone&apos;s secure hardware and can never
          leave, so the vault key cannot be assembled anywhere but on your
          device, at the moment you unlock it.
        </p>
        <Link className="button button--primary button--lg" to="/docs/how-it-works">
          See exactly how
        </Link>
      </header>

      <main>
        <div className="sectionNarrow">
          <h2>Who can see what</h2>
          <p>
            The interesting rows are the ones where the answer is
            &ldquo;never&rdquo; — and the one where it is not.
          </p>
          <table>
            <thead>
              <tr>
                <th>Data</th>
                <th>Your device</th>
                <th>Our servers</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Your passwords</td>
                <td>Decrypted only while you are looking at them</td>
                <td><strong>Never</strong> — encrypted entries are not uploaded</td>
              </tr>
              <tr>
                <td>Your passcode</td>
                <td>Held only long enough to derive a key</td>
                <td><strong>Never</strong> — it is not transmitted</td>
              </tr>
              <tr>
                <td>Key share 1</td>
                <td>Created inside StrongBox/TEE, non-exportable</td>
                <td><strong>Never</strong> — this is what makes the rest hold</td>
              </tr>
              <tr>
                <td>Key share 2</td>
                <td>Stored encrypted</td>
                <td>
                  Handled briefly during key derivation, and stored encrypted.
                  Useless without share 1
                </td>
              </tr>
              <tr>
                <td>Email, device model, security events</td>
                <td>—</td>
                <td>Yes — to run your account and refuse abuse</td>
              </tr>
            </tbody>
          </table>
          <p>
            <em>
              We list that fourth row rather than rounding it away. Our servers
              do handle one share of the key — and still cannot open your vault,
              because share 1 has never existed anywhere but your phone.
            </em>
          </p>

          <h2>The proof is what we cannot do</h2>
          <div className="admonition admonition-warning alert alert--warning">
            <div className="admonition-content">
              <p>
                <strong>
                  There is no account recovery. If you forget your passcode or
                  lose the device, the vault is gone.
                </strong>
              </p>
              <p>
                No reset link, no recovery question, no support override — and no
                way for us to be compelled into one. A service able to restore
                your vault is a service able to read it; this is the same fact
                stated from the other side.
              </p>
              <p>
                Backups and exports carry a layer tied to the device that wrote
                them, so they open only there. Please keep that in mind before
                the app becomes your only copy of something critical.
              </p>
            </div>
          </div>

          <h2>What you control</h2>
        </div>

        <div className="featureGrid">
          {controls.map(c => (
            <div className="featureCard" key={c.title}>
              <h3>{c.title}</h3>
              <p>{c.body}</p>
            </div>
          ))}
        </div>

        <div className="sectionNarrow">
          <h2>Choose how much protection you want</h2>
          <table>
            <thead>
              <tr><th>Tier</th><th>Encryption</th><th>Extras</th></tr>
            </thead>
            <tbody>
              <tr>
                <td>🥈 <strong>Silver</strong><br />Free</td>
                <td>AES-256-CTR with HMAC-SHA256, in software</td>
                <td>Unlimited devices</td>
              </tr>
              <tr>
                <td>🥇 <strong>Gold</strong></td>
                <td>AES-256-GCM in native code, StrongBox/TEE-backed keys</td>
                <td>Cloud key share, one device per account</td>
              </tr>
              <tr>
                <td>💎 <strong>Platinum</strong></td>
                <td>Same as Gold</td>
                <td>Device attestation, certificate pinning, overlay and tamper detection</td>
              </tr>
              <tr>
                <td>🛡️ <strong>Titanium</strong></td>
                <td>Same as Gold</td>
                <td>OPAQUE zero-knowledge protocol in Rust — the server never sees anything derived from your passcode</td>
              </tr>
            </tbody>
          </table>
          <p>
            <em>
              Silver runs in JavaScript and does not use hardware key storage.
              The paid tiers move encryption into native code with
              hardware-backed keys.
            </em>
          </p>

          <h2>Availability</h2>
          <p>
            <strong>Android 7.0 and above.</strong> Hardware-backed tiers need a
            device with StrongBox or a TEE; screen-recording protection during
            passcode entry requires Android 15. There is no iOS version.
          </p>
        </div>
      </main>
    </Layout>
  );
}
