---
"@levish0/lily-pad": minor
"@levish0/create-lily-pad": patch
---

Move onto lily-svelte 0.5.0.

**Breaking for `@levish0/lily-pad`:** `Button` and `Badge` variants are renamed. `Button` is now `solid` / `soft` / `ghost` / `destructive` — the old `default` is `solid`, and the old `ghost`, which carried a resting tint, is `soft`; `ghost` is a new, quieter level that stays transparent until hovered. `Badge` follows the same ladder as `solid` / `soft` / `quiet`. Rename call sites: `default` → `solid`, `ghost` → `soft`.

- **Components updated to 0.5.0** — `button` also gains `loading`, a `buttonVariants()` helper and an `icon-sm` / `icon` / `icon-lg` scale; `badge` gains `badgeVariants()` and only takes a hover treatment when it is a link. `spinner` and the `use-clipboard` hook come along as new dependencies of `code-block`, which now shares one clipboard implementation instead of rolling its own.
- **The design system is a managed region** — `src/routes/layout.css` now delimits lily's block with begin/end markers and a digest, which is what let `lily update` bring the tokens forward. `--bg` moves from `#f8f8f8` to `#f0f0f0` in light mode: lily separates surfaces with colour instead of borders, and the old step was 2.4 L\* against dark mode's 5.2, so cards and dialogs read noticeably flatter in light mode.
- **The project config is `lily.json`** — renamed upstream from `components.json`, which collided with shadcn-svelte's. `packages/lily-pad` gained its own config, since that is where the components actually live; the one in `docs` had been pointing at a directory that does not exist since the repo was split into packages.
- **`create-lily-pad`'s template ships the new stylesheet**, so a freshly scaffolded site starts on the same tokens rather than inheriting the old ones.
- Restored `yaml` and `markdown` to the `code-block` highlighter and added the missing `@internationalized/date` peer.
