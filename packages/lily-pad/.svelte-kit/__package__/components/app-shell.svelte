<script lang="ts">
	import type { Snippet } from 'svelte';
	import { ModeWatcher } from 'mode-watcher';
	import '../icons.js';
	import type { SiteConfig } from '../config.js';
	import { createNav, type DocEntry } from '../content.js';
	import { setLilyPad, type LocaleRuntime } from '../context.js';
	import SiteHeader from './site-header.svelte';

	let {
		site,
		runtime,
		docs,
		children
	}: {
		site: SiteConfig;
		runtime: LocaleRuntime;
		docs: DocEntry[];
		children?: Snippet;
	} = $props();

	// Context is set once at init by design — site/runtime/docs are static for
	// the lifetime of the app.
	// svelte-ignore state_referenced_locally
	setLilyPad({ site, runtime, nav: createNav(docs, site, runtime.locales, runtime.baseLocale) });
</script>

<ModeWatcher defaultMode="light" />

<div class="flex min-h-svh flex-col">
	<SiteHeader />
	{@render children?.()}
</div>
