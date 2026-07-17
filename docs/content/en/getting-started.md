---
title: Getting Started
description: Scaffold a lily-pad site, learn the project layout, and write your first page.
order: 2
---

## Prerequisites

- [Node.js](https://nodejs.org) 20 or newer
- [pnpm](https://pnpm.io)

## Scaffold a site

```bash
pnpm create lily-pad my-docs
cd my-docs
pnpm install
```

This creates a thin SvelteKit shell wired to the `lily-pad` package — the theme and markdown pipeline come from npm and update with `pnpm update`.

## Project layout

```
my-docs/
├── lily-pad.config.ts   # site title, nav, GitHub link, sidebar labels
├── content/             # your markdown, one folder per locale
│   ├── en/
│   └── ko/
├── src/                 # thin shell (routes delegate to the lily-pad theme)
└── static/              # images and other public files
```

You write in `content/` and configure in `lily-pad.config.ts`. The files in `src/` are a few small stubs — the actual theme lives in the `lily-pad` package.

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
