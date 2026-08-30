---
title: Backups and exports
description: What a backup protects you against, why no file opens on another phone, and what to do instead.
hide_table_of_contents: true
---

# Backups and exports

One sentence governs this page, and it is the one people most often assume is
not true:

:::danger No backup or export can be opened on a device other than the one that
wrote it

On any tier. There is no device-migration path in this product.

:::

If you are looking for a way to move your vault to a new phone, there isn't one.
Reading the rest of this page is worth doing anyway, because the *reason* is the
same reason your passwords are safe.

## Why files do not travel

A file has a **wrapper** — the encryption over the whole file — and **contents**,
the entries inside it. Both can be tied to a device, and which one does the
tying depends on your tier.

**The wrapper.** On Gold, Platinum and Titanium, files are written with two
layers of encryption. The outer layer is derived from your passcode. The inner
one uses a key held in that phone's StrongBox or TEE. Decryption unwraps the
device layer *first*, so without that phone's secure hardware the file cannot
even be opened.

**The contents.** On every tier except Gold, the entries inside the file stay
encrypted with your DEK — which needs Shard 1, which never leaves the
device.

```mermaid
flowchart TD
  A["💾 Every backup has two locks"] --> B["🔐 The wrapper<br/>locks the whole file"]
  A --> C["🔐 The contents<br/>lock each entry inside"]
  B --> D["On Gold, Platinum and Titanium the<br/>inner layer uses this phone's security<br/>chip — the file will not even open"]
  C --> E["On every tier except Gold the entries<br/>still need this phone's DEK —<br/>the file opens, and reads as noise"]
  D --> F["❌ Blocked on every tier.<br/>Only the reason differs."]
  E --> F
```

| Tier | Wrapper | Entries | Opens elsewhere? |
| --- | --- | --- | --- |
| 🥈 Silver | Portable | Encrypted with the DEK | ❌ contents are unreadable |
| 🥇 Gold | Device-bound | Decrypted | ❌ wrapper cannot be opened |
| 💎 Platinum | Device-bound | Encrypted with the DEK | ❌ both |
| 🛡️ Titanium | Device-bound | Encrypted with the DEK | ❌ both |

Every tier is blocked. Only the reason differs — which is exactly why partial
readings of this keep producing confident, wrong conclusions.

```mermaid
flowchart TD
  A["💾 A backup file"] --> B{"Which phone are you<br/>opening it on?"}
  B -->|"The one that made it"| C["✅ Opens normally"]
  B -->|"Any other phone"| D["🔒 The outer lock needs<br/>that phone's security chip"]
  D --> E["🔒 And the entries inside need<br/>that phone's DEK"]
  E --> F["❌ It cannot be opened.<br/>On every tier."]
```

## What backups are actually for

They protect you against **losing data on the phone you still have**:

- an entry deleted by accident
- an import that went wrong
- a vault reset you did not mean to do

They do not protect you against losing the phone. Nothing in this product does,
and nothing could without also giving us the ability to read your vault.

```mermaid
flowchart TD
  A["💾 What can a backup save you from?"] --> B["🗑️ An entry deleted by accident"]
  A --> C["📥 An import that went wrong"]
  A --> D["♻️ A vault reset you did not mean"]
  B --> E["✅ Yes — you still have the phone"]
  C --> E
  D --> E
  A --> F["📱💥 The phone is lost or broken"]
  F --> G["❌ No. And nothing could,<br/>without also letting us<br/>read your vault."]
```

## Backups go to your Google Drive

If you enable backup, files are written to **your own** Google Drive account, not
to us. We never receive them and could not read them if we did.

Specifically, a backup goes to a **private area of your Drive that only this app
can open** — it is not listed among your files, so you cannot rename it by
accident or share it by mistake. An *export* is different: there you choose
between the phone's storage, your visible My Drive, or that same private area.

The app asks Google for two narrow permissions — its own private folder, and
files it created itself. Neither lets it see the rest of your Drive.

## What to do instead of relying on migration

Since a new phone starts an empty vault, plan for that up front:

- **Keep your passcode somewhere you will still have it in a year.** Losing the
  phone and the passcode together is unrecoverable; losing only the phone still
  means starting fresh.
- **Do not make PasswordEpic the only copy of something you cannot lose.** For a
  handful of genuinely critical credentials — the recovery codes for your email,
  say — keep a second copy somewhere else.
- **Back up regularly anyway.** It is still the answer for every failure that is
  not "the phone is gone".

We would rather say this plainly than let you discover it after losing a device.

## Read next

- [How it works](./how-it-works.md) — why Shard 1 cannot leave the phone
- [One device per account](./your-device.md) — moving to a new phone, and what support can do
- [Security tiers](./security-tiers.md) — which tier writes which kind of file
