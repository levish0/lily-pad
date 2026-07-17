# lily-pad Roadmap

> A calm, minimal documentation generator — VitePress의 아이디어를 SvelteKit + [lily-svelte](https://lily-svelte.pages.dev) 위에서.

## 아키텍처

```
lily-pad/
├── docs/          # SvelteKit 앱 = lily-pad 자체 문서 사이트이자 프레임워크 프로토타입
│   ├── content/   # 마크다운 콘텐츠 (로케일별: en/, ko/)
│   ├── src/lib/components/mdsx/   # 마크다운 요소 → lily 스타일 Svelte 컴포넌트 매핑
│   └── ...
└── references/    # VitePress 소스 (참고용, git 미추적)
```

파이프라인: `content/**/*.md` → **velite**(frontmatter/TOC/컬렉션 수집) → **mdsx**(md → Svelte 컴파일, blueprint로 요소 매핑) → **shiki** rehype-pretty-code(듀얼 테마 하이라이팅) → SvelteKit `docs/[...slug]` 라우트에서 정적 프리렌더 (Cloudflare Pages).

원칙: **도그푸딩** — UI는 전부 lily-svelte CLI(`lily-svelte add ...`)로 설치한 lily 컴포넌트를 사용한다.

## 완료된 것 (2026-07-17)

- [x] `sv create` 기반 SvelteKit 앱 (TS, Tailwind v4, Cloudflare adapter, paraglide, vitest/playwright)
- [x] mdsvex → **mdsx + velite + shiki(v3)** 파이프라인 이식 (lily-svelte docs에서)
- [x] 마크다운 요소 컴포넌트 21개 이식, 표/구분선은 lily **Table/Separator 컴포넌트로 위임**
- [x] 코드 블록: shiki 듀얼 테마(github-light/dark), 라인 하이라이트(`{n}`), `title=` 캡션, 복사 버튼
- [x] **사이드바 자동 생성** (`src/lib/nav.ts`) — 폴더 구조 + frontmatter(`order`, `section`, `navLabel`)에서 생성 (lily-svelte는 수동 하드코딩이었음 → 개선점)
- [x] 이전/다음 글 네비 (levish.ac 블로그 디자인)
- [x] **다국어** — `content/<locale>/` 디렉토리 구조, URL 전략(`/ko/...`), 번역 없으면 base locale 폴백, 언어 드롭다운(Intl.DisplayNames), 마크다운 내부 링크 자동 로컬라이즈, `remark-cjk-friendly`(한글 옆 `**볼드**` 버그 해결)
- [x] **검색** — ⌘K 다이얼로그 + **pagefind 풀텍스트**(빌드 후 인덱싱, `html lang` 기반 로케일별 인덱스, 발췌 하이라이트, dev에선 제목 필터 폴백)
- [x] **커스텀 컨테이너** — `::: tip/info/note/warning/danger`, 커스텀 제목, lily callout 디자인
- [x] **`lily-pad.config.ts`** — title/description/github/nav(로케일별 라벨)/rootSection
- [x] **코드 블록 = lily CodeBlock 컴포넌트** (클라이언트 shiki; rehype는 raw 코드만 추출해 위임)
- [x] **문서 체계화** — VitePress식 4단 구조: 소개 / 가이드(라우팅·다국어·배포) / 글쓰기(마크다운·에셋·코드블록·컨테이너) / 레퍼런스(사이트 설정·Frontmatter), en/ko
- [x] CI 워크플로 (`docs/` 기준 check/lint + 태그→production 배포), dependabot, `.nvmrc`
- [x] 모바일 네비 (햄버거 → 풀스크린 패널)
- [x] 다크 모드 (mode-watcher), `.link` 언더라인-grow 애니메이션
- [x] UI 문자열 paraglide 메시지화 (검색/이전·다음 라벨)

### 알아둘 것

- `tsconfig` `checkJs: false` — paraglide 생성 코드가 wrangler 전역 타입과 충돌해서. 직접 쓰는 js 설정 파일은 `// @ts-check` 프래그마로 개별 체크.
- paraglide `getLocaleForUrl`은 서버(프리렌더)에서 던짐 → `src/lib/locale.ts`의 `localeOfUrl` 사용할 것.
- shiki는 v3 고정 (rehype-pretty-code 0.14와의 검증된 조합, lily-svelte와 동일).

## 다음 후보

- [ ] **마크다운 안에서 Svelte 컴포넌트 렌더** — lily-svelte의 `componentPreviews()` 같은 전처리기. VitePress 대비 킬러 기능.
- [ ] **`packages/lily-pad` 추출** — 파이프라인이 안정되면 재사용 가능한 패키지로 (vite 플러그인 + 테마 + `create-lily-pad` 스캐폴더). 그때 pnpm 워크스페이스 루트 구성.
- [ ] 홈 랜딩 다듬기, 푸터, SEO(og 태그, sitemap)
- [ ] 404 페이지
