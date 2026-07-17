---
title: Code Blocks
description: Shiki-powered highlighting with dual themes, line highlighting, titles, and copy.
order: 3
---

Fenced code blocks are highlighted at build time with [shiki](https://shiki.style) — no client-side highlighting cost. Colors follow the site theme: github-light in light mode, github-dark in dark mode.

## Languages

Grammars currently loaded: `ts`, `js`, `svelte`, `css`, `json`, `yaml`, `md`, `bash`.

````md
```ts
const calm = true;
```
````

## Titles

Add a `title` to render a filename caption above the block:

````md
```ts title="src/lib/hello.ts"
export function greet(name: string) {
	return `Hello, ${name}!`;
}
```
````

```ts title="src/lib/hello.ts"
export function greet(name: string) {
	return `Hello, ${name}!`;
}
```

## Line highlighting

Mark lines with `{n}` — single lines, ranges, or both:

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

## Copy button

Every block gets a copy button in its top-right corner — hover to see the tooltip, click to copy the raw source.
