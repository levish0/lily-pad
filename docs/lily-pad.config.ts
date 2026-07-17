import { defineSiteConfig } from '@levish0/lily-pad';

export const site = defineSiteConfig({
	title: 'lily-pad',
	description: 'A calm, minimal documentation generator for lily-svelte.',
	github: 'https://github.com/levish0/lily-pad',
	nav: [
		{ label: { en: 'Home', ko: '홈' }, href: '/' },
		{ label: { en: 'Docs', ko: '문서' }, href: '/docs' }
	],
	rootSection: { en: 'Introduction', ko: '소개' },
	footer: {
		message: {
			en: 'Built by <a href="https://levish-ac.pages.dev" class="link">levish</a>. The source code is available on <a href="https://github.com/levish0/lily-pad" class="link">GitHub</a>.'
		},
		note: { en: 'Quiet by design.' }
	},
	home: {
		headline: {
			en: 'Calm documentation sites, from markdown.',
			ko: '마크다운으로 만드는 차분한 문서 사이트.'
		},
		features: [
			{
				icon: 'heroicons:document-text-solid',
				title: { en: 'Markdown-first', ko: '마크다운 우선' },
				description: {
					en: 'Write .md files, get pages. Frontmatter drives the title, description, and sidebar — nothing is registered by hand.',
					ko: '.md 파일을 쓰면 페이지가 됩니다. frontmatter가 제목·설명·사이드바를 결정하고, 수동 등록은 없습니다.'
				},
				href: '/docs/writing/markdown'
			},
			{
				icon: 'heroicons:language-solid',
				title: { en: 'Multilingual', ko: '다국어' },
				description: {
					en: 'Per-locale content folders, URL prefixes, base-locale fallback, and a language dropdown — built in.',
					ko: '로케일별 콘텐츠 폴더, URL 접두사, 기본 로케일 폴백, 언어 드롭다운까지 내장.'
				},
				href: '/docs/guide/i18n'
			},
			{
				icon: 'heroicons:magnifying-glass-solid',
				title: { en: 'Full-text search', ko: '풀텍스트 검색' },
				description: {
					en: '⌘K search over every page, indexed per language at build time with pagefind.',
					ko: '⌘K로 모든 페이지 검색 — pagefind가 빌드 때 언어별로 인덱싱합니다.'
				}
			},
			{
				icon: 'heroicons:command-line-solid',
				title: { en: 'One command', ko: '명령 하나로' },
				code: 'pnpm create @levish0/lily-pad my-docs',
				span: 2,
				href: '/docs/getting-started'
			},
			{
				icon: 'heroicons:sparkles-solid',
				title: { en: 'Svelte in markdown', ko: '마크다운 속 Svelte' },
				description: {
					en: 'Every page compiles to a Svelte component — import and render live components mid-document.',
					ko: '모든 페이지가 Svelte 컴포넌트로 컴파일됩니다 — 문서 중간에 라이브 컴포넌트를 렌더링하세요.'
				},
				href: '/docs/writing/svelte'
			},
			{
				icon: 'heroicons:code-bracket-solid',
				title: { en: 'Calm code blocks', ko: '차분한 코드 블록' },
				description: {
					en: 'Shiki highlighting with dual light/dark themes, callout containers, and CJK-friendly typography.',
					ko: '라이트/다크 듀얼 테마 shiki 하이라이팅, 콜아웃 컨테이너, CJK 친화 타이포그래피.'
				},
				href: '/docs/writing/code-blocks'
			},
			{
				icon: 'heroicons:cloud-arrow-up-solid',
				title: { en: 'Deploy anywhere', ko: '어디에나 배포' },
				description: {
					en: 'Prerendered to static HTML in every locale — Cloudflare Pages by default, any static host with an adapter swap.',
					ko: '모든 로케일이 정적 HTML로 프리렌더 — 기본은 Cloudflare Pages, 어댑터만 바꾸면 어디든.'
				},
				href: '/docs/guide/deploy',
				span: 2
			}
		]
	}
});
