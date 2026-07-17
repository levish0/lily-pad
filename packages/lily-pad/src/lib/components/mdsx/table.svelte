<script lang="ts">
	import * as Table from '$lib/components/ui/table/index.js';
	import type { HTMLAttributes } from 'svelte/elements';

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLTableElement> = $props();
</script>

<div class="my-6">
	<Table.Root class={className} {...restProps}>
		{@render children?.()}
	</Table.Root>
</div>
