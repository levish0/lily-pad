<script lang="ts">
	import type { Snippet } from 'svelte';
	import { page } from '$app/state';
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
	const lp = setLilyPad({
		site,
		runtime,
		nav: createNav(docs, site, runtime.locales, runtime.baseLocale)
	});

	// Client-side navigation does not rerun the host's HTML transform.
	// Keep Pagefind's language source in sync, including history navigation.
	$effect(() => {
		document.documentElement.lang = lp.localeOf(page.url);
	});
</script>

<ModeWatcher defaultMode="light" />

<div class="flex min-h-svh flex-col">
	<SiteHeader />
	{@render children?.()}
</div>
