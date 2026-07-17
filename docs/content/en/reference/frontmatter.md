---
title: Frontmatter
description: Every field lily-pad reads from the top of your markdown files.
section: Reference
order: 31
---

Every page starts with a YAML frontmatter block. `title` and `description` are required; everything else is optional.

```md
---
title: My Page
description: What this page covers.
navLabel: Short name
section: Guide
order: 3
---
```

## Fields

| Field          | Required | What it does                                               |
| -------------- | -------- | ---------------------------------------------------------- |
| `title`        | ✅       | Page heading and browser tab title                         |
| `description`  | ✅       | Subtitle under the heading, and the meta description       |
| `navLabel`     | —        | Shorter label for the sidebar (defaults to `title`)        |
| `section`      | —        | Sidebar group title — lets each locale name its own groups |
| `order`        | —        | Sort position in the sidebar (lower comes first)           |
| `links.source` | —        | Adds a "Source ↗" badge under the title                    |
| `links.api`    | —        | Adds an "API ↗" badge under the title                      |

## How the sidebar is built

The sidebar is generated from the content folder — no config file to maintain:

1. Files at the locale root form the first group, titled by `rootSection` in [Site Config](/docs/reference/site-config).
2. Each subfolder becomes a group, titled by `section` (or the folder name).
3. Pages sort by `order` — sections are positioned by their lowest page order, so give each folder its own range (e.g. root 1–9, guide 10–19).
