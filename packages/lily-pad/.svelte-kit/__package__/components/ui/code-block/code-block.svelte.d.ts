export type CodeBlockVariant = 'default' | 'secondary';
export type CodeBlockProps = {
    class?: string;
    variant?: CodeBlockVariant;
    /** The raw code to display and copy. */
    code: string;
    /** A shiki language id loaded in `shiki.ts`, e.g. `ts`, `svelte`, or `bash`. */
    lang?: string;
};
declare const CodeBlock: import("svelte").Component<CodeBlockProps, {}, "">;
type CodeBlock = ReturnType<typeof CodeBlock>;
export default CodeBlock;
