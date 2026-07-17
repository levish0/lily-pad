---
title: Site Config
description: Every option in lily-pad.config.ts — the one file that configures the site.
section: Reference
order: 30
---

Site-wide settings live in `lily-pad.config.ts` at the project root. The theme reads everything from here — nothing is hardcoded in components.

```ts
export const site: SiteConfig = {
	title: 'lily-pad',
	description: 'A calm, minimal documentation generator for lily-svelte.',
	github: 'https://github.com/levish0/lily-pad',
	nav: [
		{ label: { en: 'Home', ko: '홈' }, href: '/' },
		{ label: { en: 'Docs', ko: '문서' }, href: '/docs' }
	],
	rootSection: { en: 'Introduction', ko: '소개' }
};
```

## Options

| Option        | Type                     | What it does                                                    |
| ------------- | ------------------------ | --------------------------------------------------------------- |
| `title`       | `string`                 | Site name — browser tab suffix on every page                    |
| `description` | `string`                 | Default meta description                                        |
| `github`      | `string?`                | Repository URL; omit to hide the header GitHub icon             |
| `nav`         | `NavEntry[]`             | Top navigation entries, in order                                |
| `rootSection` | `Record<locale, string>` | Sidebar title for pages at each locale's content root           |

## Localized text

Anything the reader sees is a `Record<locale, string>` — one entry per locale, with the base locale as fallback:

```ts
{ label: { en: 'Home', ko: '홈' }, href: '/' }
```

Adding a locale? See [Internationalization](/docs/guide/i18n).
