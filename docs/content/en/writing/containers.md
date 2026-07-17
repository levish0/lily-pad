---
title: Containers
description: Callout blocks — tip, info, note, warning, and danger.
order: 4
---

Wrap content in `:::` fences to render a callout. Five types are available: `tip`, `info`, `note`, `warning`, and `danger`.

```md
::: tip
Something helpful the reader might miss.
:::
```

::: tip
Something helpful the reader might miss.
:::

::: info
Neutral background information.
:::

::: warning
Proceed with care — this can bite.
:::

::: danger
This action is destructive.
:::

## Custom titles

Put a title in square brackets after the type:

```md
::: tip[Pro tip]
You can name the callout anything.
:::
```

::: tip[Pro tip]
You can name the callout anything.
:::

## Markdown inside

Containers hold any markdown — emphasis, `inline code`, links, and lists all work:

::: note[Everything nests]
A list inside a callout:

- calm
- rounded
:::
