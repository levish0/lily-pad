# @levish0/lily-pad

## 0.4.1

### Patch Changes

- [#31](https://github.com/levish0/lily-pad/pull/31) [`d0f301f`](https://github.com/levish0/lily-pad/commit/d0f301fcd7c31849762360e44bfc4ae5bf204279) Thanks [@levish0](https://github.com/levish0)! - Sync the table of contents with lily-svelte so active-item emphasis scales the label instead of animating the link's font size and padding, reducing layout shifts while scrolling.

## 0.4.0

### Minor Changes

- [`5a80e6b`](https://github.com/levish0/lily-pad/commit/5a80e6bdb939f3f875933618cb6cd8734dac9c35) Thanks [@levish0](https://github.com/levish0)! - Move onto lily-svelte 0.5.0.

  **Breaking for `@levish0/lily-pad`:** `Button` and `Badge` variants are renamed. `Button` is now `solid` / `soft` / `ghost` / `destructive` — the old `default` is `solid`, and the old `ghost`, which carried a resting tint, is `soft`; `ghost` is a new, quieter level that stays transparent until hovered. `Badge` follows the same ladder as `solid` / `soft` / `quiet`. Rename call sites: `default` → `solid`, `ghost` → `soft`.

  - **Components updated to 0.5.0** — `button` also gains `loading`, a `buttonVariants()` helper and an `icon-sm` / `icon` / `icon-lg` scale; `badge` gains `badgeVariants()` and only takes a hover treatment when it is a link. `spinner` and the `use-clipboard` hook come along as new dependencies of `code-block`, which now shares one clipboard implementation instead of rolling its own.
  - **The design system is a managed region** — `src/routes/layout.css` now delimits lily's block with begin/end markers and a digest, which is what let `lily update` bring the tokens forward. `--bg` moves from `#f8f8f8` to `#f0f0f0` in light mode: lily separates surfaces with colour instead of borders, and the old step was 2.4 L\* against dark mode's 5.2, so cards and dialogs read noticeably flatter in light mode.
  - **The project config is `lily.json`** — renamed upstream from `components.json`, which collided with shadcn-svelte's. `packages/lily-pad` gained its own config, since that is where the components actually live; the one in `docs` had been pointing at a directory that does not exist since the repo was split into packages.
  - **`create-lily-pad`'s template ships the new stylesheet**, so a freshly scaffolded site starts on the same tokens rather than inheriting the old ones.
  - Restored `yaml` and `markdown` to the `code-block` highlighter and added the missing `@internationalized/date` peer.

## 0.3.3

### Patch Changes

- [`4191be9`](https://github.com/levish0/lily-pad/commit/4191be9a085f76b05e8bae1d0bd14eacab20d61f) Thanks [@levish0](https://github.com/levish0)! - Update the author URL to the new Workers deployment. The old `levish-ac.pages.dev` origin has been removed, so the link on npm no longer resolves.

## 0.3.2

### Patch Changes

- [`9767065`](https://github.com/levish0/lily-pad/commit/976706549a9df8365e75d534ae658255ce020d8a) Thanks [@levish0](https://github.com/levish0)! - Fix mobile overflow on the home feature grid: grid items get `min-w-0` so an unbreakable line (e.g. the code card) no longer widens the column past the viewport — long code scrolls inside its card instead.

## 0.3.1

### Patch Changes

- [`f755b04`](https://github.com/levish0/lily-pad/commit/f755b044c1e20dc1c97744350c26e7eb3498ffd6) Thanks [@levish0](https://github.com/levish0)! - Fix a hydration mismatch on the theme toggle: both sun/moon icons now render and CSS (`dark:` variant) picks the visible one, so server and client markup always match regardless of the visitor's persisted mode.

## 0.3.0

### Minor Changes

- [`df5e6f3`](https://github.com/levish0/lily-pad/commit/df5e6f3deaedd1bff72678b5296e1f7ee12abac1) Thanks [@levish0](https://github.com/levish0)! - Config-driven home page: `home.headline`/`features` render a headline plus a bento grid of lily cards (icons, links, code snippet cards). New `HomePage`/`HomeHero`/`FeatureGrid` exports and a `getStarted` theme string; the scaffold template ships a starter grid. Adds a config-driven `SiteFooter` (HTML message + note) placed from the shell layout.

## 0.2.0

### Minor Changes

- [`814b3ac`](https://github.com/levish0/lily-pad/commit/814b3ac6e4e27e9068839b5a8834390986f327f3) Thanks [@levish0](https://github.com/levish0)! - import(url) fix

## 0.1.0

### Minor Changes

- [`c9d35c0`](https://github.com/levish0/lily-pad/commit/c9d35c0bd7bfa2c1383be681e1ad885d16e0c956) Thanks [@levish0](https://github.com/levish0)! - Initial release - the lily-pad theme and markdown pipeline as an npm package, plus the `create-lily-pad` scaffolder.

- [`fe88787`](https://github.com/levish0/lily-pad/commit/fe8878785445320d29572804fa3e2531898f2ae0) Thanks [@levish0](https://github.com/levish0)! - version fix
