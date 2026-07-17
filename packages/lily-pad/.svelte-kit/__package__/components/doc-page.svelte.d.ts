import type { Component } from 'svelte';
import type { DocEntry } from '../content.js';
type $$ComponentProps = {
    doc: DocEntry;
    component: Component;
};
declare const DocPage: Component<$$ComponentProps, {}, "">;
type DocPage = ReturnType<typeof DocPage>;
export default DocPage;
