export declare const mdsxConfig: import("mdsx").MDSXConfig;
/** The full lily-pad markdown pipeline as Svelte preprocessors — pass to
 *  `sveltekit({ preprocess: lilyPadPreprocess() })` along with
 *  `extensions: ['.svelte', '.md']`. */
export declare function lilyPadPreprocess(): ({
    name: string;
    markup: ({ content, filename }: {
        content: string;
        filename?: string;
    }) => {
        code: string;
    } | undefined;
} | import("svelte/compiler").PreprocessorGroup)[];
