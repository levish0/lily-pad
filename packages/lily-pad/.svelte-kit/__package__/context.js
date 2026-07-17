import { getContext, setContext } from 'svelte';
import { themeString } from './strings.js';
const KEY = Symbol('lily-pad');
export function setLilyPad(input) {
    const { site, runtime, nav } = input;
    const context = {
        site,
        runtime,
        nav,
        localeOf: (url) => runtime.extractLocaleFromUrl(url) ?? runtime.baseLocale,
        str: (key, locale) => themeString(site, key, locale, runtime.baseLocale)
    };
    return setContext(KEY, context);
}
export function getLilyPad() {
    const context = getContext(KEY);
    if (!context) {
        throw new Error('lily-pad context missing — wrap your root layout in <AppShell> (or call setLilyPad).');
    }
    return context;
}
