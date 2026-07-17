<script lang="ts">
	import { page } from '$app/state';
	import { localized } from '$lib/config.js';
	import { getLilyPad } from '$lib/context.js';

	const lp = getLilyPad();
	const { runtime, site } = lp;
	const locale = $derived(lp.localeOf(page.url));
	const footer = $derived(site.footer);
</script>

{#if footer}
	<footer class="border-t border-(--text)/8">
		<div
			class="mx-auto flex max-w-[88rem] flex-col gap-2 px-6 py-8 text-sm tracking-[-0.39px] text-(--text)/40 sm:flex-row sm:items-center sm:justify-between lg:px-8"
		>
			{#if footer.message}
				<!-- eslint-disable-next-line svelte/no-at-html-tags -- footer.message comes from the site owner's own config -->
				<p class="[&_a]:text-(--text)/72">
					{@html localized(footer.message, locale, runtime.baseLocale)}
				</p>
			{/if}
			{#if footer.note}
				<p>{localized(footer.note, locale, runtime.baseLocale)}</p>
			{/if}
		</div>
	</footer>
{/if}
