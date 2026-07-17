---
'@levish0/lily-pad': patch
---

Fix a hydration mismatch on the theme toggle: both sun/moon icons now render and CSS (`dark:` variant) picks the visible one, so server and client markup always match regardless of the visitor's persisted mode.
