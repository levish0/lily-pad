# lily-pad

A calm, minimal documentation generator for [lily-svelte](https://github.com/levish0/lily-svelte).

Markdown in, calm docs site out — built on SvelteKit, styled with lily components. Multilingual, full-text searchable, prerendered to static HTML.

## Quick start

```bash
pnpm create lily-pad my-docs
cd my-docs
pnpm install
pnpm dev
```

## Packages

| Package                                        | Description                              |
| ---------------------------------------------- | ---------------------------------------- |
| [`lily-pad`](./packages/lily-pad)              | The theme and markdown pipeline          |
| [`create-lily-pad`](./packages/create-lily-pad)| Scaffolds a new documentation site       |

## Development

```bash
pnpm install
pnpm build:packages
pnpm dev
```

## Documentation

The site in [`docs/`](./docs) is built with lily-pad itself — read it to learn how to use it.

## License

[MIT](./LICENSE)
