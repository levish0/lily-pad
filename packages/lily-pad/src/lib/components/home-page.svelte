<script lang="ts">
	import { getLilyPad } from '$lib/context.js';
	import HomeHero from '$lib/components/home-hero.svelte';
	import FeatureGrid from '$lib/components/feature-grid.svelte';

	const lp = getLilyPad();
	const { site } = lp;
	const features = $derived(site.home?.features ?? []);
</script>

<svelte:head>
	<title>{site.title}</title>
	<meta name="description" content={site.description} />
</svelte:head>

<main class="flex flex-1 flex-col">
	<HomeHero />
	{#if features.length > 0}
		<FeatureGrid {features} />
	{/if}
</main>
