---
title: 코드 블록
description: shiki 기반 하이라이팅 — 듀얼 테마, 줄 강조, 제목, 복사.
navLabel: 코드 블록
section: 글쓰기
order: 3
---

펜스 코드 블록은 빌드 시점에 [shiki](https://shiki.style)로 하이라이팅됩니다 — 클라이언트 비용이 없습니다. 색상은 사이트 테마를 따라갑니다: 라이트 모드에선 github-light, 다크 모드에선 github-dark.

## 언어

현재 로드된 문법: `ts`, `js`, `svelte`, `css`, `json`, `yaml`, `md`, `bash`.

````md
```ts
const calm = true;
```
````

## 제목

`title`을 붙이면 블록 위에 파일명 캡션이 렌더링됩니다:

````md
```ts title="src/lib/hello.ts"
export function greet(name: string) {
	return `안녕하세요, ${name}님!`;
}
```
````

```ts title="src/lib/hello.ts"
export function greet(name: string) {
	return `안녕하세요, ${name}님!`;
}
```

## 줄 강조

`{n}`으로 줄을 표시합니다 — 한 줄, 범위, 혼합 모두 가능:

````md
```svelte {2,4-5}
```
````

```svelte {2,4-5}
<script>
	let count = $state(0);

	function reset() {
		count = 0;
	}
</script>
```

## 복사 버튼

모든 블록의 오른쪽 위에 복사 버튼이 있습니다 — 호버하면 툴팁이 뜨고, 클릭하면 원본 소스가 복사됩니다.
