---
title: What these words mean
description: Every technical term this site uses, explained without assuming you already know it.
hide_table_of_contents: true
---

# What these words mean

Security products hide behind vocabulary. This page is the opposite: every term
used anywhere on this site, in plain words, with what it actually buys you and
where it stops.

If something here is still unclear, that is our fault rather than yours — write
to [support@passwordepic.com](mailto:support@passwordepic.com) and we will fix
the wording.

## The basics

### Passcode

The one secret you type. Not a PIN and not a master password — those were two
separate things in an older version of the app, and combining them into one was
a security improvement rather than a simplification. See
[Your passcode](./your-passcode.md).

### Vault

Everything you have saved in the app. When this site says "we cannot open your
vault", it means exactly that and not "we promise not to".

### Vault key

The key that decrypts your saved passwords. It is never stored anywhere — not on
your phone, not on our servers. It gets rebuilt from pieces each time you unlock,
used for one operation, then wiped from memory.

### Shard

One piece of the vault key. The key is split into pieces that live in different
places, so no single place — including ours — holds enough to rebuild it.
Shard 1 is in your phone's security chip, Shard 2 is on your phone encrypted, and
a third value is computed by our server. All three are needed. See
[How it works](./how-it-works.md).

### Zero-knowledge

A system built so the people running it genuinely cannot read what you store,
rather than one where they can and have promised not to. The test is simple: ask
whether they can reset your password and still give you your data back. If they
can, they can read it.

## On your phone

### StrongBox and TEE

Two names for the same idea: **a separate, locked-down chip inside your phone
that stores keys and refuses to hand them out.**

A key created inside it can be *used* — you can ask the chip to encrypt or
decrypt something — but there is no command that says "give me the key itself".
Not for the app, not for us, not for someone who has rooted the phone.

**TEE** (Trusted Execution Environment) is a protected area inside the main
processor. **StrongBox** is a physically separate chip, which is stronger. Your
phone has one, the other, or neither, depending on the model. It is the single
thing everything else on this site rests on.

### Argon2id

A deliberately slow, deliberately memory-hungry way of turning your passcode into
a key.

The point is the cost. Turning your passcode into a key takes **128 MiB of
memory** and a noticeable moment. You pay that once, when you unlock. Someone
guessing your passcode pays it *on every guess* — which is what turns "millions
of guesses per second" into something far slower and far more expensive.

### Entropy, and "45 bits"

A way of measuring how hard a passcode is to guess that accounts for the
alphabet you chose, not just the length.

Eight digits and eight mixed-case characters with symbols are not remotely
comparable — the second has roughly 40 million times more possibilities. Counting
characters cannot express that; counting bits can. The app requires 45 bits, and
how long that makes your passcode depends on what you type it from. See
[Your passcode](./your-passcode.md).

### Screen capture protection

Android lets an app mark its own windows as "do not capture". Screenshots of them
fail, and screen recordings show them as black rectangles. The app sets this on
every screen that touches your passwords.

**The important limit:** the keyboard is a different app, in its own window, and
no app can set that flag on another app's window. So a recording shows a
blacked-out app with a fully visible keyboard beneath it.

### Screen-recording detection

On **Android 15 and above**, an app can be told when a recording of its windows
starts. PasswordEpic uses that to clear the passcode field and refuse entry
entirely while a recording is running, then restore it afterwards.

Below Android 15 there is no reliable way to detect this, and the app does not
pretend there is. "No recording detected" on an older phone means *cannot tell*,
not *verified safe*.

### Keyboard trust

The app checks whether the keyboard you are using came with the phone or was
installed later, and warns you if it was installed later.

**What that is worth, exactly:** a keyboard that shipped with the phone is not
automatically safe, and one you installed from the Play Store is almost certainly
fine. It is a nudge, not a verdict — a warning you can dismiss, never a block.
The app deliberately keeps no list of "approved" keyboards, because an app can
claim any name it likes and a name is not proof of identity.

### Overlay and tap-hijacking

An **overlay** is a window one app draws on top of another. Used honestly it is a
chat head or a screen dimmer. Used dishonestly it is a fake passcode pad drawn
exactly over the real one, or an invisible layer that silently collects your taps
— that second one is **tap-hijacking**, or "tapjacking".

Both skip encryption completely, by getting to your secret while you are typing
it. The app watches for anything drawn over the passcode pad and refuses to
continue.

### Accessibility services

An Android permission built for screen readers and similar tools. It lets an app
read every field on screen, including password fields, and act on your behalf.

Plenty of legitimate apps ask for it, which is why it is such a popular thing for
malware to abuse. While one is active, PasswordEpic stops key operations.

### Root, tampering and hooking

**Root** means the phone's built-in restrictions have been removed, so any app
can read any other app's data. **Tampering** means the app itself has been
modified and repackaged. **Hooking** means a tool has been injected into the
running app to watch or change what it does from the inside.

Encryption is worth something only while the app around it is intact. All three
are detected, and key operations refuse to run.

## Between your phone and us

### Certificate pinning

Normally your phone accepts any website certificate signed by any authority it
trusts — including certificates a workplace profile or an installed root has
added. That is exactly how connections get intercepted.

Pinning narrows it: the call that returns part of your vault key accepts **only a
fixed set of Google's own root certificates**, and refuses everything else, no
matter what your phone has been told to trust.

### TLS 1.3

The current version of the encryption used by every `https://` connection. Worth
naming only because "we use HTTPS" is not a security feature in 2026 — it is the
floor.

### Google Play Integrity

A Google service that answers one question: *is this the genuine, unmodified app,
running on a genuine, uncompromised Android device?*

The answer is checked **on our server**, not on the phone. That distinction is
the whole point — a modified app could simply skip a check it performs on itself,
but it cannot forge Google's signed answer to somebody else.

### Bot scoring on sign-in

An invisible check on each sign-in that scores how likely the attempt is to be
automated. You see nothing at all unless something looks wrong. It exists to make
mass, automated attacks against accounts expensive.

It runs as a Google service, so its use falls under
[Google's privacy policy](https://policies.google.com/privacy) as well as ours.

## On our side

### Cloud KMS and the "pepper"

**Cloud KMS** is Google's key management service. Part of it runs inside a
**hardware security module** — the server-side equivalent of your phone's
security chip: it will perform operations with a key but will not give the key
out, to anyone, including us.

The **pepper** is a secret held inside one of those modules. Our server uses it to
compute the third piece of your vault key. The pepper itself never leaves the
module, and never appears in a reply — not even to our own code.

### Firestore

The Google database our servers use. It holds your account details and **the
encrypted form** of one key shard.

It never holds your saved passwords. If someone took a complete copy of it, they
would hold two of the three pieces of your key and could not build the third,
because the third has never existed anywhere except inside your phone.

### OPAQUE

A way of proving you know a password without the other side ever learning
anything it could test guesses against, even offline.

On the Titanium tier this replaces the stored value that unwraps your vault, so
nothing capable of opening it is written to disk in any form. See
[Security tiers](./security-tiers.md).

### Rust crypto core

Part of the app is written in the Rust language, for one specific reason: it can
**erase secrets from memory** and be certain they are gone. JavaScript cannot —
its strings are copied and moved around by the runtime, and there is no reliable
way to wipe them.

## Read next

- [How it works](./how-it-works.md) — the shards, and why the split matters
- [Security tiers](./security-tiers.md) — which of these apply to which tier
- [Your passcode](./your-passcode.md) — the one secret you actually type
