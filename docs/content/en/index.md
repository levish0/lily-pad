---
title: What is lily-pad?
description: lily-pad is a calm, minimal documentation generator for lily-svelte, built on SvelteKit.
navLabel: What is lily-pad?
order: 1
---

lily-pad turns a folder of markdown files into a calm, rounded documentation site. It is the same idea as [VitePress](https://vitepress.dev) — markdown in, static site out — but built on **SvelteKit** and styled with **[lily-svelte](https://lily-svelte.pages.dev)**, so your docs share the design language of your components.

> This site is built with lily-pad itself — every page you're reading is a markdown file in `content/`.

## Use cases

- **Component library docs** — lily-pad is the documentation home for lily-svelte, so component-library sites are its first-class use case.
- **Project documentation** — guides, references, and changelogs for any codebase.
- **Multilingual sites** — locale-aware routing, navigation, and search are built in, not bolted on.

## Developer experience

- **Markdown-first** — write `.md` files, get pages. Frontmatter drives the title, description, and sidebar; nothing is registered by hand.
- **Svelte inside markdown** — every page compiles to a Svelte component, so you can import and render live components mid-document.
- **Great code blocks** — shiki highlighting with dual light/dark themes, line highlighting, titles, and one-click copy.
- **Korean-ready typography** — `word-break: keep-all`, CJK-friendly emphasis parsing, and a font stack tuned for mixed-script text.

## What about lily-svelte?

[lily-svelte](https://lily-svelte.pages.dev) is the component library; lily-pad is the documentation generator built with it. Every piece of UI you see here — the sidebar, tables, dialogs, dropdowns — is a lily component installed through the `lily-svelte` CLI.
