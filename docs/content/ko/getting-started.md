---
title: 시작하기
description: lily-pad 사이트를 설정하고, 프로젝트 구조를 익히고, 첫 페이지를 작성합니다.
navLabel: 시작하기
order: 2
---

::: info
lily-pad는 아직 어립니다 — 지금은 npm 패키지가 아니라 이 저장소 자체로 배포됩니다. 레포에서 시작해 여러분의 것으로 만드세요.
:::

## 준비물

- [Node.js](https://nodejs.org) 20 이상
- [pnpm](https://pnpm.io)

## 코드 받기

```bash
git clone https://github.com/levish0/lily-pad.git
cd lily-pad/docs
pnpm install
```

## 프로젝트 구조

일상적으로 만지는 것은 전부 `docs/` 안에 있습니다:

```
docs/
├── lily-pad.config.ts   # 사이트 제목, 네비, GitHub 링크, 사이드바 라벨
├── content/             # 마크다운, 로케일별 폴더
│   ├── en/
│   └── ko/
├── src/                 # 테마 (SvelteKit 앱)
└── static/              # 이미지 등 공개 파일
```

글은 `content/`에 쓰고 설정은 `lily-pad.config.ts`에서 합니다 — `src/`의 테마는 사이트의 생김새를 바꾸고 싶을 때만 건드리면 됩니다.

## 첫 페이지 작성

로케일 루트 아래에 마크다운 파일을 만드세요. frontmatter의 `title`과 `description`은 필수입니다:

```md
---
title: 안녕
description: 나의 첫 lily-pad 페이지.
---

## 살아있다

이 파일의 모든 내용이 /ko/docs/hello 에서 스타일된 페이지가 됩니다.
```

사이드바는 페이지를 자동으로 집어 올립니다 — 경로가 URL로 매핑되는 방식은 [라우팅](/docs/guide/routing), 모든 필드는 [Frontmatter](/docs/reference/frontmatter)를 보세요.

## 미리 보기

```bash
pnpm dev
```

velite로 콘텐츠 인덱스를 빌드한 뒤 `localhost:5173`에 개발 서버를 띄웁니다.

## 프로덕션 빌드

```bash
pnpm build
```

모든 로케일의 페이지가 정적 HTML로 프리렌더되고, 풀텍스트 검색 인덱스가 생성됩니다. 호스팅은 [배포](/docs/guide/deploy)를 보세요.

## 다음은

- 마크다운 익히기 — [마크다운](/docs/writing/markdown), [코드 블록](/docs/writing/code-blocks), [컨테이너](/docs/writing/containers)
- 페이지 번역하기 — [다국어](/docs/guide/i18n)
- 사이트를 내 것으로 — [사이트 설정](/docs/reference/site-config)
