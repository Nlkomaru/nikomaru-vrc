import type { MDXComponents } from "mdx/types";
import {
    H1,
    H2,
    H3,
    H4,
    InlineCode,
    MultilineCode,
    OrderedList,
    Quote,
    UnOrderedList,
} from "@/components/ui/typography";

const components: MDXComponents = {};

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        // 組み込みコンポーネントをカスタマイズできます（例：スタイルを追加）
        h1: ({ children }) => <H1>{children}</H1>,
        h2: ({ children }) => <H2>{children}</H2>,
        h3: ({ children }) => <H3>{children}</H3>,
        h4: ({ children }) => <H4>{children}</H4>,
        blockquote: ({ children }) => <Quote>{children}</Quote>,
        ul: ({ children }) => <UnOrderedList>{children}</UnOrderedList>,
        ol: ({ children }) => <OrderedList>{children}</OrderedList>,
        code: ({ children }) => <InlineCode>{children}</InlineCode>,
        pre: ({ children }) => <MultilineCode>{children}</MultilineCode>,

        ...components,
    };
}
