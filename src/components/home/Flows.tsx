import React, {type ReactNode} from 'react';
import Translate, {translate} from '@docusaurus/Translate';
import {
  FaKeyboard,
  FaMemory,
  FaBoxOpen,
  FaMicrochip,
  FaCloud,
  FaKey,
  FaEraser,
  FaMousePointer,
  FaAndroid,
  FaFingerprint,
  FaLockOpen,
} from 'react-icons/fa';
import {Section, SectionHead} from './Section';
import styles from './styles.module.css';

/**
 * The two workflows a reader needs to picture: what happens when you unlock,
 * and what happens when the app fills a login.
 *
 * The unlock steps are the derivation in docs/02-security/dek-sharding.md and
 * docs/02-security/passcode.md, in order, ending on the formula itself. Showing
 * the mechanism is the argument - a claim a reader can follow is one they can
 * check, which is the only kind worth making about a password manager.
 */

type Step = {
  id: string;
  accent: string;
  icon: ReactNode;
  title: string;
  text: string;
  note?: string;
};

function Flow({steps, cols3}: {steps: Step[]; cols3?: boolean}): ReactNode {
  return (
    <div className={cols3 ? `${styles.flow} ${styles.flowCols3}` : styles.flow}>
      {steps.map(step => (
        <div key={step.id} className={styles.step}>
          <div
            className={styles.stepIcon}
            style={{['--step-accent' as string]: step.accent}}>
            {step.icon}
          </div>
          <div className={styles.stepBody}>
            <div className={styles.stepIndex} />
            <div className={styles.stepTitle}>{step.title}</div>
            <p className={styles.stepText}>{step.text}</p>
            {step.note ? <span className={styles.stepNote}>{step.note}</span> : null}
          </div>
        </div>
      ))}
    </div>
  );
}

export function UnlockFlow(): ReactNode {
  const steps: Step[] = [
    {
      id: 'passcode',
      accent: 'var(--pe-water)',
      icon: <FaKeyboard aria-hidden />,
      title: translate({
        id: 'home.unlock.1.title',
        message: 'You type your passcode',
      }),
      text: translate({
        id: 'home.unlock.1.text',
        message: 'One secret, and the only one you ever type. It never leaves the phone and is never sent to a server.',
      }),
      note: translate({id: 'home.unlock.1.note', message: 'Never transmitted'}),
    },
    {
      id: 'argon',
      accent: 'var(--pe-fire)',
      icon: <FaMemory aria-hidden />,
      title: translate({
        id: 'home.unlock.2.title',
        message: 'Argon2id stretches it',
      }),
      text: translate({
        id: 'home.unlock.2.text',
        message: '128 MiB of memory and 10 passes turn the passcode into a vault secret. That cost is paid on every guess an attacker makes too.',
      }),
      note: translate({id: 'home.unlock.2.note', message: '128 MiB · 10 passes'}),
    },
    {
      id: 'shard2',
      accent: 'var(--pe-metal)',
      icon: <FaBoxOpen aria-hidden />,
      title: translate({
        id: 'home.unlock.3.title',
        message: 'The vault secret unwraps Shard 2',
      }),
      text: translate({
        id: 'home.unlock.3.text',
        message: 'Shard 2 is stored encrypted on the device, with a ciphertext copy synced for durability. On its own it opens nothing.',
      }),
    },
    {
      id: 'shard1',
      accent: 'var(--pe-earth)',
      icon: <FaMicrochip aria-hidden />,
      title: translate({
        id: 'home.unlock.4.title',
        message: 'Shard 1 comes out of secure hardware',
      }),
      text: translate({
        id: 'home.unlock.4.text',
        message: 'Generated inside StrongBox or the TEE and non-exportable by hardware design. This is the share that makes the rest hold.',
      }),
      note: translate({id: 'home.unlock.4.note', message: 'Cannot leave the phone'}),
    },
    {
      id: 'shardvault',
      accent: 'var(--pe-wood)',
      icon: <FaCloud aria-hidden />,
      title: translate({
        id: 'home.unlock.5.title',
        message: 'The server computes ShardVault',
      }),
      text: translate({
        id: 'home.unlock.5.text',
        message: 'An HMAC taken inside a Cloud KMS hardware module, keyed by a pepper that never leaves it — and bound to your account, so it cannot be requested for someone else.',
      }),
    },
    {
      id: 'dek',
      accent: 'var(--pe-water)',
      icon: <FaKey aria-hidden />,
      title: translate({
        id: 'home.unlock.6.title',
        message: 'The three combine on your device',
      }),
      text: translate({
        id: 'home.unlock.6.text',
        message: 'The key exists only in native memory, only on your phone, and only for as long as the operation you asked for.',
      }),
    },
    {
      id: 'zero',
      accent: 'var(--pe-fire)',
      icon: <FaEraser aria-hidden />,
      title: translate({
        id: 'home.unlock.7.title',
        message: 'Then it is wiped',
      }),
      text: translate({
        id: 'home.unlock.7.text',
        message: 'The key is zeroed straight after use and rebuilt from scratch next time. It is never written to disk, never logged, never cached.',
      }),
      note: translate({id: 'home.unlock.7.note', message: 'Rebuilt every time'}),
    },
  ];

  return (
    <Section>
      <SectionHead
        id="how-unlocking-works"
        eyebrow={
          <Translate id="home.unlock.eyebrow">The mechanism</Translate>
        }
        title={translate({
          id: 'home.unlock.heading',
          message: 'What happens when you unlock',
        })}
        lead={translate({
          id: 'home.unlock.lead',
          message: 'The key that decrypts your vault is not stored anywhere. It is rebuilt from separate shards each time, and destroyed immediately after.',
        })}
      />
      <Flow steps={steps} cols3 />
      <div className={styles.formula}>
        <div className={styles.formulaCode}>
          DEK = Shard1 ⊕ Shard2 ⊕ ShardVault
        </div>
        <p className={styles.formulaNote}>
          <Translate id="home.unlock.formula">
            Miss any one of the three and there is no key. We hold two of them
            and still cannot open your vault, because Shard 1 has never existed
            anywhere but your phone.
          </Translate>
        </p>
      </div>
    </Section>
  );
}

