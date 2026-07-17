// @ts-check
import { defineCollection, defineConfig, s } from 'velite';

const docSchema = s
	.object({
		title: s.string(),
		description: s.string(),
		path: s.path(),
		navLabel: s.string().optional(),
		section: s.string().optional(),
		order: s.number().optional(),
		links: s
			.object({
				doc: s.string().optional(),
				api: s.string().optional(),
				source: s.string().optional()
			})
			.optional(),
		toc: s.toc()
	})
	.transform((data) => {
		// Normalize a folder index (e.g. `guide/index`) to its folder path
		// (`guide`) so the route slug and metadata lookup line up.
		const path = data.path.replace(/\/index$/, '');
		return {
			...data,
			path,
			slug: path.split('/').slice(1).join('/'),
			slugFull: `/${path}`
		};
	});

const docs = defineCollection({
	name: 'docs',
	pattern: './**/*.md',
	schema: docSchema
});

export default defineConfig({
	root: './content',
	collections: { docs },
	output: { assets: 'static' }
});
