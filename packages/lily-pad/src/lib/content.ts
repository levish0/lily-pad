import { error } from '@sveltejs/kit';
import type { Component } from 'svelte';
import { localized, type SiteConfig } from './config.js';

/** The shape velite produces for each markdown page (lily-pad's doc schema). */
export interface DocEntry {
	title: string;
	description: string;
	path: string;
	navLabel?: string;
	section?: string;
	order?: number;
	links?: { doc?: string; api?: string; source?: string };
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

function titleCase(segment: string): string {
	return segment
		.split('-')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');
}

/** Strips the locale root from a velite path: `ko/writing/markdown` → `writing/markdown`,
 *  and the locale's own index (`ko`) → ''. */
function canonicalPath(path: string, locale: string): string {
	if (path === locale) return '';
	return path.slice(locale.length + 1);
}

function isLocalePath(path: string, locale: string): boolean {
	return path === locale || path.startsWith(`${locale}/`);
}

function buildNav(
	docs: DocEntry[],
	locale: string,
	baseLocale: string,
	site: SiteConfig
): NavSection[] {
	// Pages missing in this locale fall back to the base locale so the
	// sidebar always shows the full tree.
	const own = docs.filter((doc) => isLocalePath(doc.path, locale));
	const ownCanonical = new Set(own.map((doc) => canonicalPath(doc.path, locale)));
	const fallback =
		locale === baseLocale
			? []
			: docs.filter(
					(doc) =>
						isLocalePath(doc.path, baseLocale) &&
						!ownCanonical.has(canonicalPath(doc.path, baseLocale))
				);

	const sorted = [...own, ...fallback].sort((a, b) => (a.order ?? 999) - (b.order ?? 999));

	const sections = new Map<
		string,
		{ title: string | undefined; minOrder: number; items: NavItem[] }
	>();
	for (const doc of sorted) {
		const docLocale = isLocalePath(doc.path, locale) ? locale : baseLocale;
		const canonical = canonicalPath(doc.path, docLocale);
		const key = canonical.includes('/') ? canonical.split('/')[0] : '';
		const section = sections.get(key) ?? {
			title: undefined,
			minOrder: doc.order ?? 999,
			items: []
		};
		section.title ??= doc.section;
		section.minOrder = Math.min(section.minOrder, doc.order ?? 999);
		section.items.push({
			title: doc.navLabel ?? doc.title,
			href: canonical === '' ? '/docs' : `/docs/${canonical}`
		});
		sections.set(key, section);
	}

	return [...sections.entries()]
		.sort(([keyA, a], [keyB, b]) => {
			// Root-level pages always lead; folders follow by their lowest page order.
			if (keyA === '') return -1;
			if (keyB === '') return 1;
			return a.minOrder - b.minOrder;
		})
		.map(([key, section]) => ({
			title:
				section.title ??
				(key === '' ? localized(site.rootSection, locale, baseLocale) : titleCase(key)),
			items: section.items
		}));
}

export interface DocsNav {
	sections(locale: string): NavSection[];
	neighbors(
		pathname: string,
		locale: string
	): { previous: NavItem | undefined; next: NavItem | undefined };
}

/** Builds the sidebar for every locale once, from velite's docs collection. */
export function createNav(
	docs: DocEntry[],
	site: SiteConfig,
	locales: readonly string[],
	baseLocale: string
): DocsNav {
	const byLocale = new Map(locales.map((l) => [l, buildNav(docs, l, baseLocale, site)]));

	function sections(locale: string): NavSection[] {
		return byLocale.get(locale) ?? byLocale.get(baseLocale) ?? [];
	}

	return {
		sections,
		/** `pathname` must already be delocalized (canonical `/docs/...`). */
		neighbors(pathname, locale) {
			const flat = sections(locale).flatMap((section) => section.items);
			const path = pathname.replace(/\/$/, '') || '/';
			const index = flat.findIndex((item) => item.href === path);
			if (index === -1) return { previous: undefined, next: undefined };
			return { previous: flat[index - 1], next: flat[index + 1] };
		}
	};
}

type DocModule = () => Promise<{ default: Component }>;

function transformPath(path: string): string {
	return path.replace('/content/', '').replace('.md', '').replace('/index', '').trim();
}

function localePath(slug: string, locale: string): string {
	return slug === '' ? locale : `${locale}/${slug}`;
}

export interface DocLoader {
	getDoc(slug: string, locale: string): Promise<{ component: Component; metadata: DocEntry }>;
	/** Canonical (locale-less) slugs for the prerender entry generator. */
	entries(): { slug: string }[];
}

/** Resolves a canonical slug + locale to a compiled markdown component,
 *  falling back to the base locale when a translation is missing.
 *  `modules` is the user project's `import.meta.glob('/content/**\/*.md')`. */
export function createDocLoader(
	modules: Record<string, unknown>,
	docs: DocEntry[],
	baseLocale: string
): DocLoader {
	return {
		async getDoc(slug, locale) {
			const candidates = [...new Set([localePath(slug, locale), localePath(slug, baseLocale)])];

			for (const candidate of candidates) {
				const metadata = docs.find((doc) => doc.path === candidate);
				if (!metadata) continue;

				for (const [path, resolve] of Object.entries(modules)) {
					if (transformPath(path) === candidate) {
						const doc = await (resolve as DocModule)();
						return { component: doc.default, metadata };
					}
				}
			}

			error(404, 'Could not find the documentation page.');
		},
		entries() {
			const slugs = new Set<string>();
			for (const path of Object.keys(modules)) {
				// Drop the locale root: `ko/writing/markdown` → `writing/markdown`; a
				// locale's own index (`ko`) → ''. Localized URLs (/ko/docs/...) are
				// discovered by the prerender crawler via the layout's alternate links.
				slugs.add(transformPath(path).split('/').slice(1).join('/'));
			}
			return [...slugs].map((slug) => ({ slug }));
		}
	};
}
