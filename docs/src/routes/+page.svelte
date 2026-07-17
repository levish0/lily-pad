<script lang="ts">
	import { page } from '$app/state';
	import { Button } from '$lib/components/ui/button/index.js';
	import { localizeHref } from '$lib/paraglide/runtime';
	import { localeOfUrl } from '$lib/locale.js';

	const locale = $derived(localeOfUrl(page.url));
</script>

<svelte:head>
	<title>lily-pad — calm documentation sites</title>
	<meta
		name="description"
		content="A calm, minimal documentation generator built on SvelteKit and lily-svelte."
	/>
</svelte:head>

<main class="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-24 text-center">
	<h1 class="max-w-2xl text-4xl font-semibold tracking-[-1.28px] text-balance sm:text-5xl">
		Calm documentation sites, from markdown.
	</h1>
	<p class="max-w-xl text-base leading-[1.6] tracking-[-0.48px] text-balance text-(--text)/56">
		lily-pad turns a folder of markdown files into a rounded, minimal docs site — built on
		SvelteKit, styled with lily-svelte.
	</p>
	<div class="flex items-center gap-3 pt-2">
		<Button href={localizeHref('/docs', { locale })}>Get started</Button>
		<Button variant="ghost" href="https://github.com/levish0/lily-pad" target="_blank">
			GitHub ↗
		</Button>
	</div>
</main>
