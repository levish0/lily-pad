import { baseLocale } from '$lib/paraglide/runtime';
import { site } from '$config';

export { site };

/** Picks a locale's variant from config text, falling back to the base locale. */
export function localized(text: Record<string, string>, locale: string): string {
	return text[locale] ?? text[baseLocale] ?? Object.values(text)[0] ?? '';
}
