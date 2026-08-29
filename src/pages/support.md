---
title: Support
description: Help with PasswordEpic — account reactivation, device changes, and what can and cannot be recovered.
hide_table_of_contents: true
---

# Support

Email [support@passwordepic.com](mailto:support@passwordepic.com). Include the
email address you sign in with — it is what we look up.

## "Account is active on another device"

Each account runs on one device at a time. To use a new phone, open PasswordEpic
on the device that currently holds the account and choose
**Settings → Reset Account**. That erases the data on the old device and frees
the account.

If you no longer have that device, email us and we will release it for you.
Please write from, or mention, the account's email address.

:::warning Releasing an account does not recover its passwords

It lets you start fresh on the new device. The old vault stays encrypted with a
key that existed only inside the old phone's secure hardware.

:::

## I forgot my passcode

There is nothing we can do, and that is deliberate: the passcode never reaches
our servers, so we have nothing to reset it against. The vault cannot be opened
without it.

## Can I move my vault to a new phone?

No. Backups and exports carry a layer of encryption tied to the device that
wrote them, so a file copied to another phone will not open. Backups protect you
against losing data *on the phone you still have* — an accidental deletion, a
bad import, a vault reset.

We would rather say this plainly than let you discover it after losing a device.

## Autofill is not appearing

Start with **Android Settings → Passwords & accounts → Autofill service** and
make sure PasswordEpic is selected. Autofill needs Android 8.0 or newer.

If it works in apps but not on websites, Chrome needs one extra setting of its
own — that and the per-brand menu paths are in
[Setting up autofill](/docs/autofill).

For everything else, including the messages the app can show you and what they
mean, see [Common problems](/docs/faq).

## Reporting a security issue

Email [support@passwordepic.com](mailto:support@passwordepic.com) with
"security" in the subject. Please give us a reasonable chance to fix an issue
before disclosing it publicly.

## Deleting your data

**Settings → Reset Account** erases your vault and account data immediately. You
can also email us to request deletion.
