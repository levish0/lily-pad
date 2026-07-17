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
- [x] **검색** — ⌘K 다이얼로그, 현재 로케일 nav 제목 필터 (lily-svelte 방식)
- [x] 모바일 네비 (햄버거 → 풀스크린 패널)
- [x] 다크 모드 (mode-watcher), `.link` 언더라인-grow 애니메이션
- [x] UI 문자열 paraglide 메시지화 (검색/이전·다음 라벨)

### 알아둘 것

- `tsconfig` `checkJs: false` — paraglide 생성 코드가 wrangler 전역 타입과 충돌해서. 직접 쓰는 js 설정 파일은 `// @ts-check` 프래그마로 개별 체크.
- paraglide `getLocaleForUrl`은 서버(프리렌더)에서 던짐 → `src/lib/locale.ts`의 `localeOfUrl` 사용할 것.
- shiki는 v3 고정 (rehype-pretty-code 0.14와의 검증된 조합, lily-svelte와 동일).

## 다음 후보

- [ ] **마크다운 안에서 Svelte 컴포넌트 렌더** — lily-svelte의 `componentPreviews()` 같은 전처리기. VitePress 대비 킬러 기능. 데모 컴포넌트 + 코드 탭(`<ComponentPreview>`)까지.
- [ ] **풀텍스트 검색** — 지금은 제목 필터뿐. pagefind(정적 사이트와 궁합 좋음)나 flexsearch로 본문 검색.
- [ ] **커스텀 컨테이너** — `::: tip / warning / danger` (VitePress 필수 문법). remark 플러그인 + lily Alert 컴포넌트.
- [ ] **`lily-pad.config.ts`** — 사이트 제목/네비/로케일/테마를 한 파일로 선언 (지금은 컴포넌트 곳곳에 하드코딩: site-header의 nav, GitHub URL, nav.ts의 ROOT_SECTION 등).
- [ ] **`packages/lily-pad` 추출** — 파이프라인이 안정되면 재사용 가능한 패키지로 (vite 플러그인 + 테마 + `create-lily-pad` 스캐폴더). 그때 pnpm 워크스페이스 루트 구성.
- [ ] 홈 랜딩 다듬기, 푸터, SEO(og 태그, sitemap)
- [ ] 404 페이지, 프리렌더 누락 링크 검사
