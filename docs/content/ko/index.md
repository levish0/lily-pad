---
title: 소개
description: lily-pad는 SvelteKit과 lily-svelte 위에 만든 차분하고 미니멀한 문서 생성기입니다.
section: 시작하기
order: 1
---

lily-pad는 마크다운 폴더를 차분하고 둥근 문서 사이트로 바꿔줍니다 — VitePress와 같은 아이디어지만, **SvelteKit** 위에서 **[lily-svelte](https://lily-svelte.pages.dev)**로 스타일링됩니다.

## 왜 lily-pad인가

- **마크다운 우선** — `.md` 파일을 쓰면 페이지가 됩니다. frontmatter가 제목, 설명, 사이드바를 결정합니다.
- **마크다운 속 Svelte** — 모든 페이지는 Svelte 컴포넌트로 컴파일되므로, 문서 중간에 라이브 컴포넌트를 임포트해 렌더링할 수 있습니다.
- **기본이 차분함** — 모노크롬의 둥근 lily 디자인 언어와 내장 다크 모드.

## 미리 보기

```md title="content/ko/getting-started.md"
---
title: 시작하기
description: 문서 사이트를 설치하고 실행합니다.
---

## 설치

이 파일의 모든 내용이 스타일된 페이지가 됩니다.
```

> 이 사이트 자체가 lily-pad로 만들어졌습니다 — 지금 읽고 있는 모든 페이지가 `content/` 안의 마크다운 파일입니다.
