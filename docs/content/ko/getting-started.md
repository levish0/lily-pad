---
title: 시작하기
description: lily-pad 문서 사이트를 설정하고 첫 페이지를 작성합니다.
section: 시작하기
order: 2
---

## 페이지 만들기

`content/<로케일>/` 아래에 마크다운 파일을 추가하세요. 파일 경로가 URL이 됩니다 — `content/ko/guide/theming.md`는 `/ko/docs/guide/theming`에서 서빙됩니다.

모든 페이지의 frontmatter에는 `title`과 `description`이 필요합니다:

```md
---
title: 내 페이지
description: 이 페이지가 다루는 내용.
---
```

## 개발 서버 실행

```bash
pnpm dev
```

velite로 콘텐츠 인덱스를 빌드한 뒤 Vite 개발 서버를 시작합니다.

## 프로덕션 빌드

```bash
pnpm build
```

페이지가 정적 HTML로 프리렌더되어 Cloudflare Pages 등 어떤 정적 호스트에도 배포할 수 있습니다.
