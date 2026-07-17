import { paraglideVitePlugin } from '@inlang/paraglide-js';
import { mdsx } from 'mdsx';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vitest/config';
import { playwright } from '@vitest/browser-playwright';
import adapter from '@sveltejs/adapter-cloudflare';
import { sveltekit } from '@sveltejs/kit/vite';
import { mdsxConfig } from './mdsx.config.js';

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

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit({
			compilerOptions: {
				// Force runes for our own code. Skip node_modules and let mdsx-generated
				// `.md` components auto-detect. Can be removed in svelte 6.
				runes: ({ filename }) => {
					if (filename.split(/[/\\]/).includes('node_modules')) return undefined;
					if (filename.endsWith('.md')) return undefined;
					return true;
				}
			},
			adapter: adapter(),
			preprocess: [containerSyntax(), mdsx(mdsxConfig)],
			extensions: ['.svelte', '.md'],
			alias: {
				'$content/*': '.velite/*',
				$config: 'lily-pad.config.ts'
			}
		}),

		paraglideVitePlugin({
			project: './project.inlang',
			outdir: './src/lib/paraglide',
			strategy: ['url']
		})
	],
	server: {
		fs: {
			allow: ['.velite', 'content']
		}
	},
	test: {
		expect: { requireAssertions: true },
		projects: [
			{
				extends: './vite.config.ts',
				test: {
					name: 'client',
					browser: {
						enabled: true,
						provider: playwright(),
						instances: [{ browser: 'chromium', headless: true }]
					},
					include: ['src/**/*.svelte.{test,spec}.{js,ts}'],
					exclude: ['src/lib/server/**']
				}
			},

			{
				extends: './vite.config.ts',
				test: {
					name: 'server',
					environment: 'node',
					include: ['src/**/*.{test,spec}.{js,ts}'],
					exclude: ['src/**/*.svelte.{test,spec}.{js,ts}']
				}
			}
		]
	}
});
