import type { Snippet } from 'svelte';
import '../icons.js';
import type { SiteConfig } from '../config.js';
import { type DocEntry } from '../content.js';
import { type LocaleRuntime } from '../context.js';
type $$ComponentProps = {
    site: SiteConfig;
    runtime: LocaleRuntime;
    docs: DocEntry[];
    children?: Snippet;
};
declare const AppShell: import("svelte").Component<$$ComponentProps, {}, "">;
type AppShell = ReturnType<typeof AppShell>;
export default AppShell;
