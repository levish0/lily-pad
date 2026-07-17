<script lang="ts">
	import { page } from '$app/state';
	import { localizeHref } from '$lib/paraglide/runtime';
	import { localeOfUrl } from '$lib/locale.js';
	import { cn } from '$lib/utils.js';
	import type { HTMLAnchorAttributes } from 'svelte/elements';

	let { class: className, children, href, ...restProps }: HTMLAnchorAttributes = $props();

	const internal = $derived(href?.startsWith('/') || href?.startsWith('#'));
	const rel = $derived(!internal ? 'noopener noreferrer' : undefined);
	const target = $derived(!internal ? '_blank' : undefined);
	// Path links written in markdown are canonical (`/docs/...`) — keep the
	// reader inside their current locale.
	const resolvedHref = $derived(
		href?.startsWith('/') ? localizeHref(href, { locale: localeOfUrl(page.url) }) : href
	);
</script>

<a href={resolvedHref} {target} {rel} class={cn('link font-medium', className)} {...restProps}>
	{@render children?.()}
</a>
