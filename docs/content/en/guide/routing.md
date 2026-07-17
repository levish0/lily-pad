---
title: Routing
description: How markdown files map to URLs — no route registration, just files.
section: Guide
order: 10
---

lily-pad routes are derived entirely from the file tree under `content/<locale>/`. There is nothing to register.

## File → URL

| File                            | URL                      |
| ------------------------------- | ------------------------ |
| `content/en/index.md`           | `/docs`                  |
| `content/en/getting-started.md` | `/docs/getting-started`  |
| `content/en/guide/routing.md`   | `/docs/guide/routing`    |
| `content/en/guide/index.md`     | `/docs/guide`            |
| `content/ko/guide/routing.md`   | `/ko/docs/guide/routing` |

The base locale is unprefixed; every other locale gets its code as a URL prefix.

## Index pages

An `index.md` maps to its folder's own URL — `guide/index.md` is served at `/docs/guide`. The locale root's `index.md` becomes the docs landing page at `/docs`.

## Sidebar grouping

The first path segment groups pages in the sidebar:

- Files at the locale root form the first group, titled by `rootSection` in [Site Config](/docs/reference/site-config).
- Each subfolder becomes a group. Its title comes from the pages' `section` frontmatter, falling back to the folder name.
- Within and across groups, pages sort by the `order` frontmatter field.

Deeper nesting (`guide/advanced/x.md`) still routes fine — it just stays inside its top-level group in the sidebar.

## Prerendering

Every page is prerendered to static HTML at build time, in every locale. Pages that only exist in the base locale are served as fallbacks for other locales instead of 404ing — see [Internationalization](/docs/guide/i18n). Broken internal links fail the build, so they never reach production.
