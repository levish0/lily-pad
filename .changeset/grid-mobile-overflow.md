---
'@levish0/lily-pad': patch
---

Fix mobile overflow on the home feature grid: grid items get `min-w-0` so an unbreakable line (e.g. the code card) no longer widens the column past the viewport — long code scrolls inside its card instead.
