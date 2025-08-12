import React, { forwardRef, type JSX } from "react";
import { cn } from "@/lib/utils";

// Reusable helper to create components with consistent structure
const createComponent = <T extends HTMLElement>(
    tag: keyof JSX.IntrinsicElements,
    defaultClassName: string,
    displayName: string,
) => {
    const Component = forwardRef<T, React.HTMLAttributes<T>>((props, ref) => {
        return React.createElement(
            tag,
            { ...props, ref, className: cn(defaultClassName, props.className) },
            props.children,
        );
    });
    Component.displayName = displayName;
    return Component;
};

export const H1 = createComponent<HTMLHeadingElement>(
    "h1",
    "scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl pb-2",
    "H1",
);

export const H2 = createComponent<HTMLHeadingElement>(
    "h2",
    "scroll-m-20 border-b py-2 text-2xl font-semibold tracking-tight first:mt-0 pb-2 pt-8",
    "H2",
);

export const H3 = createComponent<HTMLHeadingElement>(
    "h3",
    "scroll-m-20 text-xl font-semibold tracking-tight pb-2 pt-4",
    "H3",
);

export const H4 = createComponent<HTMLHeadingElement>(
    "h4",
    "scroll-m-20 text-lg font-semibold tracking-tight pb-2 pt-4",
    "H4",
);

export const H5 = createComponent<HTMLHeadingElement>(
    "h5",
    "scroll-m-20 text-base font-semibold tracking-tight pb-2 pt-4",
    "H5",
);

export const H6 = createComponent<HTMLHeadingElement>(
    "h6",
    "scroll-m-20 text-base font-semibold tracking-tight pb-2 pt-4",
    "H6",
);

export const Lead = createComponent<HTMLParagraphElement>(
    "p",
    "text-xl text-muted-foreground",
    "Lead",
);

export const P = createComponent<HTMLParagraphElement>(
    "p",
    "leading-7 [&:not(:first-child)]:mt-6",
    "P",
);

export const Large = createComponent<HTMLDivElement>(
    "div",
    "text-lg font-semibold",
    "Large",
);

export const Small = createComponent<HTMLParagraphElement>(
    "p",
    "text-sm font-medium leading-none",
    "Small",
);

export const Muted = createComponent<HTMLSpanElement>(
    "span",
    "text-sm text-muted-foreground",
    "Muted",
);

export const InlineCode = createComponent<HTMLSpanElement>(
    "code",
    "relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-mono",
    "InlineCode",
);

export const MultilineCode = createComponent<HTMLPreElement>(
    "pre",
    "relative rounded-sm bg-muted m-4 p-4 font-mono text-sm overflow-x-auto w",
    "MultilineCode",
);

export const UnOrderedList = createComponent<HTMLUListElement>(
    "ul",
    "my-2 ml-6 list-disc [&>li]:mt-2",
    "List",
);

export const OrderedList = createComponent<HTMLOListElement>(
    "ol",
    "my-2 ml-6 list-decimal [&>li]:mt-2",
    "List",
);

export const Quote = createComponent<HTMLQuoteElement>(
    "blockquote",
    "mt-4 border-l-2 pl-6 italic text-muted-foreground",
    "Quote",
);
