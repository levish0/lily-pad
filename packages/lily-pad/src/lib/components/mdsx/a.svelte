<script lang="ts">
	import { page } from '$app/state';
	import { getLilyPad } from '$lib/context.js';
	import { cn } from '$lib/utils.js';
	import type { HTMLAnchorAttributes } from 'svelte/elements';

	let { class: className, children, href, ...restProps }: HTMLAnchorAttributes = $props();

	const lp = getLilyPad();
	const internal = $derived(href?.startsWith('/') || href?.startsWith('#'));
	const rel = $derived(!internal ? 'noopener noreferrer' : undefined);
	const target = $derived(!internal ? '_blank' : undefined);
	// Path links written in markdown are canonical (`/docs/...`) — keep the
	// reader inside their current locale.
	const resolvedHref = $derived(
		href?.startsWith('/') ? lp.runtime.localizeHref(href, { locale: lp.localeOf(page.url) }) : href
	);
</script>

<a href={resolvedHref} {target} {rel} class={cn('link font-medium', className)} {...restProps}>
	{@render children?.()}
</a>
