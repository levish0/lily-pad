# @levish0/lily-pad

A calm, minimal documentation generator for [lily-svelte](https://github.com/levish0/lily-svelte) — the theme and markdown pipeline.

Markdown in, calm docs site out — built on SvelteKit, styled with lily components. Multilingual, full-text searchable, prerendered to static HTML.

## Quick start

Scaffold a site instead of wiring this package by hand:

```bash
pnpm create @levish0/lily-pad my-docs
cd my-docs
pnpm install
pnpm dev
```

Then write markdown in `content/<locale>/` and configure the site in `lily-pad.config.ts`.

## What's inside

- `@levish0/lily-pad` — theme components (`AppShell`, `DocsLayout`, `DocPage`), UI re-exports (`Button`, `Badge`, `Kbd`, `CodeBlock`…), and the config/nav APIs
- `@levish0/lily-pad/vite` — `lilyPadPreprocess()`, the markdown pipeline (mdsx, shiki code blocks, `::: tip` containers, CJK-friendly emphasis)
- `@levish0/lily-pad/velite` — `docsConfig()`, the content collection schema
- `@levish0/lily-pad/styles.css` — theme CSS

## Documentation

https://github.com/levish0/lily-pad — the docs site in `docs/` is built with lily-pad itself.

## License

MIT
