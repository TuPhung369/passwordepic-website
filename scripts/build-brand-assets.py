#!/usr/bin/env python3
"""Derive the website's brand assets from the app icon in `logo/`.

Run after replacing the icon:

    python scripts/build-brand-assets.py

Everything it writes into `static/img/` is generated - edit this script rather
than the PNGs, so a new icon can be dropped in without anyone reverse-
engineering how the social card was laid out.

Why the adaptive *foreground* layer is the source, and not `logo/logo.png`:
that master is 1024px but sits on an opaque white background, and the artwork
contains genuine white (sun-key highlights, water foam). Keying the background
out by luminance would eat those highlights; flood-filling from the edges
leaves a white halo on anti-aliased edges, which shows up against the dark
navbar. The adaptive foreground is already cut with real alpha, so it composites
cleanly onto both themes. It gives 288x288 of usable artwork, which is 9x what
the 32px navbar needs and exactly the size the social card wants - so nothing
is ever upscaled.
"""

import os
from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, 'logo', 'res', 'mipmap-xxxhdpi', 'logo_adaptive_fore.png')
OUT = os.path.join(ROOT, 'static', 'img')

# Matches --ifm-color-primary's dark-mode surface in src/css/custom.css.
CARD_BG = (15, 23, 42)
CARD_ACCENT = (37, 99, 235)
CARD_TITLE = (248, 250, 252)
CARD_MUTED = (148, 163, 184)

FONT_BOLD = r'C:\Windows\Fonts\segoeuib.ttf'
FONT_REG = r'C:\Windows\Fonts\segoeui.ttf'


def artwork() -> Image.Image:
    """The five keys, tightly cropped, with the adaptive safe-zone removed."""
    if not os.path.exists(SRC):
        raise SystemExit(
            f'Missing {os.path.relpath(SRC, ROOT)}.\n'
            'Drop the Android icon export into logo/ (the same layout Android '
            'Studio produces), or point SRC at whatever transparent, '
            'square PNG of the mark you have.'
        )
    im = Image.open(SRC).convert('RGBA')
    return im.crop(im.getchannel('A').getbbox())


def square(art: Image.Image, size: int, pad_ratio: float = 0.0) -> Image.Image:
    """Centre `art` on a transparent square canvas of `size`."""
    inner = round(size * (1 - 2 * pad_ratio))
    scaled = art.resize((inner, inner), Image.LANCZOS)
    canvas = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    canvas.paste(scaled, ((size - inner) // 2, (size - inner) // 2), scaled)
    return canvas


def social_card(art: Image.Image) -> Image.Image:
    """1200x630 Open Graph card.

    Deliberately language-neutral - mark, wordmark, domain, no tagline. The
    site ships in English and Vietnamese off one `themeConfig.image`, so a
    tagline here would be the wrong language on half the pages.
    """
    w, h = 1200, 630
    card = Image.new('RGB', (w, h), CARD_BG)
    draw = ImageDraw.Draw(card)

    # Native size: the artwork is 288px and is never scaled here.
    logo_x, logo_y = 96, (h - art.height) // 2
    card.paste(art, (logo_x, logo_y), art)

    text_x = logo_x + art.width + 72
    title_font = ImageFont.truetype(FONT_BOLD, 86)
    domain_font = ImageFont.truetype(FONT_REG, 34)

    draw.text((text_x, 250), 'PasswordEpic', font=title_font, fill=CARD_TITLE)
    draw.rectangle([text_x, 358, text_x + 120, 364], fill=CARD_ACCENT)
    draw.text((text_x, 396), 'passwordepic.com', font=domain_font, fill=CARD_MUTED)

    return card


def main() -> None:
    os.makedirs(OUT, exist_ok=True)
    art = artwork()
    print(f'artwork: {art.size}')

    # Navbar mark. Rendered at 32px, so 256 covers every display density.
    square(art, 256).save(os.path.join(OUT, 'logo.png'))

    # Multi-size favicon: browsers pick per context (tab, bookmark, taskbar).
    square(art, 64).save(
        os.path.join(OUT, 'favicon.ico'),
        sizes=[(16, 16), (32, 32), (48, 48)],
    )

    # Home-screen icon. iOS ignores alpha and composites onto black, so this
    # one gets the white ground the app icon already uses.
    touch = Image.new('RGBA', (180, 180), (255, 255, 255, 255))
    inner = square(art, 180, pad_ratio=0.08)
    touch.paste(inner, (0, 0), inner)
    touch.convert('RGB').save(os.path.join(OUT, 'apple-touch-icon.png'))

    social_card(art).save(os.path.join(OUT, 'social-card.png'))

    for name in ('logo.png', 'favicon.ico', 'apple-touch-icon.png', 'social-card.png'):
        p = os.path.join(OUT, name)
        print(f'  {name:24s} {os.path.getsize(p):>8,} bytes')


if __name__ == '__main__':
    main()
