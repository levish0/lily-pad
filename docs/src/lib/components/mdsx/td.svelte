<script lang="ts">
	import * as Table from '$lib/components/ui/table/index.js';
	import { cn } from '$lib/utils.js';
	import type { HTMLTdAttributes } from 'svelte/elements';

	let { class: className, children, ...restProps }: HTMLTdAttributes = $props();
</script>

<Table.Cell
	class={cn('[&[align=center]]:text-center [&[align=right]]:text-right', className)}
	{...restProps}
>
	{@render children?.()}
</Table.Cell>
