// @ts-nocheck
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkCjkFriendly from 'remark-cjk-friendly';
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
	remarkPlugins: [remarkGfm, remarkCjkFriendly],
	rehypePlugins: [rehypeSlug, [rehypePrettyCode, prettyCodeOptions], rehypeHandleMetadata],
	blueprints: {
		default: {
			path: resolve(__dirname, './src/lib/components/mdsx/blueprint.svelte')
		}
	}
});
