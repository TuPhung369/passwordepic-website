---
sidebar_position: 1
title: How it works
description: The key that opens your vault, and why it cannot be assembled anywhere but on your phone.
---

# How it works

Every password manager says only you can read your data. This page describes the
structure that makes it true here, so you can judge the claim instead of
trusting it.

## The key is split, and one share cannot travel

The key that decrypts your vault — the DEK — is never stored anywhere. It is
rebuilt from three shares each time you unlock, and destroyed immediately after.

| Share | Where it lives | Can it leave? |
| --- | --- | --- |
| **Share 1** | Inside your phone's StrongBox / TEE | **No.** Non-exportable by hardware design |
| **Share 2** | On your device, and a copy encrypted in our database | Yes, encrypted |
| **Share 3** | Computed by our server from a key held in Google Cloud KMS | Never stored |

They are combined on your device, in native code. The result exists for the
length of one operation and is then wiped from memory.

Because **share 1 cannot leave the phone**, nobody holding shares 2 and 3 — us,
a cloud provider, an attacker with our database — can produce the key. That is
the whole argument, and it rests on hardware rather than on our good intentions.

## What our servers actually handle

Being precise here matters more than sounding absolute.

- Your **passcode** is never transmitted. On Titanium it is never even usable
  by a server: the OPAQUE protocol proves you know it without revealing
  anything a server could test offline.
- Your **passwords** are encrypted before they are stored and are never uploaded
  to our database. Backups go to your own Google Drive.
- **Share 2 is handled by our server** during key derivation, and a copy is
  stored encrypted. On its own it opens nothing.
- We store what an account needs to exist: your email, your security tier, your
  device's model name and public key, and security events such as sign-ins and
  device changes.

## Why we cannot help you if you forget the passcode

We have nothing to check a passcode against, and no path to the key without your
device. There is no reset link, no recovery question, and no internal override —
which also means no override that can be demanded of us.

That is the trade. A service able to restore your vault is a service able to
read it.

## Where the honest limits are

- **Backups and exports open only on the device that created them.** They carry
  a layer of encryption tied to that phone's secure hardware, so copying the
  file to another phone does not help. They protect you against losing data on
  the phone you still have — not against losing the phone.
- **Screen-recording protection during passcode entry needs Android 15.** Below
  that, the app's own windows are still excluded from screenshots and
  recordings, but the on-screen keyboard belongs to another app and cannot be.
- **A keyboard you install can read what you type**, in any app. If that matters
  to you, use the keyboard that shipped with your phone; PasswordEpic warns you
  when the active one did not.
- **Silver, the free tier, is software-only.** It encrypts with AES-256-CTR plus
  a separate authentication tag, in JavaScript, without hardware key storage.
  The paid tiers move this into native code with StrongBox-backed keys.

## What you can do at any time

- **Settings → Reset Account** erases the vault and your account data from our
  servers immediately.
- Back up to **your own** Google Drive, or not at all.
- On paid tiers, see which device currently holds the account, and release it
  from that device.
