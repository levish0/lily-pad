---
title: Getting Started
description: Set up a lily-pad documentation site and write your first page.
order: 2
---

## Create a page

Add a markdown file under `content/`. The file path becomes the URL — `content/guide/theming.md` is served at `/docs/guide/theming`.

Every page needs a `title` and `description` in its frontmatter:

```md
---
title: My Page
description: What this page covers.
---
```

## Run the dev server

```bash
pnpm dev
```

This builds the content index with velite, then starts the Vite dev server.

## Build for production

```bash
pnpm build
```

Pages are prerendered to static HTML, ready for Cloudflare Pages or any static host.
