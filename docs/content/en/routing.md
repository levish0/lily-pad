---
title: Routing
description: How markdown files map to URLs — no route registration, just files.
order: 4
---

lily-pad routes are derived entirely from the file tree under `content/<locale>/`. There is nothing to register.

## File → URL

| File                                | URL                     |
| ----------------------------------- | ----------------------- |
| `content/en/index.md`               | `/docs`                 |
| `content/en/getting-started.md`     | `/docs/getting-started` |
| `content/en/writing/markdown.md`    | `/docs/writing/markdown`|
| `content/en/writing/index.md`       | `/docs/writing`         |
| `content/ko/getting-started.md`     | `/ko/docs/getting-started` |

The base locale is unprefixed; every other locale gets its code as a URL prefix.

## Index pages

An `index.md` maps to its folder's own URL — `writing/index.md` is served at `/docs/writing`. The locale root's `index.md` becomes the docs landing page at `/docs`.

## Sidebar grouping

The first path segment groups pages in the sidebar:

- Files at the locale root form the first group.
- Each subfolder becomes a group. Its title comes from the pages' `section` frontmatter, falling back to the folder name.

Deeper nesting (`guide/advanced/x.md`) still routes fine — it just stays inside its top-level group in the sidebar.

## Prerendering

Every page is prerendered to static HTML at build time, in every locale. Pages that only exist in the base locale are served as fallbacks for other locales instead of 404ing.
