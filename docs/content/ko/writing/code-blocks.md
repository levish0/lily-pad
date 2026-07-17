---
title: 코드 블록
description: lily의 CodeBlock 컴포넌트로 하이라이팅 — 듀얼 테마와 원클릭 복사.
navLabel: 코드 블록
section: 글쓰기
order: 22
---

펜스 코드 블록은 lily-svelte의 `CodeBlock` 컴포넌트로 렌더링됩니다. 색상은 사이트 테마를 따라갑니다: 라이트 모드에선 github-light, 다크 모드에선 github-dark.

## 언어

현재 로드된 문법: `js`, `ts`, `svelte`, `html`, `css`, `json`, `yaml`, `md`, `bash`. 그 외 언어의 펜스는 일반 텍스트로 렌더링됩니다.

````md
```ts
const calm = true;
```
````

```ts
const calm = true;
```

중괄호가 들어간 Svelte도 그대로:

```svelte
<script>
	let count = $state(0);
</script>

<button onclick={() => count++}>{count}</button>
```

## 복사 버튼

모든 블록의 오른쪽 위에 복사 버튼이 있습니다 — 호버하면 툴팁이 뜨고, 클릭하면 원본 소스가 복사됩니다.
