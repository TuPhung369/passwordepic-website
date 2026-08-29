---
title: Autofill
description: Turning on autofill, what happens each time it fires, and what a screen recorder can and cannot see.
hide_table_of_contents: true
---

# Autofill

PasswordEpic fills logins through Android's own autofill framework. It does not
watch your screen, and it does not need an accessibility permission to work.

## Turning it on

1. Open Android **Settings → Passwords & accounts → Autofill service**.
2. Choose **PasswordEpic**.

That is the whole setup. Autofill needs **Android 8.0 or newer**.

If it does not appear afterwards:

- Check the setting again — some launchers reset it after an update.
- Some apps opt out of autofill entirely. That is their choice, not a fault in
  PasswordEpic, and no password manager can fill those fields.
- The autofill dialog is a separate window from the main app. If it is not
  appearing at all, make sure PasswordEpic is not being restricted in the
  background by battery optimisation.

## What happens each time

1. You tap a login field in another app or a website.
2. **Android** — not PasswordEpic — notices the field and asks the selected
   autofill service for suggestions.
3. PasswordEpic asks you to confirm with a **fingerprint or your passcode**.
   Every time, without exception.
4. The one entry being filled is decrypted, for that fill only. The rest of the
   vault stays encrypted.
5. The plaintext and the key are released as soon as the field is filled.

There is no window during which fills happen unattended, and no "unlock for 5
minutes" mode.

## What a screen recorder sees

The app's own windows — including the autofill dialog — are excluded from
screenshots and screen recordings. Under a recording they appear black.

**The keyboard is not one of those windows.** It is drawn by whichever keyboard
app you use, in its own process, and no app can extend that protection to
another app's window. A recording therefore shows a blacked-out dialog with a
fully visible keyboard beneath it.

Two things follow, and both matter:

- **Key-preview bubbles are the real leak.** Keyboards suppress the little
  letter that pops up above each key only for password fields — so the passcode
  field stays in password mode permanently, even when you tap the eye to reveal
  what you typed. Revealing the text inside a protected window is safe;
  taking the keyboard out of password mode is not.
- **Touch positions are not recorded** unless you have turned on the "Show taps"
  developer option.

The residual exposure is small, but it is not zero. Eliminating it entirely
would require an in-app keypad, which would mean giving up passcodes that
contain letters and symbols.

:::caution Your keyboard can read what you type

This is true in every app, not just this one. A keyboard you install sees every
keystroke you give it.

If that matters to you, use the keyboard that shipped with your phone.
PasswordEpic warns you when the active keyboard did not.

:::

## Signing out

Signing out revokes autofill immediately. The service stops offering
suggestions rather than continuing to answer requests with a stale session.

## Read next

- [Your passcode](./your-passcode.md) — what you will be asked for on each fill
- [How it works](./how-it-works.md) — what has to happen before an entry can be decrypted
