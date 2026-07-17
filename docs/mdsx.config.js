/* eslint-disable @typescript-eslint/ban-ts-comment -- plugin option shapes vary too much for checkJs */
// @ts-nocheck
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import rehypeSlug from 'rehype-slug';
import remarkCjkFriendly from 'remark-cjk-friendly';
import remarkDirective from 'remark-directive';
import remarkGfm from 'remark-gfm';
import { visit } from 'unist-util-visit';
import { defineConfig } from 'mdsx';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

/* ----------------------------------------------------------------------------
 * Code blocks — highlighting is done client-side by the lily `<CodeBlock>`
 * component, so here we only hoist the raw source and language onto the
 * `<pre>` element for the blueprint's pre.svelte to pick up as props.
 * The source is URI-encoded so braces/quotes survive attribute serialization.
 * ------------------------------------------------------------------------- */
function rehypeCodeBlock() {
	return (tree) => {
		visit(tree, 'element', (node) => {
			if (node.tagName !== 'pre') return;
			const [codeEl] = node.children ?? [];
			if (codeEl?.type !== 'element' || codeEl.tagName !== 'code') return;

			const classNames = [codeEl.properties?.className ?? []].flat().map(String);
			const lang = classNames
				.find((name) => name.startsWith('language-'))
				?.slice('language-'.length);

			let raw = '';
			visit(codeEl, 'text', (text) => {
				raw += text.value;
			});

			node.properties = {
				'data-code': encodeURIComponent(raw.replace(/\n$/, '')),
				'data-lang': lang
			};
			node.children = [];
		});
	};
}

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

export const mdsxConfig = defineConfig({
	extensions: ['.md'],
	remarkPlugins: [remarkGfm, remarkCjkFriendly, remarkDirective, remarkCallouts],
	rehypePlugins: [rehypeSlug, rehypeCodeBlock],
	blueprints: {
		default: {
			path: resolve(__dirname, './src/lib/components/mdsx/blueprint.svelte')
		}
	}
});
