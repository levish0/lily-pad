<script lang="ts">
	import * as Table from '../ui/table/index.js';
	import { cn } from '../../utils.js';
	import type { HTMLThAttributes } from 'svelte/elements';

	let { class: className, children, ...restProps }: HTMLThAttributes = $props();
</script>

<Table.Head
	class={cn('[&[align=center]]:text-center [&[align=right]]:text-right', className)}
	{...restProps}
>
	{@render children?.()}
</Table.Head>
