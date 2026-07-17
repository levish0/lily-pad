<script lang="ts">
	import { CodeBlock } from '$lib/components/ui/code-block/index.js';
	import { cn } from '$lib/utils.js';

	let {
		class: className,
		'data-code': encodedCode,
		'data-lang': lang
	}: {
		class?: string;
		'data-code'?: string;
		'data-lang'?: string;
	} = $props();

	// `rehypeCodeBlock` URI-encodes the source so braces and quotes survive
	// the trip through an attribute in the compiled markup.
	const code = $derived(encodedCode ? decodeURIComponent(encodedCode) : '');
</script>

<CodeBlock {code} {lang} class={cn('my-5', className)} />
