---
title: Privacy Policy
description: What PasswordEpic stores, what it cannot see, and what happens to your data.
hide_table_of_contents: false
---

# Privacy Policy

*Last updated: 28 August 2026 — applies to the PasswordEpic Android app.*

The short version: your passwords are encrypted on your phone with a key that
never leaves it. We cannot read them, and neither can anyone who compromises our
servers.

## What we can never see

- **Your passcode.** Never transmitted, never stored on a server.
- **Your passwords.** Vault entries are encrypted on the device and are never uploaded to our database.
- **The key that decrypts them.** One share is held in your phone's secure hardware and cannot be exported — not by us, not by you, not by an attacker holding your account.

## What we store, and why

| Data | Why |
| --- | --- |
| Email address and account ID from Google Sign-In | To identify your account |
| An encrypted key share, useless on its own | So your vault survives ordinary app data loss |
| Which security tier you chose, and setup timestamps | To apply the right protections |
| Your device's public key, model name, and a one-way fingerprint of a device identifier | To enforce one device per account on paid tiers, and to let support reactivate you |
| A device-integrity result from Google Play Integrity | To refuse key operations on tampered or rooted devices |
| Security events: sign-ins, device changes, rate limits | Abuse protection and support investigation |

Sign-in is additionally protected by **Google reCAPTCHA Enterprise**, which
assesses the request for automated abuse. Its use is subject to
[Google's Privacy Policy](https://policies.google.com/privacy).

## Backups go to your own Google Drive

If you enable backup, files are written to *your* Google Drive account — not to
us. We never receive them and cannot read them.

:::warning Losing your phone means losing the vault

Backups and exports carry a layer of encryption tied to the device that created
them, so they **only open on that device**.

There is no way for us to recover a vault — that is the direct cost of a key we
genuinely cannot access. Please keep this in mind before relying on the app as
your only copy of anything critical.

:::

## What we do not do

- No advertising, and no advertising identifiers.
- No selling or sharing of personal data.
- No analytics profiling of your vault contents — we have no access to them.

## Deleting your data

In the app, **Settings → Reset Account** erases your vault and the account data
listed above. It is immediate and cannot be undone. You may also email us to
request deletion.

## Children

PasswordEpic is not directed at children under 13 — or the higher age of digital
consent that applies where you live, such as 16 in Vietnam and much of the EU —
and we do not knowingly collect their data.

## Changes

Material changes will be published on this page with a new date above.

## Contact

[support@passwordepic.com](mailto:support@passwordepic.com)
