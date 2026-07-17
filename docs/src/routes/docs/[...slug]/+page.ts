import { getDoc } from '$lib/docs.js';
import { localeOfUrl } from '$lib/locale.js';
import type { EntryGenerator, PageLoad } from './$types.js';

export const prerender = true;

export const entries: EntryGenerator = () => {
	const modules = import.meta.glob('/content/**/*.md');
	const slugs = new Set<string>();

	for (const path of Object.keys(modules)) {
		const localePath = path.replace('/content/', '').replace('.md', '').replace('/index', '');
		// Drop the locale root: `ko/writing/markdown` → `writing/markdown`; a
		// locale's own index (`ko`) → ''. Localized URLs (/ko/docs/...) are
		// discovered by the prerender crawler via the layout's alternate links.
		slugs.add(localePath.split('/').slice(1).join('/'));
	}

	return [...slugs].map((slug) => ({ slug }));
};

export const load: PageLoad = async ({ params, url }) => {
	const doc = await getDoc(params.slug, localeOfUrl(url));
	return { ...doc };
};
