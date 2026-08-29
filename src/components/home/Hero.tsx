import React, {type ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Translate, {translate} from '@docusaurus/Translate';
import {FaArrowRight, FaCheck, FaShieldAlt, FaAndroid} from 'react-icons/fa';
import styles from './styles.module.css';

/**
 * Hero.
 *
 * The headline is a claim most password managers also make, so the subhead
 * immediately says what makes it structural rather than a promise, and the
 * chips underneath lead with the cost - no account recovery - instead of
 * burying it. A reader who finds that out later has already lost a vault.
 */
export default function Hero(): ReactNode {
  const chips = [
    translate({
      id: 'home.hero.chip.recovery',
      message: 'No account recovery — by construction',
    }),
    translate({
      id: 'home.hero.chip.passcode',
      message: 'Your passcode is never transmitted',
    }),
    translate({
      id: 'home.hero.chip.backup',
      message: 'Backups go to your own Google Drive',
    }),
  ];

  return (
    <header className={styles.hero}>
      <div className={styles.heroInner}>
        <img
          src={useBaseUrl('/img/logo.png')}
          alt=""
          aria-hidden
          className={styles.heroMark}
          width={92}
          height={92}
        />

        <div className={styles.heroEyebrow}>
          <FaAndroid aria-hidden />
          <Translate id="home.hero.eyebrow">
            Android · Zero-knowledge
          </Translate>
        </div>

        <h1 className={styles.heroTitle}>
          <Translate id="home.hero.title">
            A password manager that cannot read your passwords
          </Translate>
        </h1>

        <p className={styles.heroSubtitle}>
          <Translate id="home.hero.subtitle">
            Not as a promise — as a consequence of how the key is built. One
            share of it is created inside your phone&apos;s secure hardware and
            can never leave, so the vault key cannot be assembled anywhere but on
            your device, at the moment you unlock it.
          </Translate>
        </p>

        <div className={styles.heroButtons}>
          <Link className={styles.btnPrimary} to="/docs/how-it-works">
            <Translate id="home.hero.cta">See exactly how</Translate>
            <FaArrowRight aria-hidden />
          </Link>
          <Link className={styles.btnGhost} to="/docs/security-tiers">
            <FaShieldAlt aria-hidden />
            <Translate id="home.hero.cta2">Compare the tiers</Translate>
          </Link>
        </div>

        <div className={styles.heroChips}>
          {chips.map(chip => (
            <span key={chip} className={styles.heroChip}>
              <FaCheck aria-hidden size={12} />
              {chip}
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}
