---
title: 마크다운
description: lily-pad에서 마크다운으로 할 수 있는 모든 것 — 제목, 코드, 표 등.
section: 글쓰기
order: 1
---

## 텍스트

**굵게**, _기울임_, `인라인 코드`가 있는 일반 문단. 링크는 [내부](/docs/getting-started)일 수도, [외부](https://svelte.dev)일 수도 있습니다 — 외부 링크는 자동으로 새 탭에서 열립니다.

> 인용문은 이렇게 차분한 왼쪽 테두리로 렌더링됩니다.

## 목록

- 순서 없는 목록
- 여러 항목과
  - 중첩까지

1. 순서 있는 목록도
2. 잘 됩니다

## 코드

펜스 코드 블록은 shiki로 하이라이팅되며, 라이트/다크 듀얼 테마를 사용합니다:

```ts
export function greet(name: string) {
	return `안녕하세요, ${name}님!`;
}
```

Svelte도 됩니다 — 지원 언어 전체는 [코드 블록](/docs/writing/code-blocks)을 보세요:

```svelte
<script>
	let count = $state(0);
</script>

<button onclick={() => count++}>{count}</button>
```

## 표

| 기능        | 상태 | 비고                    |
| ----------- | ---- | ----------------------- |
| 제목        | ✅   | slug 기반 앵커 링크     |
| 코드 블록   | ✅   | shiki 듀얼 테마         |
| 표          | ✅   | GitHub 스타일 마크다운  |

## 구분선

---

여기까지가 기본입니다. 마크다운 속 Svelte 컴포넌트가 다음 차례입니다.
