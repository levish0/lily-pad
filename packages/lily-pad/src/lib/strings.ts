import { localized, type LocalizedText, type SiteConfig, type ThemeStringKey } from './config.js';

const DEFAULTS: Record<ThemeStringKey, LocalizedText> = {
	searchPlaceholder: { en: 'Search documentation…', ko: '문서 검색…' },
	searchNoResults: { en: 'No results found.', ko: '결과가 없습니다.' },
	prevPage: { en: 'Previous', ko: '이전 글' },
	nextPage: { en: 'Next', ko: '다음 글' },
	getStarted: { en: 'Get started', ko: '시작하기' }
};

export function themeString(
	site: SiteConfig,
	key: ThemeStringKey,
	locale: string,
	baseLocale: string
): string {
	return localized(site.strings?.[key] ?? DEFAULTS[key], locale, baseLocale);
}
