<script lang="ts">
	import { page } from '$app/state';
	import { Button } from 'lily-pad';
	import { localizeHref } from '$lib/paraglide/runtime';
	import { localeOfUrl, site } from '$lib/lily-pad.js';

	const locale = $derived(localeOfUrl(page.url));
</script>

<svelte:head>
	<title>{site.title}</title>
	<meta name="description" content={site.description} />
</svelte:head>

<main class="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-24 text-center">
	<h1 class="max-w-2xl text-4xl font-semibold tracking-[-1.28px] text-balance sm:text-5xl">
		{site.title}
	</h1>
	<p class="max-w-xl text-base leading-[1.6] tracking-[-0.48px] text-balance text-(--text)/56">
		{site.description}
	</p>
	<div class="flex items-center gap-3 pt-2">
		<Button href={localizeHref('/docs', { locale })}>Get started</Button>
	</div>
</main>
