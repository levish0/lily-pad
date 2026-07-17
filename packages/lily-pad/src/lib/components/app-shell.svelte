<script lang="ts">
	import type { Snippet } from 'svelte';
	import { ModeWatcher } from 'mode-watcher';
	import '$lib/icons.js';
	import type { SiteConfig } from '$lib/config.js';
	import { createNav, type DocEntry } from '$lib/content.js';
	import { setLilyPad, type LocaleRuntime } from '$lib/context.js';
	import SiteHeader from '$lib/components/site-header.svelte';

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
