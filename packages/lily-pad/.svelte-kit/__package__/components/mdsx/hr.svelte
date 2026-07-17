<script lang="ts">
	import { Separator } from '../ui/separator/index.js';
	import { cn } from '../../utils.js';
	import type { HTMLAttributes } from 'svelte/elements';

	let { class: className, ...restProps }: HTMLAttributes<HTMLElement> = $props();
</script>

<Separator class={cn('my-4 md:my-8', className)} {...restProps} />
