"use client";
import "../styles.css";
import dynamic from "next/dynamic";
import Link from "next/link";
import type { ExtendedRecordMap } from "notion-types/build/index";
import { NotionRenderer } from "react-notion-x";
import { Model } from "@/components/organisms/model";

const Code = dynamic(() =>
    import("react-notion-x/build/third-party/code").then((m) => m.Code),
);

export const Render = ({ recordMap }: { recordMap: ExtendedRecordMap }) => {
    const CustomLink = (props: {
        href?: string;
        children: React.ReactNode;
    }) => {
        const url = props.href;
        if (url?.startsWith("https://cdn.vrc.nikomaru.dev/")) {
            return <Model url={url} />;
        }
        return (
            <Link
                href={url ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-dashed decoration-primary underline-offset-4"
            >
                {props.children}
            </Link>
        );
    };
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