export function AutofillFlow(): ReactNode {
  const steps: Step[] = [
    {
      id: 'tap',
      accent: 'var(--pe-water)',
      icon: <FaMousePointer aria-hidden />,
      title: translate({
        id: 'home.autofill.1.title',
        message: 'You tap a login field',
      }),
      text: translate({
        id: 'home.autofill.1.text',
        message: 'In any app or website that uses a normal password field.',
      }),
    },
    {
      id: 'android',
      accent: 'var(--pe-wood)',
      icon: <FaAndroid aria-hidden />,
      title: translate({
        id: 'home.autofill.2.title',
        message: 'Android asks PasswordEpic',
      }),
      text: translate({
        id: 'home.autofill.2.text',
        message: 'Through the system autofill framework — the app is never watching your screen to find the field itself.',
      }),
    },
    {
      id: 'auth',
      accent: 'var(--pe-fire)',
      icon: <FaFingerprint aria-hidden />,
      title: translate({
        id: 'home.autofill.3.title',
        message: 'You confirm it is you',
      }),
      text: translate({
        id: 'home.autofill.3.text',
        message: 'A fingerprint or the passcode, every single time. There is no window during which fills happen unattended.',
      }),
      note: translate({id: 'home.autofill.3.note', message: 'Every time'}),
    },
    {
      id: 'decrypt',
      accent: 'var(--pe-metal)',
      icon: <FaLockOpen aria-hidden />,
      title: translate({
        id: 'home.autofill.4.title',
        message: 'One entry is decrypted',
      }),
      text: translate({
        id: 'home.autofill.4.text',
        message: 'Only the entry being filled, and only for that fill. The rest of the vault stays encrypted.',
      }),
    },
    {
      id: 'wipe',
      accent: 'var(--pe-earth)',
      icon: <FaEraser aria-hidden />,
      title: translate({
        id: 'home.autofill.5.title',
        message: 'The plaintext is dropped',
      }),
      text: translate({
        id: 'home.autofill.5.text',
        message: 'The decrypted value and the key are released as soon as the field is filled.',
      }),
    },
  ];

  return (
    <Section sunken>
      <SectionHead
        id="autofill"
        eyebrow={<Translate id="home.autofill.eyebrow">Daily use</Translate>}
        title={translate({
          id: 'home.autofill.heading',
          message: 'Filling a password, step by step',
        })}
        lead={translate({
          id: 'home.autofill.lead',
          message: 'Autofill needs Android 8.0 or newer. Some apps opt out of it entirely — that is their choice, not a fault in PasswordEpic.',
        })}
      />
      <Flow steps={steps} cols3 />
    </Section>
  );
}
