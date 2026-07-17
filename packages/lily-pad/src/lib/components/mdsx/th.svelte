<script lang="ts">
	import * as Table from '$lib/components/ui/table/index.js';
	import { cn } from '$lib/utils.js';
	import type { HTMLThAttributes } from 'svelte/elements';

	let { class: className, children, ...restProps }: HTMLThAttributes = $props();
</script>

<Table.Head
	class={cn('[&[align=center]]:text-center [&[align=right]]:text-right', className)}
	{...restProps}
>
	{@render children?.()}
</Table.Head>
