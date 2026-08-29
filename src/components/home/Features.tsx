import React, {type ReactNode} from 'react';
import Translate, {translate} from '@docusaurus/Translate';
import {
  FaMicrochip,
  FaUserSecret,
  FaGoogleDrive,
  FaEyeSlash,
  FaTrashAlt,
  FaMobileAlt,
  FaCertificate,
  FaBug,
  FaRust,
} from 'react-icons/fa';
import {Section, SectionHead} from './Section';
import styles from './styles.module.css';

/**
 * What the product actually does, one card per mechanism.
 *
 * Cards carrying a tier tag are not available on every tier - saying so on the
 * card is the difference between a feature list and a misleading one. The free
 * tier is software-only and must never be described as hardware-backed.
 */

type Feature = {
  id: string;
  accent: string;
  icon: ReactNode;
  title: string;
  text: string;
  tag?: string;
};

export default function Features(): ReactNode {
  const paid = translate({
    id: 'home.features.tag.paid',
    message: 'Gold and above',
  });
  const hardened = translate({
    id: 'home.features.tag.hardened',
    message: 'Platinum and Titanium',
  });

  const features: Feature[] = [
    {
      id: 'hardware',
      accent: 'var(--pe-metal)',
      icon: <FaMicrochip aria-hidden />,
      title: translate({
        id: 'home.features.hardware.title',
        message: 'Keys born in secure hardware',
      }),
      text: translate({
        id: 'home.features.hardware.text',
        message: 'Shard 1 is generated inside StrongBox or the TEE and cannot be exported — not by us, not by you, not by an attacker holding your account.',
      }),
      tag: paid,
    },
    {
      id: 'zk',
      accent: 'var(--pe-water)',
      icon: <FaUserSecret aria-hidden />,
      title: translate({
        id: 'home.features.zk.title',
        message: 'Zero-knowledge by construction',
      }),
      text: translate({
        id: 'home.features.zk.text',
        message: 'Vault entries are encrypted on the device and never uploaded. Our database holds account metadata and shard ciphertext, nothing you stored.',
      }),
    },
    {
      id: 'drive',
      accent: 'var(--pe-wood)',
      icon: <FaGoogleDrive aria-hidden />,
      title: translate({
        id: 'home.features.drive.title',
        message: 'Backups go to your Drive',
      }),
      text: translate({
        id: 'home.features.drive.text',
        message: 'Backup files are written to your own Google Drive account, encrypted. We never receive them and could not read them if we did.',
      }),
    },
    {
      id: 'autofill',
      accent: 'var(--pe-fire)',
      icon: <FaEyeSlash aria-hidden />,
      title: translate({
        id: 'home.features.autofill.title',
        message: 'Nothing is filled without you',
      }),
      text: translate({
        id: 'home.features.autofill.text',
        message: 'Every autofill is gated behind a fingerprint or passcode check, and the app’s own windows are excluded from screenshots and recordings.',
      }),
    },
    {
      id: 'reset',
      accent: 'var(--pe-earth)',
      icon: <FaTrashAlt aria-hidden />,
      title: translate({
        id: 'home.features.reset.title',
        message: 'Erase everything, immediately',
      }),
      text: translate({
        id: 'home.features.reset.text',
        message: 'Settings → Reset Account wipes the vault and your account data from our servers. No queue, no retention window, no support ticket.',
      }),
    },
    {
      id: 'device',
      accent: 'var(--pe-water)',
      icon: <FaMobileAlt aria-hidden />,
      title: translate({
        id: 'home.features.device.title',
        message: 'One device, named and visible',
      }),
      text: translate({
        id: 'home.features.device.text',
        message: 'A paid account runs on one device at a time, identified by a hardware key rather than a device ID it could simply claim. A second sign-in is refused, not quietly allowed.',
      }),
      tag: paid,
    },
    {
      id: 'integrity',
      accent: 'var(--pe-metal)',
      icon: <FaCertificate aria-hidden />,
      title: translate({
        id: 'home.features.integrity.title',
        message: 'The app checks it is really the app',
      }),
      text: translate({
        id: 'home.features.integrity.text',
        message: 'Play Integrity is verified server-side, and the connection that returns part of the key is certificate-pinned. Cryptography assumes an unmodified app; this is what checks the assumption.',
      }),
      tag: hardened,
    },
    {
      id: 'tamper',
      accent: 'var(--pe-fire)',
      icon: <FaBug aria-hidden />,
      title: translate({
        id: 'home.features.tamper.title',
        message: 'Overlay and tamper detection',
      }),
      text: translate({
        id: 'home.features.tamper.text',
        message: 'Key operations are refused on a rooted, hooked or overlaid device rather than proceeding and hoping.',
      }),
      tag: hardened,
    },
    {
      id: 'rust',
      accent: 'var(--pe-wood)',
      icon: <FaRust aria-hidden />,
      title: translate({
        id: 'home.features.rust.title',
        message: 'OPAQUE, in a Rust core',
      }),
      text: translate({
        id: 'home.features.rust.text',
        message: 'On Titanium the passcode unwraps the vault through OPAQUE, so nothing derived from it is ever written to disk — and the Rust core can zero those values in native memory, which JavaScript cannot.',
      }),
      tag: translate({id: 'home.features.tag.titanium', message: 'Titanium'}),
    },
  ];

  return (
    <Section>
      <SectionHead
        id="what-you-get"
        eyebrow={<Translate id="home.features.eyebrow">Capabilities</Translate>}
        title={translate({
          id: 'home.features.heading',
          message: 'What the app actually does',
        })}
        lead={translate({
          id: 'home.features.lead',
          message: 'Where something is not available on every tier, the card says so.',
        })}
      />
      <div className={styles.cardGrid}>
        {features.map(feature => (
          <div
            key={feature.id}
            className={styles.card}
            style={{['--card-accent' as string]: feature.accent}}>
            <div className={styles.cardIcon}>{feature.icon}</div>
            <h3 className={styles.cardTitle}>{feature.title}</h3>
            <p className={styles.cardText}>{feature.text}</p>
            {feature.tag ? (
              <span className={styles.cardTag}>{feature.tag}</span>
            ) : null}
          </div>
        ))}
      </div>
    </Section>
  );
}
