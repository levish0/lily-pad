---
title: lily-pad란?
description: lily-pad는 SvelteKit 위에 만든, lily-svelte를 위한 차분하고 미니멀한 문서 생성기입니다.
navLabel: lily-pad란?
order: 1
---

lily-pad는 마크다운 폴더를 차분하고 둥근 문서 사이트로 바꿔줍니다. [VitePress](https://vitepress.dev)와 같은 아이디어 — 마크다운을 넣으면 정적 사이트가 나오는 — 지만, **SvelteKit** 위에서 **[lily-svelte](https://lily-svelte.pages.dev)**로 스타일링되어 문서가 컴포넌트와 같은 디자인 언어를 공유합니다.

> 이 사이트 자체가 lily-pad로 만들어졌습니다 — 지금 읽고 있는 모든 페이지가 `content/` 안의 마크다운 파일입니다.

## 쓰임새

- **컴포넌트 라이브러리 문서** — lily-pad는 lily-svelte의 문서 보금자리이며, 컴포넌트 라이브러리 사이트가 일급 유즈케이스입니다.
- **프로젝트 문서** — 어떤 코드베이스든 가이드, 레퍼런스, 체인지로그를 담을 수 있습니다.
- **다국어 사이트** — 로케일 인식 라우팅, 네비게이션, 검색이 나중에 붙인 게 아니라 처음부터 내장되어 있습니다.

## 개발 경험

- **마크다운 우선** — `.md` 파일을 쓰면 페이지가 됩니다. frontmatter가 제목, 설명, 사이드바를 결정하고, 수동으로 등록할 것이 없습니다.
- **마크다운 속 Svelte** — 모든 페이지는 Svelte 컴포넌트로 컴파일되므로, 문서 중간에 라이브 컴포넌트를 임포트해 렌더링할 수 있습니다.
- **좋은 코드 블록** — 라이트/다크 듀얼 테마의 shiki 하이라이팅, 줄 강조, 제목, 원클릭 복사.
- **한국어 친화 타이포그래피** — `word-break: keep-all`, CJK 친화 강조 파싱, 혼합 문자에 맞춘 폰트 스택.

## lily-svelte와의 관계

[lily-svelte](https://lily-svelte.pages.dev)가 컴포넌트 라이브러리라면, lily-pad는 그것으로 만든 문서 생성기입니다. 여기 보이는 모든 UI — 사이드바, 표, 다이얼로그, 드롭다운 — 는 `lily-svelte` CLI로 설치한 lily 컴포넌트입니다.
