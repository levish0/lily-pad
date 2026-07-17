/**
 * Site-wide configuration — everything the theme needs to know about this
 * site lives here, not scattered through components.
 *
 * Locale-varying text is a `Record<locale, string>`; the base locale is the
 * fallback when a translation is missing.
 */

export interface NavEntry {
	label: Record<string, string>;
	href: string;
}

export interface SiteConfig {
	/** Site name — browser tab suffix and search index identity. */
	title: string;
	/** Default meta description (used where a page has none). */
	description: string;
	/** GitHub repository URL; omit to hide the header icon link. */
	github?: string;
	/** Top navigation entries, in order. */
	nav: NavEntry[];
	/** Sidebar title for pages at each locale's content root. */
	rootSection: Record<string, string>;
}

export const site: SiteConfig = {
	title: 'lily-pad',
	description: 'A calm, minimal documentation generator for lily-svelte.',
	github: 'https://github.com/levish0/lily-pad',
	nav: [
		{ label: { en: 'Home', ko: '홈' }, href: '/' },
		{ label: { en: 'Docs', ko: '문서' }, href: '/docs' }
	],
	rootSection: { en: 'Getting Started', ko: '시작하기' }
};
