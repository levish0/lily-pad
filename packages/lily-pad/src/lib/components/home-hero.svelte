<script lang="ts">
	import { page } from '$app/state';
	import { localized } from '$lib/config.js';
	import { getLilyPad } from '$lib/context.js';

	const lp = getLilyPad();
	const { runtime, site } = lp;
	const locale = $derived(lp.localeOf(page.url));
	const headline = $derived(
		localized(site.home?.headline, locale, runtime.baseLocale) || site.title
	);
</script>

<section class="mx-auto w-full max-w-[88rem] px-6 pt-28 pb-16 lg:px-8">
	<h1 class="text-5xl font-semibold tracking-[-1.92px] text-balance sm:text-6xl">
		{headline}
	</h1>
</section>
