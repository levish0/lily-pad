# @levish0/create-lily-pad

Scaffold a [lily-pad](https://github.com/levish0/lily-pad) documentation site — calm, minimal docs from markdown, built on SvelteKit and styled with lily-svelte.

## Usage

```bash
pnpm create @levish0/lily-pad my-docs
cd my-docs
pnpm install
pnpm dev
```

This creates a thin SvelteKit shell wired to the `@levish0/lily-pad` theme:

```
my-docs/
├── lily-pad.config.ts   # site title, nav, GitHub link, sidebar labels
├── content/             # your markdown, one folder per locale
├── src/                 # thin shell (routes delegate to the theme)
└── static/              # images and other public files
```

Write markdown in `content/`, configure in `lily-pad.config.ts` — the theme updates with `pnpm update`.

## License

MIT
