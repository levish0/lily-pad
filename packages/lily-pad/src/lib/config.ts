/** Text that varies per locale — one entry per locale code, base locale as fallback. */
export type LocalizedText = Record<string, string>;

export interface NavEntry {
	label: LocalizedText;
	href: string;
}

export interface SiteConfig {
	/** Site name — browser tab suffix and header identity. */
	title: string;
	/** Default meta description (used where a page has none). */
	description: string;
	/** GitHub repository URL; omit to hide the header icon link. */
	github?: string;
	/** Top navigation entries, in order. */
	nav: NavEntry[];
	/** Sidebar title for pages at each locale's content root. */
	rootSection: LocalizedText;
	/** Overrides for the theme's built-in UI strings (search placeholder, prev/next…). */
	strings?: Partial<Record<ThemeStringKey, LocalizedText>>;
}

export type ThemeStringKey = 'searchPlaceholder' | 'searchNoResults' | 'prevPage' | 'nextPage';

/** Identity helper so user configs get type checking and completion. */
export function defineSiteConfig(config: SiteConfig): SiteConfig {
	return config;
}

/** Picks a locale's variant from localized text, falling back through `fallbackLocale`. */
export function localized(
	text: LocalizedText | undefined,
	locale: string,
	fallbackLocale: string
): string {
	if (!text) return '';
	return text[locale] ?? text[fallbackLocale] ?? Object.values(text)[0] ?? '';
}
