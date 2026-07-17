// @ts-nocheck
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkCjkFriendly from 'remark-cjk-friendly';
import remarkDirective from 'remark-directive';
import remarkGfm from 'remark-gfm';
import { visit } from 'unist-util-visit';
import { createHighlighterCore } from 'shiki/core';
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript';
import { defineConfig } from 'mdsx';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const jsEngine = createJavaScriptRegexEngine();

export async function createHighlighter() {
	if (!globalThis.__shikiHighlighter) {
		globalThis.__shikiHighlighter = await createHighlighterCore({
			themes: [
				import('@shikijs/themes/github-dark'),
				import('@shikijs/themes/github-light-default')
			],
			langs: [
				import('@shikijs/langs/typescript'),
				import('@shikijs/langs/javascript'),
				import('@shikijs/langs/svelte'),
				import('@shikijs/langs/css'),
				import('@shikijs/langs/json'),
				import('@shikijs/langs/yaml'),
				import('@shikijs/langs/markdown'),
				import('@shikijs/langs/bash')
			],
			engine: jsEngine
		});
	}
	return globalThis.__shikiHighlighter;
}

/**
 * @typedef {import('hast').Root} HastRoot
 * @typedef {import('unified').Transformer<HastRoot, HastRoot>} HastTransformer
 */

/** @type {import('rehype-pretty-code').Options} */
const prettyCodeOptions = {
	theme: { dark: 'github-dark', light: 'github-light-default' },
	keepBackground: false,
	// @ts-expect-error - shh
	getHighlighter: createHighlighter,
	onVisitLine(node) {
		if (node.children.length === 0) {
			node.children = [{ type: 'text', value: ' ' }];
		}
	},
	onVisitHighlightedLine(node) {
		node.properties.className = ['line--highlighted'];
	},
	onVisitHighlightedChars(node) {
		node.properties.className = ['chars--highlighted'];
	}
};

/* ----------------------------------------------------------------------------
 * Custom containers — VitePress-style `::: tip` blocks rendered as lily
 * callouts (rounded-2xl, calm tints; semantics carried by the title color).
 * ------------------------------------------------------------------------- */
const CALLOUTS = {
	tip: { title: 'TIP', box: 'bg-(--text)/5', heading: 'text-(--text)' },
	info: { title: 'INFO', box: 'bg-(--text)/5', heading: 'text-(--text)' },
	note: { title: 'NOTE', box: 'bg-(--text)/5', heading: 'text-(--text)' },
	warning: {
		title: 'WARNING',
		box: 'bg-amber-500/10',
		heading: 'text-amber-600 dark:text-amber-400'
	},
	danger: { title: 'DANGER', box: 'bg-red-500/10', heading: 'text-red-600 dark:text-red-400' }
};

function remarkCallouts() {
	return (tree) => {
		visit(tree, (node, index, parent) => {
			if (node.type === 'containerDirective') {
				const variant = CALLOUTS[node.name];
				if (!variant) return;

				let title = variant.title;
				const [first] = node.children;
				if (first?.data?.directiveLabel) {
					title = first.children.map((child) => child.value ?? '').join('');
					node.children.shift();
				}

				node.data = {
					hName: 'div',
					hProperties: {
						class: `callout my-6 flex flex-col gap-1 rounded-2xl px-4 py-3.5 text-sm leading-[1.6] tracking-[-0.39px] text-(--text)/72 ${variant.box}`,
						'data-callout': node.name
					}
				};
				node.children.unshift({
					type: 'paragraph',
					data: {
						hName: 'div',
						hProperties: { class: `font-medium ${variant.heading}` }
					},
					children: [{ type: 'text', value: title }]
				});
				return;
			}

			// A stray `:word` in prose (easy to hit in Korean text without a space
			// after the colon) parses as a directive and would vanish — put the
			// literal text back instead.
			if (node.type === 'textDirective' || node.type === 'leafDirective') {
				if (parent === undefined || index === undefined) return;
				const prefix = node.type === 'textDirective' ? ':' : '::';
				const restored = [{ type: 'text', value: `${prefix}${node.name}` }, ...node.children];
				parent.children.splice(
					index,
					1,
					...(node.type === 'leafDirective'
						? [{ type: 'paragraph', children: restored }]
						: restored)
				);
				return index + restored.length;
			}
		});
	};
}

/**
 * Adds `data-metadata` to `<figure>` elements that contain a `<figcaption>`
 * (code blocks with a `title="..."` meta) so they can be styled.
 * @returns {HastTransformer}
 */
function rehypeHandleMetadata() {
	return async (tree) => {
		visit(tree, (node) => {
			if (node?.type === 'element' && node?.tagName === 'figure') {
				if (!('data-rehype-pretty-code-figure' in node.properties)) return;

				const preElement = node.children.at(-1);
				if (preElement && 'tagName' in preElement && preElement.tagName !== 'pre') {
					return;
				}

				const firstChild = node.children.at(0);

				if (firstChild && 'tagName' in firstChild && firstChild.tagName === 'figcaption') {
					node.properties['data-metadata'] = '';
					const lastChild = node.children.at(-1);
					if (lastChild && 'properties' in lastChild) {
						lastChild.properties['data-metadata'] = '';
					}
				}
			}
		});
	};
}

export const mdsxConfig = defineConfig({
	extensions: ['.md'],
	remarkPlugins: [remarkGfm, remarkCjkFriendly, remarkDirective, remarkCallouts],
	rehypePlugins: [rehypeSlug, [rehypePrettyCode, prettyCodeOptions], rehypeHandleMetadata],
	blueprints: {
		default: {
			path: resolve(__dirname, './src/lib/components/mdsx/blueprint.svelte')
		}
	}
});
