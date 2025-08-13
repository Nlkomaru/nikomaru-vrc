/** biome-ignore-all lint/performance/noImgElement: I dont want to use next/image for styling */
import type { MDXComponents } from "mdx/types";
import { headers } from "next/headers";
import {
    Admonition,
    Danger,
    Info,
    Note,
    Success,
    Tip,
    Warning,
} from "@/components/admonition";
import type { AdmonitionProps } from "@/components/admonition";
import {
    H1,
    H2,
    H3,
    H4,
    H5,
    H6,
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
    h5: ({ children }) => <H5>{children}</H5>,
    h6: ({ children }) => <H6>{children}</H6>,
    p: ({ children }) => (
        <p className="text-md leading-relaxed pb-2">{children}</p>
    ),
    a: ({ children, href }) => (
        <a href={href} className="text-blue-500 underline hover:text-blue-600">
            {children}
        </a>
    ),
    blockquote: ({ children }) => <Quote>{children}</Quote>,
    ul: ({ children }) => <UnOrderedList>{children}</UnOrderedList>,
    ol: ({ children }) => <OrderedList>{children}</OrderedList>,
    code: ({ children }) => <InlineCode>{children}</InlineCode>,
    pre: ({ children }) => <MultilineCode>{children}</MultilineCode>,
    // Admonitions
    Admonition: (props: AdmonitionProps) => <Admonition {...props} />,
    Note: (props: Omit<AdmonitionProps, "type">) => <Note {...props} />,
    Tip: (props: Omit<AdmonitionProps, "type">) => <Tip {...props} />,
    Info: (props: Omit<AdmonitionProps, "type">) => <Info {...props} />,
    Warning: (props: Omit<AdmonitionProps, "type">) => <Warning {...props} />,
    Danger: (props: Omit<AdmonitionProps, "type">) => <Danger {...props} />,
    Success: (props: Omit<AdmonitionProps, "type">) => <Success {...props} />,
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
