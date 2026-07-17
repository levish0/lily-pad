---
title: Markdown
description: The markdown surface — text, lists, links, images, and tables.
section: Writing
order: 20
---

Every page is plain [GitHub-flavored markdown](https://github.github.com/gfm/). This page covers the basics; code blocks, containers, and assets each have their own page.

## Text

Regular paragraphs with **bold**, _italic_, and `inline code`. Links can be [internal](/docs/getting-started) or [external](https://svelte.dev) — external links open in a new tab automatically, and internal links stay in the reader's locale.

Korean text is first-class: emphasis touching Hangul (`**볼드**로`) parses correctly, and the typography uses `word-break: keep-all`.

> Blockquotes render with a calm left border, like this.

## Headings

`##` through `######` become anchored headings — every heading gets a slug so it can be linked directly, and `##`/`###` headings feed the "On this page" outline.

## Lists

- Unordered lists
- With multiple items
  - And nesting

1. Ordered lists
2. Work too

## Images

Reference files from `static/` by absolute path — see [Assets](/docs/writing/assets) for details:

![A calm city](/city84.1600.webp)

## Tables

Tables render through lily's Table component:

| Feature     | Status | Notes                    |
| ----------- | ------ | ------------------------ |
| Headings    | ✅     | Anchor links via slug    |
| Code blocks | ✅     | shiki dual theme         |
| Tables      | ✅     | GitHub-flavored markdown |

## Horizontal rule

`---` becomes a lily Separator:

---

That's the baseline — next: [Code Blocks](/docs/writing/code-blocks), [Containers](/docs/writing/containers), and [Assets](/docs/writing/assets).
