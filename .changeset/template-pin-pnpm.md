---
'@levish0/create-lily-pad': patch
---

Pin pnpm 11 via `packageManager` in the scaffolded project. Cloudflare Pages defaults to pnpm 10, which doesn't understand the template's `allowBuilds` setting (pnpm 11 syntax), so build scripts were silently skipped and lockfiles written locally with pnpm 11 could mismatch on deploy.
