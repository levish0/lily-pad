import type { Component } from 'svelte';
import { type SiteConfig } from './config.js';
/** The shape velite produces for each markdown page (lily-pad's doc schema). */
export interface DocEntry {
    title: string;
    description: string;
    path: string;
    navLabel?: string;
    section?: string;
    order?: number;
    links?: {
        doc?: string;
        api?: string;
        source?: string;
    };
    toc: TocEntry[];
    slug: string;
    slugFull: string;
}
export interface TocEntry {
    title: string;
    url: string;
    items: TocEntry[];
}
export interface NavItem {
    title: string;
    href: string;
}
export interface NavSection {
    title: string;
    items: NavItem[];
}
export interface DocsNav {
    sections(locale: string): NavSection[];
    neighbors(pathname: string, locale: string): {
        previous: NavItem | undefined;
        next: NavItem | undefined;
    };
}
/** Builds the sidebar for every locale once, from velite's docs collection. */
export declare function createNav(docs: DocEntry[], site: SiteConfig, locales: readonly string[], baseLocale: string): DocsNav;
export interface DocLoader {
    getDoc(slug: string, locale: string): Promise<{
        component: Component;
        metadata: DocEntry;
    }>;
    /** Canonical (locale-less) slugs for the prerender entry generator. */
    entries(): {
        slug: string;
    }[];
}
/** Resolves a canonical slug + locale to a compiled markdown component,
 *  falling back to the base locale when a translation is missing.
 *  `modules` is the user project's `import.meta.glob('/content/**\/*.md')`. */
export declare function createDocLoader(modules: Record<string, unknown>, docs: DocEntry[], baseLocale: string): DocLoader;
