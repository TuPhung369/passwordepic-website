import React, {type ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Translate, {translate} from '@docusaurus/Translate';
import {
  FaHourglassHalf,
  FaMicrochip,
  FaDatabase,
  FaGavel,
  FaLayerGroup,
  FaUniversalAccess,
  FaVideo,
  FaKeyboard,
  FaClone,
  FaBug,
  FaWifi,
  FaRobot,
  FaCloudDownloadAlt,
  FaTrashAlt,
  FaArrowRight,
} from 'react-icons/fa';
import {Section, SectionHead} from './Section';
import styles from './styles.module.css';

/**
 * The security story, told from the reader's side of it.
 *
 * Everything here also exists as a mechanism in the app repository, and an
 * earlier version of this page listed it that way - StrongBox, Play Integrity,
 * certificate pinning, TEE, Shard2. Nobody outside the project knows what any
 * of those are, so the list read as noise and the strongest part of the product
 * landed as jargon.
 *
 * So each card leads with a worry the reader already has, answers it in plain
 * words, and only then names the mechanism, in a small badge, for anyone who
 * wants to go and check. Fear first, then the specific thing that answers it.
 *
 * Two rules keep that from sliding into scaremongering, which would be both
 * dishonest and - for a password manager - self-defeating:
 *
 *  1. Every threat named here is one this app actually does something about.
 *     No invented dangers, and no danger whose answer is "buy the paid tier"
 *     when the free tier is exposed to it.
 *  2. Where the answer is partial, the card says so on the card. The keyboard
 *     one has no real answer at all and says that outright - a reader who finds
 *     the gap themselves stops believing the other twelve.
 */

type Threat = {
  id: string;
  icon: ReactNode;
  accent: string;
  fear: string;
  answer: string;
  /** The mechanism's real name, for anyone who wants to verify the claim. */
  how: string;
  /** Only where a tier genuinely gates it. */
  tier?: string;
};

type Group = {
  id: string;
  title: string;
  threats: Threat[];
};

export default function Threats(): ReactNode {
  const hardened = translate({
    id: 'home.threats.tier.hardened',
    message: 'Platinum · Titanium',
  });
  const paid = translate({
    id: 'home.threats.tier.paid',
    message: 'Gold and above',
  });

  const groups: Group[] = [
    {
      id: 'phone',
      title: translate({
        id: 'home.threats.group.phone',
        message: 'Someone has your phone',
      }),
      threats: [
        {
          id: 'guessing',
          icon: <FaHourglassHalf aria-hidden />,
          accent: 'var(--pe-fire)',
          fear: translate({
            id: 'home.threats.guessing.fear',
            message: '“They will just keep guessing my passcode.”',
          }),
          answer: translate({
            id: 'home.threats.guessing.answer',
            message: 'Every single guess costs them 128 MiB of memory and real time, because that is what it costs you when you unlock. Guessing stops being something you do millions of times an hour.',
          }),
          how: translate({
            id: 'home.threats.guessing.how',
            message: 'Argon2id, 128 MiB per attempt',
          }),
        },
        {
          id: 'rooted',
          icon: <FaMicrochip aria-hidden />,
          accent: 'var(--pe-metal)',
          fear: translate({
            id: 'home.threats.rooted.fear',
            message: '“They will root the phone and dig the key out of storage.”',
          }),
          answer: translate({
            id: 'home.threats.rooted.answer',
            message: 'One piece of the key was created inside a separate security chip, and that chip has no operation that hands it back — to anyone. Root gets them the phone. It does not get them that piece.',
          }),
          how: translate({
            id: 'home.threats.rooted.how',
            message: 'Hardware key store (StrongBox / TEE)',
          }),
          tier: paid,
        },
      ],
    },
    {
      id: 'us',
      title: translate({
        id: 'home.threats.group.us',
        message: 'The danger is us',
      }),
      threats: [
        {
          id: 'breach',
          icon: <FaDatabase aria-hidden />,
          accent: 'var(--pe-water)',
          fear: translate({
            id: 'home.threats.breach.fear',
            message: '“You get breached and my passwords end up in the dump.”',
          }),
          answer: translate({
            id: 'home.threats.breach.answer',
            message: 'Your saved passwords are never uploaded to us at all. Our database holds your account details and one encrypted piece of the key. Someone who takes the entire database takes nothing that opens a vault.',
          }),
          how: translate({
            id: 'home.threats.breach.how',
            message: 'Vault entries never leave the device',
          }),
        },
        {
          id: 'insider',
          icon: <FaGavel aria-hidden />,
          accent: 'var(--pe-earth)',
          fear: translate({
            id: 'home.threats.insider.fear',
            message: '“Someone inside your company looks — or a court makes you hand it over.”',
          }),
          answer: translate({
            id: 'home.threats.insider.answer',
            message: 'There is no internal tool, no support override, no admin mode. Not as a policy we could change under pressure — the piece that completes your key has never existed on our side of the wire.',
          }),
          how: translate({
            id: 'home.threats.insider.how',
            message: 'No recovery path exists to be demanded',
          }),
        },
      ],
    },
    {
      id: 'watching',
      title: translate({
        id: 'home.threats.group.watching',
        message: 'Something on your phone is watching',
      }),
      threats: [
        {
          id: 'overlay',
          icon: <FaLayerGroup aria-hidden />,
          accent: 'var(--pe-fire)',
          fear: translate({
            id: 'home.threats.overlay.fear',
            message: '“A fake screen appears over the app and I type my passcode into it.”',
          }),
          answer: translate({
            id: 'home.threats.overlay.answer',
            message: 'The app watches for anything drawn on top of the passcode pad and refuses to go on. An invisible layer harvesting your taps is stopped the same way. Both attacks skip the encryption entirely by getting to the secret as you type it — so they get blocked before you finish typing.',
          }),
          how: translate({
            id: 'home.threats.overlay.how',
            message: 'Overlay and tap-hijacking guard',
          }),
          tier: hardened,
        },
        {
          id: 'a11y',
          icon: <FaUniversalAccess aria-hidden />,
          accent: 'var(--pe-wood)',
          fear: translate({
            id: 'home.threats.a11y.fear',
            message: '“Some app I installed can read my screen.”',
          }),
          answer: translate({
            id: 'home.threats.a11y.answer',
            message: 'Android’s accessibility permission lets an app read every field on screen, password fields included. Plenty of ordinary apps ask for it. While one is active, key operations stop.',
          }),
          how: translate({
            id: 'home.threats.a11y.how',
            message: 'Accessibility-service guard',
          }),
          tier: hardened,
        },
        {
          id: 'recording',
          icon: <FaVideo aria-hidden />,
          accent: 'var(--pe-water)',
          fear: translate({
            id: 'home.threats.recording.fear',
            message: '“Something is recording my screen while I unlock.”',
          }),
          answer: translate({
            id: 'home.threats.recording.answer',
            message: 'Screenshots are refused outright, and a recording of the app comes out black — the app and the keyboard over it, nothing to read. The gap is the autofill dialog, which sits over a different app that is being recorded normally, so on Android 15 the app detects the recording and refuses to let you type at all. Below that it cannot detect one, and we would rather say so than let you assume otherwise.',
          }),
          how: translate({
            id: 'home.threats.recording.how',
            message: 'Screenshots blocked · recordings black · entry refused, Android 15+',
          }),
        },
        {
          id: 'keyboard',
          icon: <FaKeyboard aria-hidden />,
          accent: 'var(--pe-earth)',
          fear: translate({
            id: 'home.threats.keyboard.fear',
            message: '“My keyboard is logging everything I type.”',
          }),
          answer: translate({
            id: 'home.threats.keyboard.answer',
            message: 'This one we cannot fix, and pretending otherwise would be the dishonest part. Any keyboard sees the keys you give it, in every app on your phone. What we do is tell you when the keyboard in use did not ship with the phone — a warning, never a block, because locking you out over a keyboard preference helps nobody.',
          }),
          how: translate({
            id: 'home.threats.keyboard.how',
            message: 'Keyboard-trust warning — a real gap, stated',
          }),
        },
      ],
    },
    {
      id: 'integrity',
      title: translate({
        id: 'home.threats.group.integrity',
        message: 'Is this even the real app?',
      }),
      threats: [
        {
          id: 'fake',
          icon: <FaClone aria-hidden />,
          accent: 'var(--pe-metal)',
          fear: translate({
            id: 'home.threats.fake.fear',
            message: '“I install a tampered copy of the app without noticing.”',
          }),
          answer: translate({
            id: 'home.threats.fake.answer',
            message: 'Before key operations, our server asks Google whether this is the genuine app on a genuine, uncompromised device. The check happens on the server, not on the phone — so a modified app cannot simply patch out its own verdict.',
          }),
          how: translate({
            id: 'home.threats.fake.how',
            message: 'Google Play Integrity, verified server-side',
          }),
          tier: hardened,
        },
        {
          id: 'hooked',
          icon: <FaBug aria-hidden />,
          accent: 'var(--pe-fire)',
          fear: translate({
            id: 'home.threats.hooked.fear',
            message: '“Something is hooked into the app, reading it from the inside.”',
          }),
          answer: translate({
            id: 'home.threats.hooked.answer',
            message: 'Root, repackaging, an attached debugger and the common hooking toolkits are all detected, and key operations refuse to run. The encryption is only worth anything while the app around it is intact — so the app checks that instead of assuming it.',
          }),
          how: translate({
            id: 'home.threats.hooked.how',
            message: 'Root, tamper, debugger and hook detection',
          }),
          tier: hardened,
        },
        {
          id: 'network',
          icon: <FaWifi aria-hidden />,
          accent: 'var(--pe-wood)',
          fear: translate({
            id: 'home.threats.network.fear',
            message: '“Someone on this Wi-Fi — or my employer — intercepts the connection.”',
          }),
          answer: translate({
            id: 'home.threats.network.answer',
            message: 'The call that returns part of your key accepts only a fixed set of Google’s own root certificates. A certificate your phone has been made to trust — a work profile, an installed root — is refused anyway.',
          }),
          how: translate({
            id: 'home.threats.network.how',
            message: 'Certificate pinning over TLS 1.3',
          }),
          tier: hardened,
        },
        {
          id: 'bots',
          icon: <FaRobot aria-hidden />,
          accent: 'var(--pe-water)',
          fear: translate({
            id: 'home.threats.bots.fear',
            message: '“Bots hammering away at my account.”',
          }),
          answer: translate({
            id: 'home.threats.bots.answer',
            message: 'Sign-in attempts are scored for automated abuse in the background — you see nothing unless something looks wrong — and are rate-limited on top of that.',
          }),
          how: translate({
            id: 'home.threats.bots.how',
            message: 'Invisible bot scoring and rate limits',
          }),
        },
      ],
    },
    {
      id: 'yours',
      title: translate({
        id: 'home.threats.group.yours',
        message: 'It is your data, including the leaving part',
      }),
      threats: [
        {
          id: 'backup',
          icon: <FaCloudDownloadAlt aria-hidden />,
          accent: 'var(--pe-earth)',
          fear: translate({
            id: 'home.threats.backup.fear',
            message: '“Someone gets my backup file out of my Drive.”',
          }),
          answer: translate({
            id: 'home.threats.backup.answer',
            message: 'Backups go to your Drive rather than ours, and they only open on the phone that wrote them — on every tier. A stolen backup file is a brick. The same property is why you cannot move a vault to a new phone, and we would rather you knew that now.',
          }),
          how: translate({
            id: 'home.threats.backup.how',
            message: 'Two layers, the inner one bound to the device',
          }),
        },
        {
          id: 'delete',
          icon: <FaTrashAlt aria-hidden />,
          accent: 'var(--pe-wood)',
          fear: translate({
            id: 'home.threats.delete.fear',
            message: '“I want to leave. Will you actually delete it?”',
          }),
          answer: translate({
            id: 'home.threats.delete.answer',
            message: 'Settings → Reset Account, and it is done. No queue, no thirty-day retention window, no support ticket, no exit survey.',
          }),
          how: translate({
            id: 'home.threats.delete.how',
            message: 'Immediate, from inside the app',
          }),
        },
      ],
    },
  ];

  return (
    <Section>
      <SectionHead
        id="what-are-you-afraid-of"
        eyebrow={
          <Translate id="home.threats.eyebrow">Defence in depth</Translate>
        }
        title={translate({
          id: 'home.threats.heading',
          message: 'What are you actually afraid of?',
        })}
        lead={translate({
          id: 'home.threats.lead',
          message: 'Encryption is the easy part — every password manager has it. What separates them is everything layered around the moment you type your passcode. Here is each worry, and the specific thing that answers it.',
        })}
      />

      {groups.map(group => (
        <div key={group.id} className={styles.threatGroup}>
          <h3 className={styles.threatGroupTitle}>{group.title}</h3>
          <div className={styles.threatGrid}>
            {group.threats.map(threat => (
              <div
                key={threat.id}
                className={styles.threatCard}
                style={{['--card-accent' as string]: threat.accent}}>
                <div className={styles.threatIcon}>{threat.icon}</div>
                <div className={styles.threatBody}>
                  <p className={styles.threatFear}>{threat.fear}</p>
                  <p className={styles.threatAnswer}>{threat.answer}</p>
                  <div className={styles.threatMeta}>
                    <span className={styles.threatHow}>{threat.how}</span>
                    {threat.tier ? (
                      <span className={styles.threatTier}>{threat.tier}</span>
                    ) : null}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <p className={styles.threatFooter}>
        <Translate id="home.threats.glossary">
          Every technical name above is explained in plain words here:
        </Translate>{' '}
        <Link to="/docs/plain-words">
          <Translate id="home.threats.glossaryLink">
            what these words mean
          </Translate>{' '}
          <FaArrowRight aria-hidden size={12} />
        </Link>
      </p>
    </Section>
  );
}
