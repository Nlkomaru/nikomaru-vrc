import { createFileRoute, redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { NotionAPI } from "notion-client";
import { Render } from "@/components/blog/post/render";
import { ScrollToTop } from "@/components/blog/post/toc/scroll-to-top";
import { TOC } from "@/components/blog/post/toc/toc";
import type { PostMeta } from "@/components/blog/types";
import { redirectMap } from "@/lib/blog-redirects";
import { normalizeRecordMap } from "@/lib/notion-record-map";
import { fetchTable } from "@/lib/table-url";

function toAbsoluteUrl(url: string) {
    return new URL(url, "https://vrc.nikomaru.dev").toString();
}

const loadBlogPost = createServerFn({ method: "GET" })
    .validator((slug: string) => slug)
    .handler(async ({ data: slug }) => {
        const redirectEntry = redirectMap.find((entry) => entry.from === slug);
        if (redirectEntry) {
            throw redirect({ href: redirectEntry.to });
        }

        const notion = new NotionAPI();
        const [tableRes, rawRecordMap] = await Promise.all([
            fetchTable(),
            notion.getPage(slug),
        ]);
        const tableData = await tableRes.json<PostMeta[]>();
        const post = tableData.find((entry) => entry.id === slug);
        const recordMap = normalizeRecordMap(rawRecordMap);

        const title = `${post?.title ?? slug} - Nikomaru VRChat Activities`;
        const image =
            post?.thumbnail?.[0]?.url ??
            "/0197c5ed-de70-74fb-ad2c-7a6bb2c2240f.webp";
        const absoluteImage = toAbsoluteUrl(image);
        const description = post?.description;

        return {
            slug,
            recordMap,
            meta: {
                title,
                description,
                image,
                absoluteImage,
                url: `https://vrc.nikomaru.dev/blog/${post?.id ?? slug}`,
            },
        };
    });

export const Route = createFileRoute("/_with-header/blog/$slug")({
    loader: ({ params }) => loadBlogPost({ data: params.slug }),
    head: ({ loaderData }) => {
        if (!loaderData) {
            return {};
        }
        const { meta } = loaderData;
        return {
            meta: [
                { title: meta.title },
                ...(meta.description
                    ? [{ name: "description", content: meta.description }]
                    : []),
                {
                    property: "og:title",
                    content: `${meta.title} - Nikomaru VRChat Activities`,
                },
                ...(meta.description
                    ? [
                          {
                              property: "og:description",
                              content: meta.description,
                          },
                      ]
                    : []),
                { property: "og:image", content: meta.image },
                {
                    property: "og:site_name",
                    content: "Nikomaru - VRChat Activities and Experiences",
                },
                { property: "og:url", content: meta.url },
                { name: "twitter:card", content: "summary_large_image" },
                { name: "twitter:site", content: "https://vrc.nikomaru.dev" },
                { name: "twitter:title", content: meta.title },
                ...(meta.description
                    ? [
                          {
                              name: "twitter:description",
                              content: meta.description,
                          },
                      ]
                    : []),
                { name: "twitter:image", content: meta.absoluteImage },
            ],
        };
    },
    component: BlogPostPage,
});

function BlogPostPage() {
    const { recordMap } = Route.useLoaderData();

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
