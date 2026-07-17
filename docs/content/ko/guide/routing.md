---
title: 라우팅
description: 마크다운 파일이 URL로 매핑되는 방식 — 라우트 등록 없이 파일만으로.
navLabel: 라우팅
section: 가이드
order: 10
---

lily-pad의 라우트는 전부 `content/<로케일>/` 아래의 파일 트리에서 파생됩니다. 등록할 것이 없습니다.

## 파일 → URL

| 파일                            | URL                      |
| ------------------------------- | ------------------------ |
| `content/en/index.md`           | `/docs`                  |
| `content/en/getting-started.md` | `/docs/getting-started`  |
| `content/en/guide/routing.md`   | `/docs/guide/routing`    |
| `content/en/guide/index.md`     | `/docs/guide`            |
| `content/ko/guide/routing.md`   | `/ko/docs/guide/routing` |

기본 로케일은 접두사가 없고, 나머지 로케일은 로케일 코드가 URL 접두사가 됩니다.

## 인덱스 페이지

`index.md`는 자기 폴더의 URL에 매핑됩니다 — `guide/index.md`는 `/docs/guide`에서 서빙됩니다. 로케일 루트의 `index.md`는 `/docs`의 문서 랜딩 페이지가 됩니다.

## 사이드바 그룹핑

경로의 첫 세그먼트가 사이드바 그룹을 결정합니다:

- 로케일 루트의 파일들이 첫 그룹이 되고, 제목은 [사이트 설정](/docs/reference/site-config)의 `rootSection`에서 옵니다.
- 각 하위 폴더가 그룹이 되고, 제목은 페이지들의 `section` frontmatter(없으면 폴더명)에서 옵니다.
- 그룹 안팎의 순서는 `order` frontmatter 필드로 정렬됩니다.

더 깊은 중첩(`guide/advanced/x.md`)도 라우팅은 잘 됩니다 — 사이드바에서는 최상위 그룹 안에 머물 뿐입니다.

## 프리렌더링

모든 페이지는 빌드 시점에 모든 로케일로 정적 HTML로 프리렌더됩니다. 기본 로케일에만 있는 페이지는 다른 로케일에서 404 대신 폴백으로 서빙됩니다 — [다국어](/docs/guide/i18n)를 보세요. 깨진 내부 링크는 빌드를 실패시키므로 프로덕션까지 가지 않습니다.
