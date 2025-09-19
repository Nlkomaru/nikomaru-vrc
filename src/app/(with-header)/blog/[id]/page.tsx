import { redirect as redirectTo } from "next/navigation";
import { NotionAPI } from "notion-client";
import React from "react";
import { Render } from "./_component/render";
import { ScrollToTop } from "./_component/toc/scroll-to-top";
import { TOC } from "./_component/toc/toc";
import { redirectMap } from "./layout";

export default async function Page({ params }: { params: { id: string } }) {
    const { id } = await params;
    const redirect = redirectMap.find((redirect) => redirect.from === id);
    if (redirect) {
        return redirectTo(redirect.to);
    }
    const notion = new NotionAPI();
    const recordMap = await notion.getPage(id);

    return (
        <div className="flex justify-between">
            <div className="w-full">
                <div className="lg:hidden mb-6">
                    <TOC />
                </div>

                <div className="prose prose-lg font-regular w-full mx-0 px-0 prose-headings:ml-0 prose-p:ml-0">
                    <Render recordMap={recordMap} />
                </div>
            </div>

            <div className="hidden lg:block w-[20rem]">
                <div className="sticky top-8">
                    <TOC />
                </div>
            </div>

            <ScrollToTop />
        </div>
    );
}

//TODO redirect処理
