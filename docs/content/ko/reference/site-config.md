---
title: 사이트 설정
description: lily-pad.config.ts의 모든 옵션 — 사이트를 설정하는 단 하나의 파일.
navLabel: 사이트 설정
section: 레퍼런스
order: 30
---

사이트 전역 설정은 프로젝트 루트의 `lily-pad.config.ts`에 있습니다. 테마는 모든 것을 여기서 읽습니다 — 컴포넌트에 하드코딩된 건 없습니다.

```ts
export const site: SiteConfig = {
	title: 'lily-pad',
	description: 'A calm, minimal documentation generator for lily-svelte.',
	github: 'https://github.com/levish0/lily-pad',
	nav: [
		{ label: { en: 'Home', ko: '홈' }, href: '/' },
		{ label: { en: 'Docs', ko: '문서' }, href: '/docs' }
	],
	rootSection: { en: 'Introduction', ko: '소개' }
};
```

## 옵션

| 옵션          | 타입                     | 역할                                              |
| ------------- | ------------------------ | ------------------------------------------------- |
| `title`       | `string`                 | 사이트 이름 — 모든 페이지의 브라우저 탭 접미사    |
| `description` | `string`                 | 기본 메타 설명                                    |
| `github`      | `string?`                | 저장소 URL. 생략하면 헤더의 GitHub 아이콘이 숨음  |
| `nav`         | `NavEntry[]`             | 상단 네비게이션 항목 (순서대로)                   |
| `rootSection` | `Record<locale, string>` | 각 로케일 콘텐츠 루트에 있는 페이지의 사이드바 제목 |

## 로컬라이즈된 텍스트

독자에게 보이는 텍스트는 전부 `Record<locale, string>`입니다 — 로케일마다 하나씩, 기본 로케일이 폴백:

```ts
{ label: { en: 'Home', ko: '홈' }, href: '/' }
```

로케일을 추가하려면 [다국어](/docs/guide/i18n)를 보세요.
