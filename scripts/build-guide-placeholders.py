#!/usr/bin/env python3
"""Generate placeholder screenshots for the user guide.

    python scripts/build-guide-placeholders.py

Each one is a labelled grey frame at the aspect ratio the real screenshot
should have. The point is that the guide is publishable *now*, and swapping in
a real screenshot later is a file overwrite - same path, same name, no Markdown
to edit and no layout shift when it lands.

The label on each placeholder names the file and describes the shot, so
whoever takes the screenshots does not need this script or the guide open to
know what is wanted.
"""

import os

from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'static', 'img', 'guide')

BG = (238, 241, 247)
FRAME = (176, 186, 203)
TITLE = (51, 65, 85)
BODY = (100, 116, 139)
ACCENT = (37, 99, 235)

FONT_BOLD = r'C:\Windows\Fonts\segoeuib.ttf'
FONT_REG = r'C:\Windows\Fonts\segoeui.ttf'

# name, (w, h), title, description of the shot wanted
SHOTS = [
    ('vault-header', (1000, 260), 'Vault — the eight buttons',
     'Crop of the top bar only. Number the buttons 1-8, left to right.'),
    ('vault-list', (620, 900), 'Vault — the list',
     'A few saved entries, showing the strength bar and the favourite star.'),
    ('vault-entry', (620, 1100), 'Vault — one entry open',
     'A single entry expanded, with the copy and reveal controls visible.'),
    ('vault-add', (620, 1200), 'Add password — the form',
     'The Add Password form with Title, Username, Password and Website filled in.'),
    ('vault-bulk', (620, 900), 'Vault — selection mode',
     'Selection mode on, with two or three entries ticked and the action bar showing.'),
    ('generator-main', (620, 1200), 'Generator — the main screen',
     'A generated password, the length slider and the four character switches.'),
    ('generator-presets', (620, 900), 'Generator — presets',
     'The preset sheet open: Strong, Memory, PIN, Phrase, WiFi, Basic.'),
    ('generator-history', (620, 900), 'Generator — history',
     'The history list with a few generated passwords.'),
    ('settings-security', (620, 1200), 'Settings — Security',
     'The Security section: biometrics, autofill, passcode, auto-lock, protections.'),
    ('settings-tier', (620, 1000), 'Settings — Security tier',
     'The tier picker open, showing Silver, Gold, Platinum and Titanium.'),
    ('settings-general', (620, 900), 'Settings — General and Support',
     'Language, backup and restore, help, and Reset Account at the bottom.'),
]


def wrap(draw, text, font, max_width):
    words, lines, line = text.split(), [], ''
    for w in words:
        trial = f'{line} {w}'.strip()
        if draw.textlength(trial, font=font) <= max_width:
            line = trial
        else:
            lines.append(line)
            line = w
    if line:
        lines.append(line)
    return lines


def placeholder(name: str, size, title: str, description: str) -> Image.Image:
    w, h = size
    img = Image.new('RGB', size, BG)
    d = ImageDraw.Draw(img)

    # Dashed frame, so it never reads as a finished asset.
    inset, dash, gap = 14, 16, 12
    for x in range(inset, w - inset, dash + gap):
        d.line([(x, inset), (min(x + dash, w - inset), inset)], fill=FRAME, width=3)
        d.line([(x, h - inset), (min(x + dash, w - inset), h - inset)], fill=FRAME, width=3)
    for y in range(inset, h - inset, dash + gap):
        d.line([(inset, y), (inset, min(y + dash, h - inset))], fill=FRAME, width=3)
        d.line([(w - inset, y), (w - inset, min(y + dash, h - inset))], fill=FRAME, width=3)

    title_font = ImageFont.truetype(FONT_BOLD, 34 if w > 700 else 30)
    body_font = ImageFont.truetype(FONT_REG, 24 if w > 700 else 21)
    path_font = ImageFont.truetype(FONT_REG, 20 if w > 700 else 18)

    max_text = w - 120
    body_lines = wrap(d, description, body_font, max_text)
    path_text = f'static/img/guide/{name}.png'

    block = 46 + 34 + len(body_lines) * 32 + 26
    y = (h - block) // 2

    d.text((w // 2, y), 'SCREENSHOT', font=path_font, fill=ACCENT, anchor='ma')
    y += 40
    d.text((w // 2, y), title, font=title_font, fill=TITLE, anchor='ma')
    y += 52
    for line in body_lines:
        d.text((w // 2, y), line, font=body_font, fill=BODY, anchor='ma')
        y += 32
    y += 12
    d.text((w // 2, y), path_text, font=path_font, fill=FRAME, anchor='ma')

    return img


def main() -> None:
    os.makedirs(OUT, exist_ok=True)
    for name, size, title, description in SHOTS:
        p = os.path.join(OUT, f'{name}.png')
        placeholder(name, size, title, description).save(p)
        print(f'  {name+".png":26s} {size[0]}x{size[1]:<5} {os.path.getsize(p):>7,} bytes')
    print(f'{len(SHOTS)} placeholders in static/img/guide/')


if __name__ == '__main__':
    main()
