<script lang="ts">
	import { cn } from '../../utils.js';
	import type { HTMLAttributes } from 'svelte/elements';

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLHeadingElement> = $props();
</script>

<h5 class={cn('mt-8 scroll-m-28 text-base font-medium tracking-tight', className)} {...restProps}>
	{@render children?.()}
</h5>
