---
title: 마크다운 속 Svelte
description: 페이지 한가운데에 라이브 Svelte 컴포넌트를 임포트해 렌더링합니다.
navLabel: 마크다운 속 Svelte
section: 글쓰기
order: 24
---

모든 페이지는 Svelte 컴포넌트로 컴파일되므로, 마크다운 파일은 Svelte 파일이 하는 일을 할 수 있습니다: 컴포넌트 임포트와 룬 사용.

## 임포트하고 렌더링하기

파일 어디에든 `<script>` 블록을 넣고 컴포넌트를 인라인으로 쓰세요:

```md
---
title: 내 페이지
description: …
---

<script>
	import { Button } from '$lib/components/ui/button/index.js';
	let count = $state(0);
</script>

## 라이브 컴포넌트

<Button onclick={() => count++}>{count}번 클릭됨</Button>
```

진짜로 동작하는 버튼이 렌더링됩니다:

<script>
	import { Button } from '$lib/components/ui/button/index.js';
	let count = $state(0);
</script>

<Button onclick={() => count++}>{count}번 클릭됨</Button>

## 쓸 수 있는 것

- 프로젝트에 설치된 **lily 컴포넌트** (`$lib/components/ui/...`)
- `$lib/`의 **직접 만든 컴포넌트**
- **룬** — `$state`, `$derived` 등이 여느 Svelte 파일처럼 동작합니다

컴포넌트 주변의 마크다운도 계속 동작합니다 — 제목, **강조**, 코드 블록이 자유롭게 섞입니다.

## 이스케이프

Svelte를 실행하는 게 아니라 Svelte에 *대해* 쓰고 있나요? [코드 블록](/docs/writing/code-blocks)에 넣으세요 — 펜스 코드는 절대 실행되지 않습니다.
