import React, {type ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Translate, {translate} from '@docusaurus/Translate';
import {FaCheckCircle, FaMinusCircle, FaArrowRight} from 'react-icons/fa';
import {Section, SectionHead} from './Section';
import styles from './styles.module.css';

/**
 * The four tiers.
 *
 * Two things here are easy to get wrong and both have been published wrongly
 * before, so they are stated on the cards rather than in a footnote:
 *
 *  - SILVER is AES-256-CTR plus a separate HMAC, in JavaScript, with no
 *    hardware key storage. It is never "AES-256-GCM" and never "hardware-backed".
 *  - PLATINUM is cryptographically identical to GOLD. Its whole delta is runtime
 *    hardening, and implying a stronger cipher would be a lie a reader could
 *    check.
 *
 * `lacks` exists so the free tier can say what it does not have on its own card
 * instead of leaving the reader to infer it from the paid ones.
 */

type Tier = {
  id: string;
  emoji: string;
  name: string;
  accent: string;
  price: string;
  summary: string;
  has: string[];
  lacks?: string[];
};

export default function Tiers(): ReactNode {
  const tiers: Tier[] = [
    {
      id: 'silver',
      emoji: '🥈',
      name: 'Silver',
      accent: 'var(--pe-earth)',
      price: translate({id: 'home.tiers.free', message: 'Free'}),
      summary: translate({
        id: 'home.tiers.silver.summary',
        message: 'The free tier, and the only one that runs without the Android native module.',
      }),
      has: [
        translate({
          id: 'home.tiers.silver.1',
          message: 'AES-256-CTR with a separate HMAC-SHA256, in JavaScript',
        }),
        translate({
          id: 'home.tiers.silver.2',
          message: 'Key rebuilt from two shards, computed on the device',
        }),
        translate({
          id: 'home.tiers.silver.3',
          message: 'Unlimited devices',
        }),
      ],
      lacks: [
        translate({
          id: 'home.tiers.silver.no1',
          message: 'No hardware key storage',
        }),
        translate({
          id: 'home.tiers.silver.no2',
          message: 'No guarantee the key is wiped from memory',
        }),
      ],
    },
    {
      id: 'gold',
      emoji: '🥇',
      name: 'Gold',
      accent: 'var(--pe-metal)',
      price: translate({id: 'home.tiers.paid', message: 'Paid'}),
      summary: translate({
        id: 'home.tiers.gold.summary',
        message: 'The real security baseline. All cryptography moves into native code.',
      }),
      has: [
        translate({
          id: 'home.tiers.gold.1',
          message: 'AES-256-GCM in native Kotlin',
        }),
        translate({
          id: 'home.tiers.gold.2',
          message: 'Shard 1 held in StrongBox or the TEE, non-exportable',
        }),
        translate({
          id: 'home.tiers.gold.3',
          message: 'A third shard computed inside Cloud KMS',
        }),
        translate({
          id: 'home.tiers.gold.4',
          message: 'The key is zeroed straight after every operation',
        }),
      ],
    },
    {
      id: 'platinum',
      emoji: '💎',
      name: 'Platinum',
      accent: 'var(--pe-water)',
      price: translate({id: 'home.tiers.paid', message: 'Paid'}),
      summary: translate({
        id: 'home.tiers.platinum.summary',
        message: 'Cryptographically identical to Gold. What it adds is proof that the device deserves it.',
      }),
      has: [
        translate({
          id: 'home.tiers.platinum.1',
          message: 'Everything in Gold, unchanged',
        }),
        translate({
          id: 'home.tiers.platinum.2',
          message: 'Play Integrity, verified on the server',
        }),
        translate({
          id: 'home.tiers.platinum.3',
          message: 'Certificate pinning on the key-derivation call',
        }),
        translate({
          id: 'home.tiers.platinum.4',
          message: 'Overlay, accessibility and tamper detection',
        }),
      ],
    },
    {
      id: 'titanium',
      emoji: '🛡️',
      name: 'Titanium',
      accent: 'var(--pe-wood)',
      price: translate({id: 'home.tiers.paid', message: 'Paid'}),
      summary: translate({
        id: 'home.tiers.titanium.summary',
        message: 'Changes one thing about Gold’s engine — but the thing it changes is what touches your passcode.',
      }),
      has: [
        translate({
          id: 'home.tiers.titanium.1',
          message: 'Everything in Platinum',
        }),
        translate({
          id: 'home.tiers.titanium.2',
          message: 'The passcode unwraps the vault through OPAQUE',
        }),
        translate({
          id: 'home.tiers.titanium.3',
          message: 'Nothing that unwraps the vault is ever stored unencrypted',
        }),
        translate({
          id: 'home.tiers.titanium.4',
          message: 'A Rust core that can wipe secrets from native memory',
        }),
      ],
    },
  ];

  return (
    <Section sunken>
      <SectionHead
        id="tiers"
        eyebrow={<Translate id="home.tiers.eyebrow">Choose a level</Translate>}
        title={translate({
          id: 'home.tiers.heading',
          message: 'Four tiers, each the one below it plus a delta',
        })}
        lead={translate({
          id: 'home.tiers.lead',
          message: 'They are not four separate products. Gold, Platinum and Titanium all run the same native engine and differ only in what guards it or what unwraps the key.',
        })}
      />

      <div className={styles.tierGrid}>
        {tiers.map(tier => (
          <div
            key={tier.id}
            className={styles.tierCard}
            style={{['--tier-accent' as string]: tier.accent}}>
            <div className={styles.tierHead}>
              <span className={styles.tierEmoji} aria-hidden>
                {tier.emoji}
              </span>
              <span className={styles.tierName}>{tier.name}</span>
            </div>
            <div className={styles.tierPrice}>{tier.price}</div>
            <p className={styles.tierSummary}>{tier.summary}</p>
            <ul className={styles.tierList}>
              {tier.has.map(item => (
                <li key={item}>
                  <FaCheckCircle aria-hidden size={13} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            {tier.lacks ? (
              <ul className={`${styles.tierList} ${styles.tierListMuted}`}>
                {tier.lacks.map(item => (
                  <li key={item}>
                    <FaMinusCircle aria-hidden size={13} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        ))}
      </div>

      <p style={{textAlign: 'center', marginTop: '1.75rem', marginBottom: 0}}>
        <Link to="/docs/security-tiers">
          <Translate id="home.tiers.more">
            The full comparison, row by row
          </Translate>{' '}
          <FaArrowRight aria-hidden size={12} />
        </Link>
      </p>
    </Section>
  );
}
