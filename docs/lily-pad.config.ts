import { defineSiteConfig } from 'lily-pad';

export const site = defineSiteConfig({
	title: 'lily-pad',
	description: 'A calm, minimal documentation generator for lily-svelte.',
	github: 'https://github.com/levish0/lily-pad',
	nav: [
		{ label: { en: 'Home', ko: '홈' }, href: '/' },
		{ label: { en: 'Docs', ko: '문서' }, href: '/docs' }
	],
	rootSection: { en: 'Introduction', ko: '소개' }
});
