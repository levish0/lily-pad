<script lang="ts">
	import * as Table from '$lib/components/ui/table/index.js';
	import { cn } from '$lib/utils.js';
	import type { HTMLAttributes } from 'svelte/elements';

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLTableRowElement> = $props();
</script>

<!-- Markdown emits raw thead/tbody (not blueprint-mapped), so the row border
     lily normally applies via those wrappers lives on the row itself here. -->
<Table.Row class={cn('border-b border-(--text)/8 last:border-b-0', className)} {...restProps}>
	{@render children?.()}
</Table.Row>
