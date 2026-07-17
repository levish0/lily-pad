<script lang="ts">
	import Icon from '@iconify/svelte';
	import { page } from '$app/state';
	import { localized, type HomeFeature } from '$lib/config.js';
	import { getLilyPad } from '$lib/context.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { CodeBlock } from '$lib/components/ui/code-block/index.js';
	import { cn } from '$lib/utils.js';

	let { features }: { features: HomeFeature[] } = $props();

	const lp = getLilyPad();
	const { runtime } = lp;
	const locale = $derived(lp.localeOf(page.url));

	function spanClass(feature: HomeFeature): string {
		// min-w-0: grid items default to min-width auto, so an unbreakable line
		// (e.g. a code card) would widen the column past the viewport on mobile.
		return feature.span === 2 ? 'min-w-0 sm:col-span-2' : 'min-w-0';
	}
</script>

{#snippet cardBody(feature: HomeFeature)}
	<Card.Root
		class={cn(
			'h-full min-w-0 gap-3 p-6 transition-colors duration-150',
			feature.href && 'hover:bg-(--text)/5'
		)}
	>
		{#if feature.icon}
			<span
				class="inline-flex size-10 items-center justify-center rounded-2xl bg-(--text)/5 text-(--text)/72"
			>
				<Icon icon={feature.icon} class="size-5" aria-hidden="true" />
			</span>
		{/if}
		<Card.Title class="text-base font-medium tracking-[-0.48px]">
			{localized(feature.title, locale, runtime.baseLocale)}
		</Card.Title>
		{#if feature.code}
			<CodeBlock code={feature.code} lang={feature.lang ?? 'bash'} variant="secondary" />
		{:else if feature.description}
			<Card.Description class="text-sm leading-[1.6] tracking-[-0.39px] text-(--text)/56">
				{localized(feature.description, locale, runtime.baseLocale)}
			</Card.Description>
		{/if}
	</Card.Root>
{/snippet}

<section
	class="mx-auto grid w-full max-w-[88rem] gap-4 px-6 pb-24 sm:grid-cols-2 lg:grid-cols-3 lg:px-8"
>
	{#each features as feature (feature)}
		{#if feature.href}
			<a href={runtime.localizeHref(feature.href, { locale })} class={spanClass(feature)}>
				{@render cardBody(feature)}
			</a>
		{:else}
			<div class={spanClass(feature)}>
				{@render cardBody(feature)}
			</div>
		{/if}
	{/each}
</section>
