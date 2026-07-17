import { baseLocale, extractLocaleFromUrl } from '$lib/paraglide/runtime';

/** Locale for a URL, safe on both server and client.
 *  (runtime's getLocaleForUrl only evaluates the `url` strategy in the
 *  browser, so it throws during prerendering.) */
export function localeOfUrl(url: URL | string) {
	return extractLocaleFromUrl(url) ?? baseLocale;
}
