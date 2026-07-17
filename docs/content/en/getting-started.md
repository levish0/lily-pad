---
title: Getting Started
description: Set up a lily-pad site, learn the project layout, and write your first page.
order: 2
---

::: info
lily-pad is young — today it ships as this repository, not yet as an npm package. You start from the repo and make it yours.
:::

## Prerequisites

- [Node.js](https://nodejs.org) 20 or newer
- [pnpm](https://pnpm.io)

## Get the code

```bash
git clone https://github.com/levish0/lily-pad.git
cd lily-pad/docs
pnpm install
```

## Project layout

Everything you touch day-to-day lives in `docs/`:

```
docs/
├── lily-pad.config.ts   # site title, nav, GitHub link, sidebar labels
├── content/             # your markdown, one folder per locale
│   ├── en/
│   └── ko/
├── src/                 # the theme (SvelteKit app)
└── static/              # images and other public files
```

You write in `content/` and configure in `lily-pad.config.ts` — the theme in `src/` only needs touching when you want to change how the site looks.

## Write your first page

Create a markdown file under a locale root. `title` and `description` are required frontmatter:

```md
---
title: Hello
description: My first lily-pad page.
---

## It's alive

Everything in this file becomes a styled page at /docs/hello.
```

The sidebar picks the page up automatically — see [Routing](/docs/guide/routing) for how paths map to URLs and [Frontmatter](/docs/reference/frontmatter) for every field.

## Preview it

```bash
pnpm dev
```

This builds the content index with velite and starts the dev server at `localhost:5173`.

## Build for production

```bash
pnpm build
```

Pages prerender to static HTML in every locale, and the full-text search index is generated. See [Deploying](/docs/guide/deploy) for hosting.

## What's next

- Learn the markdown surface — [Markdown](/docs/writing/markdown), [Code Blocks](/docs/writing/code-blocks), [Containers](/docs/writing/containers)
- Translate your pages — [Internationalization](/docs/guide/i18n)
- Make the site yours — [Site Config](/docs/reference/site-config)
