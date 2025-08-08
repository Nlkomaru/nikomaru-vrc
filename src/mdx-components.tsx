/** biome-ignore-all lint/performance/noImgElement: I dont want to use next/image for styling */
import type { MDXComponents } from "mdx/types";
import { headers } from "next/headers";
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

const components: MDXComponents = {
    h1: ({ children }) => <H1>{children}</H1>,
    h2: ({ children }) => <H2>{children}</H2>,
    h3: ({ children }) => <H3>{children}</H3>,
    h4: ({ children }) => <H4>{children}</H4>,
    blockquote: ({ children }) => <Quote>{children}</Quote>,
    ul: ({ children }) => <UnOrderedList>{children}</UnOrderedList>,
    ol: ({ children }) => <OrderedList>{children}</OrderedList>,
    code: ({ children }) => <InlineCode>{children}</InlineCode>,
    pre: ({ children }) => <MultilineCode>{children}</MultilineCode>,
    img: async (props) => {
        const { src, alt, width, height } = props as {
            src: string;
            alt?: string;
            width?: number;
            height?: number;
        };
        const newSrc = src?.startsWith("http") ? src : await localUrl(src);

        return (
            <img
                src={newSrc}
                alt={alt || ""}
                width={width || 720}
                height={height || 400}
                className="rounded-md object-cover mx-auto mt-4"
            />
        );
    },
};

async function localUrl(src: string): Promise<string> {
    const headersData = await headers();
    const host = headersData.get("host");
    if (!host) {
        throw new Error("Host header is missing");
    }
    const protocol =
        headersData.get("x-forwarded-proto") ??
        (host.startsWith("localhost") ? "http" : "https");
    const apiBase = `${protocol}://${host}`;

    return apiBase + src;
}
export function useMDXComponents(): MDXComponents {
    return components;
}
