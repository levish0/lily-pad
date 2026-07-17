// Theme shell — one component per layer of the site.
export { default as AppShell } from './components/app-shell.svelte';
export { default as DocsLayout } from './components/docs-layout.svelte';
export { default as DocPage } from './components/doc-page.svelte';
export { default as HomePage } from './components/home-page.svelte';
export { default as HomeHero } from './components/home-hero.svelte';
export { default as FeatureGrid } from './components/feature-grid.svelte';

// Site configuration.
export { defineSiteConfig, localized } from './config.js';
export type {
	SiteConfig,
	NavEntry,
	LocalizedText,
	ThemeStringKey,
	HomeConfig,
	HomeFeature
} from './config.js';

// Content plumbing (velite docs collection → nav/pages).
export { createNav, createDocLoader } from './content.js';
export type { DocEntry, TocEntry, NavItem, NavSection, DocsNav, DocLoader } from './content.js';

// Context (set by AppShell; read it in custom components).
export { getLilyPad, setLilyPad } from './context.js';
export type { LilyPadContext, LocaleRuntime } from './context.js';

// UI components for use inside markdown and custom pages.
export { Badge } from './components/ui/badge/index.js';
export { Button } from './components/ui/button/index.js';
export * as Card from './components/ui/card/index.js';
export { CodeBlock } from './components/ui/code-block/index.js';
export { Kbd } from './components/ui/kbd/index.js';
export { Separator } from './components/ui/separator/index.js';

export { cn } from './utils.js';
