import { localized } from './config.js';
const DEFAULTS = {
    searchPlaceholder: { en: 'Search documentation…', ko: '문서 검색…' },
    searchNoResults: { en: 'No results found.', ko: '결과가 없습니다.' },
    prevPage: { en: 'Previous', ko: '이전 글' },
    nextPage: { en: 'Next', ko: '다음 글' }
};
export function themeString(site, key, locale, baseLocale) {
    return localized(site.strings?.[key] ?? DEFAULTS[key], locale, baseLocale);
}
