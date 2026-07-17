/** Identity helper so user configs get type checking and completion. */
export function defineSiteConfig(config) {
    return config;
}
/** Picks a locale's variant from localized text, falling back through `fallbackLocale`. */
export function localized(text, locale, fallbackLocale) {
    if (!text)
        return '';
    return text[locale] ?? text[fallbackLocale] ?? Object.values(text)[0] ?? '';
}
