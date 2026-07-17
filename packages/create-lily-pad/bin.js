#!/usr/bin/env node
import { cp, readFile, rename, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, resolve, basename } from "node:path";
import { fileURLToPath } from "node:url";

const target = resolve(process.cwd(), process.argv[2] ?? "my-docs");
const name = basename(target)
  .toLowerCase()
  .replace(/[^a-z0-9-]/g, "-");

if (existsSync(target)) {
  console.error(`✖ ${target} already exists — pick an empty directory.`);
  process.exit(1);
}

const template = fileURLToPath(new URL("./template", import.meta.url));
await cp(template, target, { recursive: true });

// npm strips .gitignore from published packages, so it ships as _gitignore.
await rename(join(target, "_gitignore"), join(target, ".gitignore"));

for (const file of ["package.json", "wrangler.jsonc"]) {
  const path = join(target, file);
  await writeFile(
    path,
    (await readFile(path, "utf-8")).replaceAll("{{name}}", name),
  );
}

console.log(`
✔ Created ${name}

Next steps:
  cd ${process.argv[2] ?? "my-docs"}
  pnpm install
  pnpm dev

Write markdown in content/, configure the site in lily-pad.config.ts.
`);
