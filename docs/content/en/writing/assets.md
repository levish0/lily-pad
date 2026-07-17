---
title: Assets
description: Images and other static files — where to put them and how to reference them.
section: Writing
order: 21
---

## Static files

Put files in `static/` and reference them by absolute path. A file at `static/city84.1600.webp` is served at `/city84.1600.webp`:

```md
![A calm city](/city84.1600.webp)
```

![A calm city](/city84.1600.webp)

Images in markdown render full-width with lily's `rounded-3xl` corners.

## Alt text

The text in square brackets is the image's alt text — write it for someone who can't see the image. It is required for accessible documentation.

## Anything else

`static/` is copied to the site root verbatim, so it also works for favicons, `robots.txt`, PDFs, fonts — any file you want served as-is.
