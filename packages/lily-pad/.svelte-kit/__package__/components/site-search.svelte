<script lang="ts">
	import Icon from '@iconify/svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { Dialog, DialogContent } from './ui/dialog/index.js';
	import { Kbd } from './ui/kbd/index.js';
	import { getLilyPad } from '../context.js';

	interface PagefindModule {
		search: (query: string) => Promise<{
			results: { id: string; data: () => Promise<PagefindDocument> }[];
		}>;
	}
	interface PagefindDocument {
		url: string;
		excerpt: string;
		meta: { title?: string };
	}
	interface Result {
		title: string;
		href: string;
		section?: string;
		excerpt?: string;
	}

	let open = $state(false);
	let query = $state('');
	let inputEl = $state<HTMLInputElement>();

	const lp = getLilyPad();
	const locale = $derived(lp.localeOf(page.url));

	// Full-text search over the built site. The index only exists in
	// production output, so in dev this stays null and we fall back to
	// filtering sidebar titles.
	let pagefind: PagefindModule | null | undefined;
	let fullTextResults = $state<Result[] | undefined>();

	async function loadPagefind() {
		if (pagefind !== undefined) return;
		try {
			// The index only exists in build output. The specifier must be a
			// runtime value — a literal (even behind a const) gets inlined when
			// consumers prebundle this package, and vite's import analysis then
			// fails on the missing file in dev.
			const url = `${location.origin}/pagefind/pagefind.js`;
			pagefind = (await import(/* @vite-ignore */ url)) as PagefindModule;
		} catch {
			pagefind = null;
		}
	}

	function cleanUrl(url: string): string {
		return url.replace(/\/index\.html$/, '/').replace(/\.html$/, '') || '/';
	}

	let searchToken = 0;
	async function runSearch(q: string) {
		if (!pagefind || !q.trim()) {
			fullTextResults = undefined;
			return;
		}
		const token = ++searchToken;
		const { results } = await pagefind.search(q.trim());
		const docs = await Promise.all(results.slice(0, 10).map((r) => r.data()));
		if (token !== searchToken) return;
		fullTextResults = docs.map((doc) => ({
			title: doc.meta.title ?? doc.url,
			href: cleanUrl(doc.url),
			excerpt: doc.excerpt
		}));
	}

	const navItems: Result[] = $derived(
		lp.nav
			.sections(locale)
			.flatMap((s) => s.items.map((i) => ({ title: i.title, href: i.href, section: s.title })))
	);

	const results: Result[] = $derived(
		fullTextResults ??
			(query.trim()
				? navItems.filter((i) => i.title.toLowerCase().includes(query.trim().toLowerCase()))
				: navItems)
	);

	function handleKeydown(e: KeyboardEvent) {
		if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
			e.preventDefault();
			open = true;
		}
	}

	function select(item: Result) {
		open = false;
		query = '';
		fullTextResults = undefined;
		// Pagefind URLs come from the built pages, already locale-prefixed;
		// sidebar fallback hrefs are canonical and need localizing.
		goto(item.excerpt !== undefined ? item.href : lp.runtime.localizeHref(item.href, { locale }));
	}

	$effect(() => {
		runSearch(query);
	});

	$effect(() => {
		if (open) {
			query = '';
			fullTextResults = undefined;
			loadPagefind();
			// focus the input once the dialog mounts
			setTimeout(() => inputEl?.focus(), 0);
		}
	});
</script>

<svelte:window onkeydown={handleKeydown} />

<button
	type="button"
	onclick={() => (open = true)}
	class="inline-flex h-9 w-72 items-center gap-2 rounded-2xl bg-(--text)/5 px-3.5 text-sm tracking-[-0.39px] text-(--text)/40 transition-colors duration-150 hover:bg-(--text)/8"
>
	<Icon icon="heroicons:magnifying-glass-solid" class="size-4 shrink-0" aria-hidden="true" />
	<span class="flex-1 text-left whitespace-nowrap">{lp.str('searchPlaceholder', locale)}</span>
	<Kbd class="shrink-0">⌘K</Kbd>
</button>

<Dialog bind:open>
	<DialogContent showCloseButton={false} class="top-24 max-w-lg translate-y-0 gap-0 p-0">
		<div class="flex items-center gap-2 border-b border-(--text)/8 px-4">
			<Icon
				icon="heroicons:magnifying-glass-solid"
				class="size-4.5 shrink-0 text-(--text)/40"
				aria-hidden="true"
			/>
			<input
				bind:this={inputEl}
				bind:value={query}
				placeholder={lp.str('searchPlaceholder', locale)}
				class="h-12 flex-1 bg-transparent text-sm tracking-[-0.39px] outline-none placeholder:text-(--text)/40"
			/>
		</div>
		<div class="max-h-80 overflow-y-auto p-2">
			{#if results.length === 0}
				<p class="px-3 py-6 text-center text-sm text-(--text)/40">
					{lp.str('searchNoResults', locale)}
				</p>
			{:else}
				{#each results as item (item.href)}
					<button
						type="button"
						onclick={() => select(item)}
						class="flex w-full flex-col gap-0.5 rounded-xl px-3 py-2 text-left text-sm tracking-[-0.39px] transition-colors duration-100 hover:bg-(--text)/8"
					>
						<span class="flex w-full items-center justify-between gap-2">
							<span>{item.title}</span>
							{#if item.section}
								<span class="text-xs text-(--text)/40">{item.section}</span>
							{/if}
						</span>
						{#if item.excerpt}
							<!-- eslint-disable svelte/no-at-html-tags -- pagefind excerpts are built from the site's own prerendered pages -->
							<span
								class="line-clamp-2 text-xs leading-[1.6] text-(--text)/56 [&_mark]:bg-transparent [&_mark]:font-semibold [&_mark]:text-(--text)"
								>{@html item.excerpt}</span
							>
							<!-- eslint-enable svelte/no-at-html-tags -->
						{/if}
					</button>
				{/each}
			{/if}
		</div>
	</DialogContent>
</Dialog>
