import { getContext, setContext } from 'svelte';
import type { SiteConfig, ThemeStringKey } from './config.js';
import type { DocsNav } from './content.js';
import { themeString } from './strings.js';

/** The locale plumbing lily-pad needs from the host app — matches the shape
 *  of paraglide's generated runtime, but any implementation works. */
export interface LocaleRuntime {
	locales: readonly string[];
	baseLocale: string;
	localizeHref(href: string, options?: { locale?: string }): string;
	deLocalizeHref(href: string): string;
	extractLocaleFromUrl(url: URL | string): string | undefined;
}

export interface LilyPadContext {
	site: SiteConfig;
	runtime: LocaleRuntime;
	nav: DocsNav;
	/** Locale for a URL — safe on both server and client. */
	localeOf(url: URL | string): string;
	/** Theme UI string (search placeholder, prev/next…) for a locale. */
	str(key: ThemeStringKey, locale: string): string;
}

const KEY = Symbol('lily-pad');

export function setLilyPad(input: {
	site: SiteConfig;
	runtime: LocaleRuntime;
	nav: DocsNav;
}): LilyPadContext {
	const { site, runtime, nav } = input;
	const context: LilyPadContext = {
		site,
		runtime,
		nav,
		localeOf: (url) => runtime.extractLocaleFromUrl(url) ?? runtime.baseLocale,
		str: (key, locale) => themeString(site, key, locale, runtime.baseLocale)
	};
	return setContext(KEY, context);
}

export function getLilyPad(): LilyPadContext {
	const context = getContext<LilyPadContext | undefined>(KEY);
	if (!context) {
		throw new Error(
			'lily-pad context missing — wrap your root layout in <AppShell> (or call setLilyPad).'
		);
	}
	return context;
}
