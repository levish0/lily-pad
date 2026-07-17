---
title: Deploying
description: Build the site and put it on Cloudflare Pages, or any host with an adapter swap.
section: Guide
order: 12
---

## Build

```bash
pnpm build
```

This runs velite (content index), regenerates wrangler types, builds the site with Vite, and indexes it for full-text search with pagefind. Every docs page is prerendered to static HTML in every locale.

## Preview locally

```bash
pnpm preview
```

Serves the production build through `wrangler pages dev`, the same runtime Cloudflare Pages uses — including the search index, which only exists in production builds.

## Cloudflare Pages

The site ships with `@sveltejs/adapter-cloudflare`, so deploying is one command:

```bash
pnpm exec wrangler pages deploy .svelte-kit/cloudflare
```

Or connect the GitHub repository in the Cloudflare dashboard and set the build command to `pnpm build` — every push deploys automatically.

::: warning
When `wrangler.jsonc` is committed, it overrides the compatibility flags set in the Cloudflare dashboard. Keep `nodejs_compat` in the file's `compatibility_flags`.
:::

## Other hosts

SvelteKit's adapter system means lily-pad is not tied to Cloudflare. Swap the adapter in `vite.config.ts` — for a purely static host (GitHub Pages, Netlify, S3), use `@sveltejs/adapter-static`; the docs pages are already fully prerendered.
