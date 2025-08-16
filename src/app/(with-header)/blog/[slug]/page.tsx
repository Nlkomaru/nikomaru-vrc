import type { Metadata } from "next";
import { ScrollToTop } from "../_component/scroll-to-top";
import { TOC } from "../_component/toc";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const { default: posts } = await import("../content.json");
    const post = (
        posts as Array<{
            slug: string;
            title?: string;
            description?: string;
            image?: string;
        }>
    ).find((p) => p.slug === slug);

    const title = `${post?.title ?? slug} - Nikomaru VRChat Activities`;
    const description = post?.description;
    const image =
        post?.image ??
        "/0197c5ed-de70-74fb-ad2c-7a6bb2c2240f.webp";

    return {
        title,
        description,
        openGraph: image
            ? {
                  title: `${title} - Nikomaru VRChat Activities`,
                  description,
                  images: [`https://vrc.nikomaru.dev${image}`],
                  siteName: "Nikomaru - VRChat Activities and Experiences",
                  url: `https://vrc.nikomaru.dev/blog/${slug}`,
              }
            : undefined,
        twitter: image
            ? {
                  card: "summary_large_image",
                  site: "https://vrc.nikomaru.dev",
                  title,
                  description,
                  images: [`https://vrc.nikomaru.dev${image}`],
              }
            : undefined,
    } satisfies Metadata;
}

export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const { default: Post } = await import(`@/content/${slug}/index.mdx`);

    if (!Post) {
        throw new Error(`Post not found for slug: ${slug}`);
    }

    return (
        <div className="max-w-7xl mx-auto py-4">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* メインコンテンツエリア */}
                <div className="lg:col-span-3">
                    {/* スマホ用のTOC（markdownコンテンツの上部に配置） */}
                    <div className="lg:hidden mb-6">
                        <TOC />
                    </div>

                    <div className="prose prose-lg max-w-none font-regular">
                        <Post />
                    </div>
                </div>

                {/* デスクトップ用サイドバー（TOC） */}
                <div className="hidden lg:block lg:col-span-1">
                    <div className="sticky top-8">
                        <TOC />
                    </div>
                </div>
            </div>

            {/* 常に右下に表示される「一番上に戻る」ボタン */}
            <ScrollToTop />
        </div>
    );
}

export const dynamic = "auto";
export const dynamicParams = true;

export async function generateStaticParams() {
    const { default: posts } = await import("../content.json");
    return (posts as Array<{ slug: string }>).map((p) => ({ slug: p.slug }));
}
