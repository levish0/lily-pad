/* eslint-disable @typescript-eslint/no-explicit-any -- unified node shapes are too loose for strict typing */
import { fileURLToPath } from 'node:url';
import rehypeSlug from 'rehype-slug';
import remarkCjkFriendly from 'remark-cjk-friendly';
import remarkDirective from 'remark-directive';
import remarkGfm from 'remark-gfm';
import { visit } from 'unist-util-visit';
import { defineConfig, mdsx } from 'mdsx';

/* ----------------------------------------------------------------------------
 * Code blocks — highlighting is done client-side by the lily `<CodeBlock>`
 * component, so here we only hoist the raw source and language onto the
 * `<pre>` element for the blueprint's pre.svelte to pick up as props.
 * The source is URI-encoded so braces/quotes survive attribute serialization.
 * ------------------------------------------------------------------------- */
function rehypeCodeBlock() {
	return (tree: any) => {
		visit(tree, 'element', (node: any) => {
			if (node.tagName !== 'pre') return;
			const [codeEl] = node.children ?? [];
			if (codeEl?.type !== 'element' || codeEl.tagName !== 'code') return;

			const classNames = [codeEl.properties?.className ?? []].flat().map(String);
			const lang = classNames
				.find((name) => name.startsWith('language-'))
				?.slice('language-'.length);

			let raw = '';
			visit(codeEl, 'text', (text: any) => {
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
 * Custom containers — `::: tip` blocks rendered as lily callouts
 * (rounded-2xl, calm tints; semantics carried by the title color).
 * ------------------------------------------------------------------------- */
const CALLOUTS: Record<string, { title: string; box: string; heading: string }> = {
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
	return (tree: any) => {
		visit(tree, (node: any, index: number | undefined, parent: any) => {
			if (node.type === 'containerDirective') {
				const variant = CALLOUTS[node.name];
				if (!variant) return;

				let title = variant.title;
				const [first] = node.children;
				if (first?.data?.directiveLabel) {
					title = first.children.map((child: any) => child.value ?? '').join('');
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
 * Container fences. remark-directive only parses `:::tip[Title]`, so rewrite
 * the roomier `::: tip Title` form into it before mdsx runs. Lines inside
 * code fences are left untouched.
 */
function containerSyntax() {
	const FENCE = /^[ \t]*(`{3,}|~{3,})/;
	const CONTAINER = /^([ \t]*):::[ \t]+([A-Za-z][\w-]*)[ \t]*(.*?)[ \t]*$/;

	return {
		name: 'container-syntax',
		markup: ({ content, filename }: { content: string; filename?: string }) => {
			if (!filename?.endsWith('.md') || !content.includes(':::')) return;

			let inFence = false;
			const code = content
				.split('\n')
				.map((line) => {
					if (FENCE.test(line)) {
						inFence = !inFence;
						return line;
					}
					if (inFence) return line;
					return line.replace(CONTAINER, (_, indent, name, title) =>
						title ? `${indent}:::${name}[${title}]` : `${indent}:::${name}`
					);
				})
				.join('\n');

			if (code === content) return;
			return { code };
		}
	};
}

const blueprintPath = fileURLToPath(new URL('./components/mdsx/blueprint.svelte', import.meta.url));

export const mdsxConfig = defineConfig({
	extensions: ['.md'],
	remarkPlugins: [remarkGfm, remarkCjkFriendly, remarkDirective, remarkCallouts] as any,
	rehypePlugins: [rehypeSlug, rehypeCodeBlock] as any,
	blueprints: {
		default: { path: blueprintPath }
	}
});

/** The full lily-pad markdown pipeline as Svelte preprocessors — pass to
 *  `sveltekit({ preprocess: lilyPadPreprocess() })` along with
 *  `extensions: ['.svelte', '.md']`. */
export function lilyPadPreprocess() {
	return [containerSyntax(), mdsx(mdsxConfig)];
}
