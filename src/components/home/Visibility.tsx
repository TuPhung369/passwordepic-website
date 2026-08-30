import React, {type ReactNode} from 'react';
import Translate, {translate} from '@docusaurus/Translate';
import {Section, SectionHead} from './Section';
import styles from './styles.module.css';

/**
 * Who can see what.
 *
 * The rows where the answer is not "never" are the reason this table is
 * persuasive. Every password manager can publish a grid of "never"s; publishing
 * the two rows where the server does handle part of the key - shard 2 as
 * ciphertext, and ShardVault computed on request - and explaining why holding
 * two of the three still opens nothing, is what separates a checkable claim
 * from a slogan.
 *
 * The pepper row runs the other way, and is worth the space for it: a secret
 * our own servers cannot read, only ask to be used.
 */

type Row = {
  id: string;
  data: string;
  device: ReactNode;
  server: ReactNode;
};

export default function Visibility(): ReactNode {
  const never = (
    <span className={styles.never}>
      <Translate id="home.never">Never</Translate>
    </span>
  );

  const rows: Row[] = [
    {
      id: 'passwords',
      data: translate({id: 'home.who.passwords', message: 'Your passwords'}),
      device: translate({
        id: 'home.who.passwords.device',
        message: 'Decrypted only while you are looking at them',
      }),
      server: (
        <>
          {never}{' '}
          <Translate id="home.who.passwords.server">
            — encrypted entries are not uploaded
          </Translate>
        </>
      ),
    },
    {
      id: 'passcode',
      data: translate({id: 'home.who.passcode', message: 'Your passcode'}),
      device: translate({
        id: 'home.who.passcode.device',
        message: 'Held only long enough to derive a key',
      }),
      server: (
        <>
          {never}{' '}
          <Translate id="home.who.passcode.server">
            — it is not transmitted
          </Translate>
        </>
      ),
    },
    {
      id: 'shard1',
      data: translate({id: 'home.who.share1', message: 'Key shard 1'}),
      device: translate({
        id: 'home.who.share1.device',
        message: 'Created inside StrongBox/TEE, non-exportable',
      }),
      server: (
        <>
          {never}{' '}
          <Translate id="home.who.share1.server">
            — this is what makes the rest hold
          </Translate>
        </>
      ),
    },
    {
      id: 'shard2',
      data: translate({id: 'home.who.share2', message: 'Key shard 2'}),
      device: translate({
        id: 'home.who.share2.device',
        message: 'Stored encrypted',
      }),
      server: (
        <Translate id="home.who.share2.server">
          Handled briefly during key derivation, and stored encrypted. Useless
          without shard 1
        </Translate>
      ),
    },
    {
      id: 'shard3',
      data: translate({
        id: 'home.who.share3',
        message: 'Key shard 3 — the “pepper”',
      }),
      device: (
        <>
          {never}{' '}
          <Translate id="home.who.share3.device">
            — it never reaches your phone
          </Translate>
        </>
      ),
      server: (
        <Translate id="home.who.share3.server">
          Sealed in a hardware security module. It can be used, but not read out
          — by anyone, us included
        </Translate>
      ),
    },
    {
      id: 'shardvault',
      data: 'ShardVault',
      device: translate({
        id: 'home.who.shardvault.device',
        message: 'Arrives for one unlock, then it is gone',
      }),
      server: (
        <Translate id="home.who.shardvault.server">
          Computed for you at each unlock, from shard 2 and the pepper
        </Translate>
      ),
    },
    {
      id: 'account',
      data: translate({
        id: 'home.who.account',
        message: 'Email, device model, security events',
      }),
      device: '—',
      server: (
        <>
          <span className={styles.yes}>
            <Translate id="home.who.yes">Yes</Translate>
          </span>{' '}
          <Translate id="home.who.account.server">
            — to run your account and refuse abuse
          </Translate>
        </>
      ),
    },
  ];

  return (
    <Section>
      <SectionHead
        id="who-can-see-what"
        eyebrow={<Translate id="home.who.eyebrow">Transparency</Translate>}
        title={translate({
          id: 'home.who.heading',
          message: 'Who can see what',
        })}
        lead={translate({
          id: 'home.who.lead',
          message: 'The interesting rows are the ones where the answer is “never” — and the ones where it is not.',
        })}
      />

      <div className="peInnerNarrow">
        <div className="peTableWrap">
          <table className="peTable">
            <thead>
              <tr>
                <th>
                  <Translate id="home.who.col.data">Data</Translate>
                </th>
                <th>
                  <Translate id="home.who.col.device">Your device</Translate>
                </th>
                <th>
                  <Translate id="home.who.col.server">Our servers</Translate>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map(row => (
                <tr key={row.id}>
                  <td>{row.data}</td>
                  <td>{row.device}</td>
                  <td>{row.server}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className={styles.tableFootnote}>
          <Translate id="home.who.footnote">
            We list those rows rather than rounding them away. Our servers hold
            shard 2 as ciphertext and compute ShardVault on request — two of the
            three pieces your key is built from. They still cannot open your
            vault, because the third one, shard 1, has never existed anywhere
            but your phone.
          </Translate>
        </p>
        <p className={styles.tableFootnote}>
          <Translate id="home.who.footnote.tier">
            Hardware key storage and ShardVault are Gold and above. Silver keeps
            its shard in encrypted app storage instead, and derives its key on
            the phone alone.
          </Translate>
        </p>
      </div>
    </Section>
  );
}
