import { defineSiteConfig } from 'lily-pad';

export const site = defineSiteConfig({
	title: 'My Docs',
	description: 'Documentation built with lily-pad.',
	// github: 'https://github.com/you/your-repo',
	nav: [
		{ label: { en: 'Home', ko: '홈' }, href: '/' },
		{ label: { en: 'Docs', ko: '문서' }, href: '/docs' }
	],
	rootSection: { en: 'Introduction', ko: '소개' }
});
