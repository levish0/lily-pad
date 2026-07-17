import type { SiteConfig, ThemeStringKey } from './config.js';
import type { DocsNav } from './content.js';
/** The locale plumbing lily-pad needs from the host app — matches the shape
 *  of paraglide's generated runtime, but any implementation works. */
export interface LocaleRuntime {
    locales: readonly string[];
    baseLocale: string;
    localizeHref(href: string, options?: {
        locale?: string;
    }): string;
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
export declare function setLilyPad(input: {
    site: SiteConfig;
    runtime: LocaleRuntime;
    nav: DocsNav;
}): LilyPadContext;
export declare function getLilyPad(): LilyPadContext;
