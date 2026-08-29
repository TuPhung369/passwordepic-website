---
title: How it works
description: The key that opens your vault, and why it cannot be assembled anywhere but on your phone.
hide_table_of_contents: true
---

# How it works

Every password manager says only you can read your data. This page describes the
structure that makes it true here, so you can judge the claim instead of
trusting it.

## The key is never stored

The key that decrypts your vault — call it the **vault key** — is not saved
anywhere. Not on your phone, not on our servers, not in a backup. It is rebuilt
from separate pieces each time you unlock, used for one operation, and wiped
from memory immediately after.

Those pieces are called **shards**, and they live in four different places.

```mermaid
flowchart LR
  subgraph phone["📱 Your phone"]
    P1["🔒 Piece 1<br/>Locked inside the<br/>security chip.<br/>Cannot come out."]
    P2["📦 Piece 2<br/>Stored, encrypted"]
  end

  subgraph ours["☁️ Our servers"]
    C2["📦 A copy of piece 2<br/>Still encrypted"]
    P3["🧮 Piece 3<br/>Calculated for you<br/>each time you unlock"]
  end

  P1 --> KEY
  P2 --> KEY
  P3 --> KEY

  KEY["🔑 The key to your vault<br/>Built on your phone.<br/>Wiped straight after."]
```

| Shard | Where it lives | Can it leave? |
| --- | --- | --- |
| **Shard 1** | Inside your phone's StrongBox or TEE | **No.** Non-exportable by hardware design |
| **Shard 2** | On your device, encrypted — with a ciphertext copy synced for durability | Only as ciphertext |
| **Pepper** | A Google Cloud KMS hardware security module | **Never** — not even in a reply to our own servers |
| **Shard 4** | Google Cloud Secret Manager | Never reaches your phone |

The last two are not combined directly. Our server uses them to compute a third
value, **ShardVault**, and hands that back. Then, on your device, in native
code:

```
vault key = Shard 1  ⊕  Shard 2  ⊕  ShardVault
```

Miss any one of the three and there is no key.

## Why that structure matters

We hold two of the three. We can compute ShardVault, and we hold Shard 2 as
ciphertext. **We still cannot open your vault**, because Shard 1 has never
existed anywhere but inside your phone's secure hardware, and the hardware will
not export it — not for us, not for you, not for an attacker holding your
account.

That is the whole argument. It rests on hardware behaviour rather than on our
good intentions, which is the only version of this claim worth making.

```mermaid
flowchart TD
  A["😈 Someone takes<br/>our entire database"] --> B["They now hold piece 2<br/>and can compute piece 3"]
  B --> C{"Can they build<br/>your key?"}
  C -->|"Piece 1 is missing"| D["❌ No.<br/>Piece 1 has never existed<br/>anywhere but your phone,<br/>and the chip will not release it."]
```

## What our servers actually handle

Being precise here matters more than sounding absolute.

- **Your passcode is never transmitted.** On Titanium it never even exists in a
  form a server could test: the OPAQUE protocol proves you know it without
  revealing anything that could be attacked offline.
- **Your passwords are encrypted before they are stored, and are never uploaded
  to our database.** Backups go to *your* Google Drive.
- **Shard 2 is handled by our server** during key derivation, and a copy is
  stored encrypted. On its own it opens nothing.
- **ShardVault is computed for you, per unlock.** The pepper it is keyed with
  stays inside the Cloud KMS hardware module and is never in a response.
- We store what an account needs to exist: your email, your security tier, your
  device's model name and public key, and security events such as sign-ins and
  device changes.

### ShardVault is bound to your account

The server does not compute ShardVault from Shard 2 alone. It mixes in your
account ID and a per-account value that never leaves the server, so a signed-in
user cannot post someone *else's* Shard 2 and be handed that person's
ShardVault.

This matters because Shard 2 is the shard that can travel. Without that binding,
anyone who obtained a copy of your Shard 2 could have asked our own server to
turn it into two thirds of your key.

```mermaid
flowchart TD
  Y["🙂 You, signed in as you"] --> S{"Server computes ShardVault"}
  X["😈 Someone else, signed in as<br/>themselves, sending YOUR Shard 2"] --> S
  S --> M["It mixes in the account ID of<br/>whoever is asking, plus a per-account<br/>value that never leaves the server"]
  M --> A["✅ You get yours"]
  M --> B["❌ They get a value for THEIR<br/>account, which opens nothing"]
```

## Changing your passcode does not re-encrypt anything

A passcode change re-wraps the value that unlocks Shard 2. Shard 2's *contents*
do not change, so ShardVault does not change, so the vault key does not change.

Practically: changing your passcode is fast, it never touches your stored
passwords, and existing backup files stay valid.

```mermaid
flowchart TD
  A["🔑 You change your passcode"] --> B["The wrapper around<br/>Shard 2 is redone"]
  B --> C{"Did Shard 2's<br/>contents change?"}
  C -->|"No, only its wrapper"| D["So the vault key is unchanged"]
  D --> E["✅ Not one stored password<br/>is re-encrypted"]
  D --> F["✅ Existing backups stay valid"]
```

## Why we cannot help if you forget the passcode

We have nothing to check a passcode against, and no path to the key without your
device. There is no reset link, no recovery question, and no internal override —
which also means there is no override that can be demanded of us.

That is the trade. **A service able to restore your vault is a service able to
read it.**

## Where the honest limits are

- **Backups and exports open only on the device that created them.** They carry
  a layer of encryption tied to that phone's secure hardware, so copying the
  file to another phone does not help. See [Backups and exports](./backups.md).
- **Screenshots are refused outright** while a PasswordEpic screen is showing —
  Android blocks the capture for the whole screen, keyboard included. A screen
  *recording* is different: the app's own windows come out black, but the
  keyboard belongs to another app and still renders, which is why the app
  refuses passcode entry while one is running. Detecting that needs Android 15.
- **A keyboard you install can read what you type**, in any app. If that matters
  to you, use the keyboard that shipped with your phone; PasswordEpic warns you
  when the active one did not.
- **Silver, the free tier, is software-only.** It encrypts with AES-256-CTR plus
  a separate authentication tag, in JavaScript, without hardware key storage.
  See [Security tiers](./security-tiers.md).

## What you can do at any time

- **Settings → Reset Account** erases the vault and your account data from our
  servers immediately.
- Back up to **your own** Google Drive, or not at all.
- On paid tiers, see which device currently holds the account, and release it
  from that device.

## Read next

- [Security tiers](./security-tiers.md) — what each tier actually changes
- [Your passcode](./your-passcode.md) — the one secret you type, and how strong it must be
- [Backups and exports](./backups.md) — what they protect you against, and what they do not
- [One device per account](./your-device.md) — how it is enforced, and what it is not
