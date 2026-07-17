import { docs } from '$content/index.js';
import { baseLocale } from '$lib/paraglide/runtime';
import { error } from '@sveltejs/kit';
import type { Component } from 'svelte';

export type DocMetadata = (typeof docs)[number];

type DocResolver = () => Promise<{ default: Component }>;

function transformPath(path: string): string {
	return path.replace('/content/', '').replace('.md', '').replace('/index', '').trim();
}

/** Content lives in per-locale roots: `content/en/...`, `content/ko/...`.
 *  A canonical slug ('' for the index page) plus a locale picks the file;
 *  missing translations fall back to the base locale. */
function localePath(slug: string, locale: string): string {
	return slug === '' ? locale : `${locale}/${slug}`;
}

export async function getDoc(
	slug: string,
	locale: string
): Promise<{ component: Component; metadata: DocMetadata }> {
	const modules = import.meta.glob('/content/**/*.md');
	const candidates = [...new Set([localePath(slug, locale), localePath(slug, baseLocale)])];

	for (const candidate of candidates) {
		const metadata = docs.find((doc) => doc.path === candidate);
		if (!metadata) continue;

		for (const [path, resolve] of Object.entries(modules)) {
			if (transformPath(path) === candidate) {
				const doc = await (resolve as unknown as DocResolver)();
				return { component: doc.default, metadata };
			}
		}
	}

	error(404, 'Could not find the documentation page.');
}
