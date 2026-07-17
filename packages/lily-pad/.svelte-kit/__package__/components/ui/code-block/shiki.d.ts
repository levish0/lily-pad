import { type HighlighterCore } from 'shiki/core';
/**
 * Lazy shared shiki highlighter for `<CodeBlock>` — fine-grained language and
 * theme imports with the JS regex engine, so only what's listed here ends up
 * in the bundle (and only once, no matter how many code blocks render).
 */
export declare function getHighlighter(): Promise<HighlighterCore>;
