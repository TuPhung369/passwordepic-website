import React, {type ReactNode, useEffect, useRef, useState} from 'react';
import {translate} from '@docusaurus/Translate';
import {FaPuzzlePiece, FaDice, FaMemory, FaBan} from 'react-icons/fa';
import {Section, SectionHead} from './Section';
import styles from './styles.module.css';

/**
 * Four numbers, each traceable to the app repository:
 *
 *   4 shards        docs/02-security/dek-sharding.md
 *   45 bits         docs/02-security/passcode.md (PASSCODE_MIN_ENTROPY_BITS)
 *   128 MiB         docs/02-security/passcode.md (ARGON2_CONFIG)
 *   0 recoveries    docs/02-security/export-and-backup.md
 *
 * The last one is the point of the section. Three impressive figures followed
 * by a zero says what the first three are for.
 */

type Stat = {
  id: string;
  value: number;
  unit: string;
  icon: ReactNode;
  label: string;
  note: string;
};

/** Counts up once, when the band first scrolls into view. */
function Counter({value, unit}: {value: number; unit: string}): ReactNode {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return undefined;
    }
    // Respect the OS setting rather than animating anyway: this is decoration,
    // and the final value is the only part that carries meaning.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(value);
      return undefined;
    }

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }
        observer.disconnect();
        const duration = 900;
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          // easeOutCubic: fast enough to feel responsive, settles rather than
          // stopping dead.
          setDisplay(Math.round(value * (1 - Math.pow(1 - t, 3))));
          if (t < 1) {
            frame = requestAnimationFrame(tick);
          }
        };
        frame = requestAnimationFrame(tick);
      },
      {threshold: 0.35},
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <span ref={ref} className={styles.statNumber}>
      {display}
      <span className={styles.statUnit}>{unit}</span>
    </span>
  );
}

export default function Stats(): ReactNode {
  const stats: Stat[] = [
    {
      id: 'shards',
      value: 4,
      unit: '',
      icon: <FaPuzzlePiece aria-hidden />,
      label: translate({id: 'home.stats.shards.label', message: 'Key shards'}),
      note: translate({
        id: 'home.stats.shards.note',
        message: 'Held in four separate places. No one holds enough to rebuild the key.',
      }),
    },
    {
      id: 'entropy',
      value: 45,
      unit: ' bits',
      icon: <FaDice aria-hidden />,
      label: translate({
        id: 'home.stats.entropy.label',
        message: 'Minimum passcode entropy',
      }),
      note: translate({
        id: 'home.stats.entropy.note',
        message: 'Measured in bits, not characters — so a wider alphabet earns a shorter passcode.',
      }),
    },
    {
      id: 'argon',
      value: 128,
      unit: ' MiB',
      icon: <FaMemory aria-hidden />,
      label: translate({
        id: 'home.stats.argon.label',
        message: 'Argon2id memory per guess',
      }),
      note: translate({
        id: 'home.stats.argon.note',
        message: 'What every attempt costs an attacker who already has your phone.',
      }),
    },
    {
      id: 'recovery',
      value: 0,
      unit: '',
      icon: <FaBan aria-hidden />,
      label: translate({
        id: 'home.stats.recovery.label',
        message: 'Ways we can recover your vault',
      }),
      note: translate({
        id: 'home.stats.recovery.note',
        message: 'No reset link, no override, and nothing that can be demanded of us.',
      }),
    },
  ];

  return (
    <Section sunken>
      <SectionHead
        id="by-the-numbers"
        title={translate({
          id: 'home.stats.heading',
          message: 'The design in four numbers',
        })}
        lead={translate({
          id: 'home.stats.lead',
          message: 'Three of these make the vault expensive to attack. The fourth is what they cost you.',
        })}
      />
      <div className={styles.statGrid}>
        {stats.map(stat => (
          <div key={stat.id} className={styles.statCard}>
            <div className={styles.statIcon}>{stat.icon}</div>
            <div>
              <Counter value={stat.value} unit={stat.unit} />
            </div>
            <div className={styles.statLabel}>{stat.label}</div>
            <div className={styles.statNote}>{stat.note}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}
