<script lang="ts">
	import type { Component } from 'svelte';
	import Icon from '@iconify/svelte';
	import { page } from '$app/state';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Toc } from '$lib/components/ui/toc/index.js';
	import type { DocEntry } from '$lib/content.js';
	import { getLilyPad } from '$lib/context.js';

	let { doc, component }: { doc: DocEntry; component: Component } = $props();

	const lp = getLilyPad();
	const Markdown = $derived(component);
	const sourceLink = $derived(doc.links?.source);
	const apiLink = $derived(doc.links?.api);
	const locale = $derived(lp.localeOf(page.url));
	const neighbors = $derived(
		lp.nav.neighbors(lp.runtime.deLocalizeHref(page.url.pathname), locale)
	);
</script>

<svelte:head>
	<title>{doc.title} — {lp.site.title}</title>
	<meta name="description" content={doc.description} />
</svelte:head>

<div class="flex justify-between gap-12">
	<article class="max-w-3xl min-w-0 flex-1" data-pagefind-body>
		<div class="flex flex-col gap-2">
			<h1 class="text-3xl font-semibold tracking-[-0.96px]">{doc.title}</h1>
			{#if doc.description}
				<p class="text-base leading-[1.6] tracking-[-0.48px] text-balance text-(--text)/56">
					{doc.description}
				</p>
			{/if}
		</div>

		{#if sourceLink || apiLink}
			<div class="flex flex-wrap items-center gap-2 pt-4">
				{#if sourceLink}
					<Badge href={sourceLink} target="_blank" rel="noreferrer">Source ↗</Badge>
				{/if}
				{#if apiLink}
					<Badge href={apiLink} target="_blank" rel="noreferrer">API ↗</Badge>
				{/if}
			</div>
		{/if}

		<div class="mt-8">
			<Markdown />
		</div>

		{#if neighbors.previous || neighbors.next}
			<nav class="mt-14 flex flex-col gap-6" data-pagefind-ignore>
				<div class="h-px w-full bg-(--text)/8"></div>
				<div class="flex w-full gap-5">
					<div class="flex min-w-0 flex-1 flex-col gap-1">
						{#if neighbors.previous}
							<a
								href={lp.runtime.localizeHref(neighbors.previous.href, { locale })}
								class="flex flex-col gap-1 rounded-xl p-4 transition-colors duration-150 hover:bg-(--text)/4"
							>
								<span class="flex items-center gap-1 text-sm tracking-[-0.39px] text-(--text)/36">
									<Icon icon="heroicons:arrow-left-solid" class="size-3.5" />
									{lp.str('prevPage', locale)}
								</span>
								<span class="text-base leading-[1.5] font-medium tracking-[-0.48px] text-(--text)">
									{neighbors.previous.title}
								</span>
							</a>
						{/if}
					</div>
					<div class="flex min-w-0 flex-1 flex-col items-end gap-1">
						{#if neighbors.next}
							<a
								href={lp.runtime.localizeHref(neighbors.next.href, { locale })}
								class="flex w-full flex-col gap-1 rounded-xl p-4 text-right transition-colors duration-150 hover:bg-(--text)/4"
							>
								<span
									class="flex items-center justify-end gap-1 text-sm tracking-[-0.39px] text-(--text)/36"
								>
									{lp.str('nextPage', locale)}
									<Icon icon="heroicons:arrow-right-solid" class="size-3.5" />
								</span>
								<span class="text-base leading-[1.5] font-medium tracking-[-0.48px] text-(--text)">
									{neighbors.next.title}
								</span>
							</a>
						{/if}
					</div>
				</div>
			</nav>
		{/if}
	</article>

	<aside
		class="sticky top-14 hidden h-[calc(100svh-3.5rem)] w-52 shrink-0 overflow-y-auto py-10 xl:block"
	>
		<Toc toc={doc.toc} />
	</aside>
</div>
