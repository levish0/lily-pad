---
title: 배포
description: 사이트를 빌드해 Cloudflare Pages에 올리거나, 어댑터를 바꿔 어디에든 배포합니다.
navLabel: 배포
section: 가이드
order: 12
---

## 빌드

```bash
pnpm build
```

velite(콘텐츠 인덱스) → wrangler 타입 재생성 → Vite 빌드 → pagefind 풀텍스트 인덱싱 순으로 실행됩니다. 모든 문서 페이지가 모든 로케일로 정적 HTML로 프리렌더됩니다.

## 로컬 미리보기

```bash
pnpm preview
```

Cloudflare Pages와 같은 런타임인 `wrangler pages dev`로 프로덕션 빌드를 서빙합니다 — 프로덕션 빌드에만 존재하는 검색 인덱스까지 포함해서요.

## Cloudflare Pages

`@sveltejs/adapter-cloudflare`가 기본이라 배포는 한 줄입니다:

```bash
pnpm exec wrangler pages deploy .svelte-kit/cloudflare
```

또는 Cloudflare 대시보드에서 GitHub 저장소를 연결하고 빌드 커맨드를 `pnpm build`로 설정하면 푸시마다 자동 배포됩니다.

::: warning
`wrangler.jsonc`가 커밋되어 있으면 대시보드에서 설정한 호환성 플래그를 덮어씁니다. 파일의 `compatibility_flags`에 `nodejs_compat`을 유지하세요.
:::

## 다른 호스트

SvelteKit의 어댑터 시스템 덕분에 lily-pad는 Cloudflare에 묶여 있지 않습니다. `vite.config.ts`에서 어댑터만 바꾸면 됩니다 — 순수 정적 호스트(GitHub Pages, Netlify, S3)라면 `@sveltejs/adapter-static`을 쓰세요. 문서 페이지는 이미 전부 프리렌더되어 있습니다.
