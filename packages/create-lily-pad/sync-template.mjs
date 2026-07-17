// Runs on prepublishOnly: pins the template's theme dependency to the
// lily-pad version being released alongside this package. The template is
// plain files (not a workspace member), so changesets can't bump it.
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const here = (path) => fileURLToPath(new URL(path, import.meta.url));

const { version } = JSON.parse(readFileSync(here('../lily-pad/package.json'), 'utf-8'));
const templatePath = here('./template/package.json');
const template = JSON.parse(readFileSync(templatePath, 'utf-8'));

template.devDependencies['@levish0/lily-pad'] = `^${version}`;
writeFileSync(templatePath, JSON.stringify(template, null, '\t') + '\n');

console.log(`template pinned to @levish0/lily-pad@^${version}`);
