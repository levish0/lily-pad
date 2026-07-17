<script lang="ts">
	import { DocPage } from 'lily-pad';

	let { data } = $props();
</script>

<DocPage doc={data.metadata} component={data.component} />
