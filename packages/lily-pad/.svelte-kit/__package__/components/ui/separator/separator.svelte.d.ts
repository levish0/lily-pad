import { type WithElementRef } from '../../../utils.js';
import type { HTMLAttributes } from 'svelte/elements';
type Props = WithElementRef<HTMLAttributes<HTMLDivElement>> & {
    orientation?: 'horizontal' | 'vertical';
    decorative?: boolean;
};
declare const Separator: import("svelte").Component<Props, {}, "ref">;
type Separator = ReturnType<typeof Separator>;
export default Separator;
