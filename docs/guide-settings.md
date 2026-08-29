---
title: Settings
description: Every switch on the Settings screen, what it actually changes, and the two you should not touch casually.
hide_table_of_contents: true
---

# Settings

Three sections — **Security**, **General**, **Support** — plus one item at the
bottom that deletes everything. This page covers all of them, in order.

## Security

![The Security section](/img/guide/settings-security.png)

### Biometric Authentication

Unlock with your fingerprint or face instead of typing the passcode every time.

**It replaces the typing, not the passcode.** Your vault key is still built from
your passcode; biometrics unlock a stored copy of that step. If a biometric read
fails, you enter the passcode — which is why forgetting it is still permanent.

If your phone has no biometric hardware, or none enrolled, this reads *Not
available on this device*. Enrol one in your phone's own settings first.

### Autofill Management

Where you turn autofill on, and manage:

- **Trusted domains** — sites that get suggestions automatically.
- **Blocked domains** — sites that never get suggestions, whatever is saved.
- **Require biometric** — keep this on.
- **Allow subdomains** — whether an entry saved for `example.com` is offered on
  `mail.example.com`.
- **Autofill statistics** — fills, saves, and which entries you actually use.

Full setup, including the extra step Chrome needs, is in
[Setting up autofill](./autofill.md).

### Change Passcode

Changes the one secret you type. You verify yourself first.

**This is cheaper than it sounds and you should use it more freely than you
probably do.** It re-wraps a machine-generated secret; the vault key itself does
not change, so **not one stored password is re-encrypted** and existing backups
stay valid.

If you ever think somebody watched you type, change it. See
[Your passcode](./your-passcode.md#changing-it).

### Auto-Lock

Locks the app after a period of inactivity. Shorter is safer; long enough that
you are not fighting it is the one you will actually keep.

### Screen Protection

Blocks screenshots and screen recording of the app.

Leave it on. The one honest reason to turn it off is if you are writing
documentation and need to capture the screen — and if you do, remember to turn
it back on. What it does and does not cover is in
[Setting up autofill](./autofill.md#what-a-screenshot-or-a-recording-can-capture).

### Security Checks

Three related switches, all about the device rather than the data:

| Switch | What it watches for |
| --- | --- |
| **Root Detection** | The phone's built-in restrictions having been removed |
| **Anti-Tampering** | The app having been modified, or a tool hooked into it |
| **Memory Protection** | Keeping sensitive values out of reach while in use |

On a rooted phone, other apps can read this app's memory — including your
passcode as you type it. These are why the paid tiers refuse to run there.

### Security Status

A live summary. **No threats detected** is what you want to see. Anything else
names what it found.

### Security Tier

![The tier picker](/img/guide/settings-tier.png)

The engine that does the encrypting.

| Tier | Engine | In one line |
| --- | --- | --- |
| 🥈 **Silver** | JavaScript | Free, software only, works anywhere |
| 🥇 **Gold** | Native + StrongBox | Hardware-backed keys. **The recommended one.** |
| 💎 **Platinum** | Gold + runtime checks | Same encryption as Gold, plus proof the device is sound |
| 🛡️ **Titanium** | Platinum + OPAQUE + Rust | Nothing that opens the vault is ever stored |

Two things the picker cannot tell you, and both matter:

- **Platinum is cryptographically identical to Gold.** There is no stronger
  cipher hiding in it. What it adds is Play Integrity, certificate pinning and
  tamper detection — checks that the assumptions behind the encryption still
  hold.
- **Silver is not a smaller version of Gold.** It is a different engine:
  AES-256-CTR with a separate authentication tag, in JavaScript, without
  hardware key storage. Accepted trade-offs for a free tier, but real ones.

Changing tier affects **new** encryption operations. Existing entries are
re-encrypted as they are next used.

The full comparison is in [Security tiers](./security-tiers.md).

:::caution "Device Integrity Check Failed"

Platinum and Titanium verify the device before granting the tier. A rooted or
modified phone, or an unlocked bootloader, will not pass.

That is not a downgrade you have to accept as a loss — **Gold has the same
cipher, the same hardware-backed keys and the same engine.** It simply does not
run the runtime checks.

And that same check has a use nobody expects, which is
[how to inspect a second-hand phone before buying it](./faq.md#used-phone-check).

:::

### Zero-Knowledge Encryption

On **Gold and above this is always on** and cannot be turned off — part of your
key is computed inside a Google Cloud hardware module, using a secret that never
leaves it.

**KMS Status** tells you what that connection is doing:

| Status | Meaning |
| --- | --- |
| **Connected & Healthy** | Normal |
| **Degraded (using cache)** | Reachable but unhappy; the app is coping |
| **Not initialized** | Not set up yet |
| **Disabled** | Silver only |

## General

![General and Support](/img/guide/settings-general.png)

### Language

English and Vietnamese.

### Backup & Restore

Where your encrypted backups are managed.

:::warning A backup will not move you to a new phone

On any tier. It protects you against losing data on the phone you still have.
[Backups and exports](./backups.md) explains why, and what to do instead.

:::

## Support

- **Help & Support** — opens your email client to reach us.
- **Privacy Policy** — [the same one on this site](/privacy).
- **About** — version information. Worth quoting if you write to us.

## Sign Out

Signs you out and **revokes autofill immediately** — the service stops answering
requests rather than carrying on with a stale session.

Your vault stays on the device. Signing out is not deleting.

## Reset Account

The last item, and the only one that destroys anything.

:::danger This erases everything, immediately

**Reset Account** deletes your vault and your account data from our servers.
There is no queue, no retention window, no support ticket, and **no way back** —
not for you, and not for us.

That is the same property that stops anyone else reading your vault. It cuts
both ways, and this is the moment it cuts your way.

Use it when you are moving to a new phone, or leaving. Not to fix a glitch.

:::

## Read next

- [Your vault](./guide-vault.md) — the main screen, button by button
- [Generating passwords](./guide-generator.md) — the generator and its presets
- [Common problems](./faq.md) — what the error messages mean
