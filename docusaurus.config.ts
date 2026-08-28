import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

/**
 * Site config for passwordepic.com.
 *
 * Two settings here are load-bearing rather than cosmetic:
 *
 *  - `url` + `baseUrl` must match the custom domain exactly. The app links to
 *    `https://passwordepic.com/privacy`, and Google Play fetches that URL when
 *    reviewing the listing — a wrong baseUrl turns it into a 404 and the
 *    submission is rejected.
 *  - `onBrokenLinks: 'throw'` keeps the build honest. This site documents a
 *    product whose security claims must stay exact; a dead link to the page
 *    that qualifies a claim is how the unqualified version survives.
 */
const config: Config = {
  title: 'PasswordEpic',
  tagline: 'A password manager that cannot read your passwords',
  favicon: 'img/favicon.svg',

  url: 'https://passwordepic.com',
  baseUrl: '/',

  organizationName: 'TuPhung369',
  projectName: 'passwordepic-website',
  // Emits `privacy/index.html` rather than a flat `privacy.html`.
  //
  // Directory-with-index is the one layout every static host serves the same
  // way. The flat form relies on the host guessing an `.html` extension, and
  // `/privacy` is the URL Google Play fetches when reviewing the listing - not
  // somewhere to depend on host-specific behaviour.
  trailingSlash: true,

  onBrokenLinks: 'throw',
  markdown: {
    // Top-level `onBrokenMarkdownLinks` is deprecated and removed in v4.
    hooks: { onBrokenMarkdownLinks: 'warn' },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: 'docs',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/logo.svg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'PasswordEpic',
      logo: { alt: 'PasswordEpic', src: 'img/logo.svg' },
      items: [
        { to: '/docs/how-it-works', label: 'How it works', position: 'left' },
        { to: '/support', label: 'Support', position: 'left' },
        { to: '/privacy', label: 'Privacy', position: 'right' },
        { to: '/terms', label: 'Terms', position: 'right' },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Product',
          items: [
            { label: 'Overview', to: '/' },
            { label: 'How it works', to: '/docs/how-it-works' },
          ],
        },
        {
          title: 'Legal',
          items: [
            { label: 'Privacy Policy', to: '/privacy' },
            { label: 'Terms of Service', to: '/terms' },
          ],
        },
        {
          title: 'Help',
          items: [
            { label: 'Support', to: '/support' },
            { label: 'support@passwordepic.com', href: 'mailto:support@passwordepic.com' },
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} PasswordEpic`,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
