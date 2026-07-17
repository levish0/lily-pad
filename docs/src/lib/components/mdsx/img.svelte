<script lang="ts">
	import { cn } from '$lib/utils.js';
	import type { HTMLImgAttributes } from 'svelte/elements';

	let { class: className, src, alt, ...restProps }: HTMLImgAttributes = $props();
</script>

<img {src} {alt} class={cn('my-6 w-full rounded-3xl', className)} {...restProps} />
