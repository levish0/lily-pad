import { docs } from '$content/index.js';
import { baseLocale, locales } from '$lib/paraglide/runtime';

export interface NavItem {
	title: string;
	href: string;
}

export interface NavSection {
	title: string;
	items: NavItem[];
}

const ROOT_SECTION: Record<string, string> = {
	en: 'Getting Started',
	ko: '시작하기'
};

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

function buildNav(locale: string): NavSection[] {
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
			title: section.title ?? (key === '' ? (ROOT_SECTION[locale] ?? 'Docs') : titleCase(key)),
			items: section.items
		}));
}

const navByLocale = new Map<string, NavSection[]>(
	locales.map((locale) => [locale, buildNav(locale)])
);

export function getDocsNav(locale: string): NavSection[] {
	return navByLocale.get(locale) ?? navByLocale.get(baseLocale)!;
}

/** `pathname` must already be delocalized (canonical `/docs/...`). */
export function findNeighbors(
	pathname: string,
	locale: string
): {
	previous: NavItem | undefined;
	next: NavItem | undefined;
} {
	const flat = getDocsNav(locale).flatMap((section) => section.items);
	const path = pathname.replace(/\/$/, '') || '/';
	const index = flat.findIndex((item) => item.href === path);
	if (index === -1) return { previous: undefined, next: undefined };
	return {
		previous: flat[index - 1],
		next: flat[index + 1]
	};
}
