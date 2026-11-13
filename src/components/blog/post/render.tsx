import "./styles.css";
import type { ExtendedRecordMap } from "notion-types/build/index";
import { lazy, Suspense } from "react";
import { NotionRenderer } from "react-notion-x";
import { Model } from "@/components/organisms/model";

const LazyCode = lazy(() =>
    import("react-notion-x/build/third-party/code").then((m) => ({
        default: m.Code,
    })),
);

const Code = (props: React.ComponentProps<typeof LazyCode>) => (
    <Suspense fallback={null}>
        <LazyCode {...props} />
    </Suspense>
);

export const CustomLink = (props: {
    href?: string;
    children: React.ReactNode;
}) => {
    const url = props.href;
    if (url?.startsWith("https://cdn.vrc.nikomaru.dev/")) {
        return <Model url={url} />;
    }
    return (
        <a
            href={url ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-dashed decoration-primary underline-offset-4"
        >
            {props.children}
        </a>
    );
};

export const Render = ({ recordMap }: { recordMap: ExtendedRecordMap }) => {
    return (
        <NotionRenderer
            recordMap={recordMap}
            className="w-full"
            components={{
                Code,
                Link: CustomLink,
            }}
        />
    );
};
