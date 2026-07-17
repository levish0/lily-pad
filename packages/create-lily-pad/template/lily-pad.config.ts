import { defineSiteConfig } from '@levish0/lily-pad';

export const site = defineSiteConfig({
	title: 'My Docs',
	description: 'Documentation built with lily-pad.',
	// github: 'https://github.com/you/your-repo',
	nav: [
		{ label: { en: 'Home', ko: '홈' }, href: '/' },
		{ label: { en: 'Docs', ko: '문서' }, href: '/docs' }
	],
	rootSection: { en: 'Introduction', ko: '소개' },
	home: {
		features: [
			{
				icon: 'heroicons:document-text-solid',
				title: { en: 'Write markdown', ko: '마크다운 쓰기' },
				description: {
					en: 'Add .md files under content/ — the sidebar updates automatically.',
					ko: 'content/ 아래에 .md 파일을 추가하면 사이드바가 자동으로 갱신됩니다.'
				},
				href: '/docs'
			},
			{
				icon: 'heroicons:paint-brush-solid',
				title: { en: 'Make it yours', ko: '내 것으로' },
				description: {
					en: 'Site title, nav, and this grid all live in lily-pad.config.ts.',
					ko: '사이트 제목, 네비, 이 그리드 전부 lily-pad.config.ts에 있습니다.'
				}
			},
			{
				icon: 'heroicons:language-solid',
				title: { en: 'Translate', ko: '번역' },
				description: {
					en: 'Mirror your pages into another content/<locale>/ folder.',
					ko: '다른 content/<로케일>/ 폴더에 페이지를 미러링하세요.'
				}
			}
		]
	}
});
