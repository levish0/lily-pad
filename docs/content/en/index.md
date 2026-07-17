---
title: Introduction
description: lily-pad is a calm, minimal documentation generator built on SvelteKit and lily-svelte.
order: 1
---

lily-pad turns a folder of markdown files into a calm, rounded documentation site — the same idea as VitePress, but built on **SvelteKit** and styled with **[lily-svelte](https://lily-svelte.pages.dev)**.

## Why lily-pad

- **Markdown-first** — write `.md` files, get pages. Frontmatter drives the title, description, and sidebar.
- **Svelte inside markdown** — every page compiles to a Svelte component, so you can import and render live components mid-document.
- **Calm by default** — the monochrome, rounded lily design language, with dark mode built in.

## Quick look

```md title="content/getting-started.md"
---
title: Getting Started
description: Install and run your docs site.
---

## Installation

Everything in this file becomes a styled page.
```

> This site is built with lily-pad itself — every page you're reading is a markdown file in `content/`.
