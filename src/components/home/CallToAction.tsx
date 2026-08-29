import React, {type ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Translate, {translate} from '@docusaurus/Translate';
import {FaBook, FaEnvelope} from 'react-icons/fa';
import styles from './styles.module.css';

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
        <div className={styles.heroButtons} style={{marginBottom: 0}}>
          <Link className={styles.btnPrimary} to="/docs/how-it-works">
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
      </div>
    </section>
  );
}
