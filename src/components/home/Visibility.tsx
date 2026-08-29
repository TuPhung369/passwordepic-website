import React, {type ReactNode} from 'react';
import Translate, {translate} from '@docusaurus/Translate';
import {Section, SectionHead} from './Section';
import styles from './styles.module.css';

/**
 * Who can see what.
 *
 * The fourth row is the reason this table is persuasive. Every password
 * manager can publish a grid of "never"s; publishing the row where the server
 * does handle part of the key, and explaining why that still opens nothing, is
 * what separates a checkable claim from a slogan.
 */

type Row = {
  id: string;
  data: string;
  device: string;
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
          message: 'The interesting rows are the ones where the answer is “never” — and the one where it is not.',
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
            We list that fourth row rather than rounding it away. Our servers do
            handle one shard of the key — and still cannot open your vault,
            because shard 1 has never existed anywhere but your phone.
          </Translate>
        </p>
      </div>
    </Section>
  );
}
