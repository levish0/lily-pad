<script lang="ts">
	import { cn } from '$lib/utils.js';
	import type { HTMLAttributes } from 'svelte/elements';

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLElement> = $props();
</script>

<blockquote
	class={cn('mt-6 border-s-2 border-(--text)/16 ps-6 text-(--text)/72 italic', className)}
	{...restProps}
>
	{@render children?.()}
</blockquote>
