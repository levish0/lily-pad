---
title: Svelte in Markdown
description: Import and render live Svelte components in the middle of a page.
section: Writing
order: 24
---

Every page compiles to a Svelte component, so markdown files can do what Svelte files do: import components and use runes.

## Import and render

Add a `<script>` block anywhere in the file and use the component inline:

```md
---
title: My Page
description: …
---

<script>
	import { Button } from 'lily-pad';
	let count = $state(0);
</script>

## Live component

<Button onclick={() => count++}>Clicked {count} times</Button>
```

That renders a real, interactive button:

<script>
	import { Button } from 'lily-pad';
	let count = $state(0);
</script>

<Button onclick={() => count++}>Clicked {count} times</Button>

## What you can use

- **lily components** re-exported by the `lily-pad` package (`Button`, `Badge`, `Kbd`, `CodeBlock`…)
- **your own components** from `$lib/`
- **runes** — `$state`, `$derived`, and friends work as in any Svelte file

Markdown keeps working around components — headings, **emphasis**, and code blocks mix freely with them.

## Escaping

Writing about Svelte rather than running it? Put the code in a [code block](/docs/writing/code-blocks) — fenced code is never executed.
