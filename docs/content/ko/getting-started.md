---
title: 시작하기
description: lily-pad 사이트를 스캐폴딩하고, 프로젝트 구조를 익히고, 첫 페이지를 작성합니다.
navLabel: 시작하기
order: 2
---

## 준비물

- [Node.js](https://nodejs.org) 20 이상
- [pnpm](https://pnpm.io)

## 사이트 스캐폴딩

```bash
pnpm create @levish0/lily-pad my-docs
cd my-docs
pnpm install
```

`lily-pad` 패키지에 연결된 얇은 SvelteKit 셸이 만들어집니다 — 테마와 마크다운 파이프라인은 npm에서 오고, `pnpm update`로 업데이트됩니다.

## 프로젝트 구조

```
my-docs/
├── lily-pad.config.ts   # 사이트 제목, 네비, GitHub 링크, 사이드바 라벨
├── content/             # 마크다운, 로케일별 폴더
│   ├── en/
│   └── ko/
├── src/                 # 얇은 셸 (라우트가 lily-pad 테마에 위임)
└── static/              # 이미지 등 공개 파일
```

글은 `content/`에 쓰고 설정은 `lily-pad.config.ts`에서 합니다. `src/`의 파일들은 작은 스텁 몇 개뿐이고, 실제 테마는 `lily-pad` 패키지에 있습니다.

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
