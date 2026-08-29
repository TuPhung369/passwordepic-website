import React, {type ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Translate, {translate} from '@docusaurus/Translate';
import {FaGooglePlay, FaBook, FaEnvelope} from 'react-icons/fa';
import {PLAY_STORE_URL} from '@site/src/constants';
import styles from './styles.module.css';

/**
 * Closing call to action: install it, or go and check the claims first.
 *
 * The QR is for the reader who got here on a laptop - the whole page argues
 * that this is worth installing on a phone they are not currently holding, so
 * handing them a scan is the shortest path from convinced to installed. It is
 * hidden below the breakpoint, where it would be a code asking someone to scan
 * it with the device already displaying it.
 */
export default function CallToAction(): ReactNode {
  return (
    <section className={styles.cta}>
      <div className="peInnerNarrow">
        <h2 className={styles.ctaTitle}>
          <Translate id="home.cta.heading">
            Judge the claim, don&apos;t trust it
          </Translate>
        </h2>
        <p className={styles.ctaText}>
          <Translate id="home.cta.text">
            The documentation describes the key, the shards and the places each
            one lives — including the parts we handle. Read it before you decide
            whether to believe the front page.
          </Translate>
        </p>

        <div className={styles.ctaSplit}>
          <div className={styles.ctaActions}>
            <Link className={styles.btnPrimary} href={PLAY_STORE_URL}>
              <FaGooglePlay aria-hidden />
              <Translate id="home.cta.download">Get it on Google Play</Translate>
            </Link>
            <Link className={styles.btnGhost} to="/docs/how-it-works">
              <FaBook aria-hidden />
              <Translate id="home.cta.docs">Read the documentation</Translate>
            </Link>
            <a
              className={styles.btnGhost}
              href="mailto:support@passwordepic.com"
              aria-label={translate({
                id: 'home.cta.contactAria',
                message: 'Email support at passwordepic.com',
              })}>
              <FaEnvelope aria-hidden />
              <Translate id="home.cta.contact">Ask us something</Translate>
            </a>
          </div>

          <div className={styles.qrCard}>
            <img
              src={useBaseUrl('/img/play-qr.svg')}
              alt={translate({
                id: 'home.cta.qrAlt',
                message: 'QR code linking to PasswordEpic on Google Play',
              })}
              className={styles.qrImage}
              width={148}
              height={148}
            />
            <span className={styles.qrCaption}>
              <Translate id="home.cta.qr">Scan to install</Translate>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
