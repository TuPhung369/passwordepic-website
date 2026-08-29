import React, {type ReactNode} from 'react';
import Translate, {translate} from '@docusaurus/Translate';
import {
  FaExclamationTriangle,
  FaMobileAlt,
  FaKeyboard,
  FaVideo,
  FaApple,
  FaFileExport,
} from 'react-icons/fa';
import {Section, SectionHead} from './Section';
import styles from './styles.module.css';

/**
 * The limits, on the front page and in plain words.
 *
 * This is not a disclaimer section. "We cannot recover your vault" is the
 * strongest evidence on this page that the key is genuinely out of our reach -
 * a service able to restore a vault is a service able to read it. Softening any
 * of this into "contact support" would trade the product's best argument for a
 * worse one, and would leave a reader to discover the truth at the only moment
 * it cannot be acted on.
 */

type Limit = {
  id: string;
  icon: ReactNode;
  title: string;
  text: string;
};

export default function Limits(): ReactNode {
  const limits: Limit[] = [
    {
      id: 'files',
      icon: <FaFileExport aria-hidden />,
      title: translate({
        id: 'home.limits.files.title',
        message: 'Backups open only on the phone that made them',
      }),
      text: translate({
        id: 'home.limits.files.text',
        message: 'Every backup and export carries a layer of encryption tied to that device’s secure hardware. They protect you against losing data on the phone you still have — not against losing the phone.',
      }),
    },
    {
      id: 'migration',
      icon: <FaMobileAlt aria-hidden />,
      title: translate({
        id: 'home.limits.migration.title',
        message: 'There is no move-to-a-new-phone path',
      }),
      text: translate({
        id: 'home.limits.migration.text',
        message: 'On any tier. Support can release an account so you can start fresh on a new device, but that does not carry the old vault across.',
      }),
    },
    {
      id: 'keyboard',
      icon: <FaKeyboard aria-hidden />,
      title: translate({
        id: 'home.limits.keyboard.title',
        message: 'Your keyboard can read what you type',
      }),
      text: translate({
        id: 'home.limits.keyboard.text',
        message: 'In any app, not just this one. The app’s own windows are excluded from screenshots and recordings, but the keyboard belongs to another app and cannot be. PasswordEpic warns you when the active keyboard did not ship with your phone.',
      }),
    },
    {
      id: 'recording',
      icon: <FaVideo aria-hidden />,
      title: translate({
        id: 'home.limits.recording.title',
        message: 'Refusing passcode entry mid-recording needs Android 15',
      }),
      text: translate({
        id: 'home.limits.recording.text',
        message: 'Below that version the app still blanks its own windows in a recording, but it cannot detect that one is running and stop you.',
      }),
    },
    {
      id: 'silver',
      icon: <FaExclamationTriangle aria-hidden />,
      title: translate({
        id: 'home.limits.silver.title',
        message: 'The free tier is software-only',
      }),
      text: translate({
        id: 'home.limits.silver.text',
        message: 'Silver encrypts in JavaScript with AES-256-CTR plus a separate authentication tag, without hardware key storage, and cannot reliably wipe the key from memory afterwards. Those are accepted trade-offs, not defects — but they are real.',
      }),
    },
    {
      id: 'ios',
      icon: <FaApple aria-hidden />,
      title: translate({
        id: 'home.limits.ios.title',
        message: 'Android only',
      }),
      text: translate({
        id: 'home.limits.ios.text',
        message: 'Android 7.0 and above. There is no iOS version, and the hardware tiers have no iOS equivalent to be ported to.',
      }),
    },
  ];

  return (
    <Section>
      <SectionHead
        id="the-limits"
        eyebrow={<Translate id="home.limits.eyebrow">Read this part</Translate>}
        title={translate({
          id: 'home.limits.heading',
          message: 'The proof is what we cannot do',
        })}
        lead={translate({
          id: 'home.limits.lead',
          message: 'A service able to restore your vault is a service able to read it. These limits are the same fact, stated from the other side.',
        })}
      />

      <div className={styles.limitLead}>
        <Translate id="home.limits.headline">
          There is no account recovery. If you forget your passcode or lose the
          device, the vault is gone — no reset link, no recovery question, no
          support override, and no way for us to be compelled into one.
        </Translate>
      </div>

      <div className={styles.limitGrid}>
        {limits.map(limit => (
          <div key={limit.id} className={styles.limitCard}>
            <div className={styles.limitIcon}>{limit.icon}</div>
            <div>
              <h3 className={styles.limitTitle}>{limit.title}</h3>
              <p className={styles.limitText}>{limit.text}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
