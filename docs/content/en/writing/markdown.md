---
title: Markdown
description: Everything markdown can do in lily-pad — headings, code, tables, and more.
order: 1
---

## Text

Regular paragraphs with **bold**, _italic_, and `inline code`. Links can be [internal](/docs/getting-started) or [external](https://svelte.dev) — external links open in a new tab automatically.

> Blockquotes render with a calm left border, like this.

## Lists

- Unordered lists
- With multiple items
  - And nesting

1. Ordered lists
2. Work too

## Code

Fenced code blocks are highlighted with shiki, using dual light/dark themes:

```ts title="src/lib/hello.ts"
export function greet(name: string) {
	return `Hello, ${name}!`;
}
```

Highlight specific lines with `{n}` meta:

```svelte {2}
<script>
	let count = $state(0);
</script>

<button onclick={() => count++}>{count}</button>
```

## Tables

| Feature     | Status | Notes                    |
| ----------- | ------ | ------------------------ |
| Headings    | ✅     | Anchor links via slug    |
| Code blocks | ✅     | shiki dual theme         |
| Tables      | ✅     | GitHub-flavored markdown |

## Horizontal rule

---

That's the baseline. Svelte components inside markdown come next.
