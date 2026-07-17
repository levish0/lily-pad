---
title: Code Blocks
description: Highlighted by lily's CodeBlock component — dual themes and one-click copy.
order: 3
---

Fenced code blocks render through lily-svelte's `CodeBlock` component. Colors follow the site theme: github-light in light mode, github-dark in dark mode.

## Languages

Grammars currently loaded: `js`, `ts`, `svelte`, `html`, `css`, `json`, `yaml`, `md`, `bash`. A fence with any other language renders as plain text.

````md
```ts
const calm = true;
```
````

```ts
const calm = true;
```

Svelte, braces and all:

```svelte
<script>
	let count = $state(0);
</script>

<button onclick={() => count++}>{count}</button>
```

## Copy button

Every block gets a copy button in its top-right corner — hover to see the tooltip, click to copy the raw source.
