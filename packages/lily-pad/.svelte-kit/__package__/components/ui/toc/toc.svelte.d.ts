export type TocItem = {
    title: string;
    url: string;
    items?: TocItem[];
};
type $$ComponentProps = {
    toc: TocItem[];
    title?: string;
    /** Prefix each item with a 1.1-style outline number. */
    numbered?: boolean;
    /** Distance from the top (px) that counts as "current". */
    offset?: number;
    /** Scroll container to spy on. Defaults to the window. */
    root?: HTMLElement;
    class?: string;
};
declare const Toc: import("svelte").Component<$$ComponentProps, {}, "">;
type Toc = ReturnType<typeof Toc>;
export default Toc;
