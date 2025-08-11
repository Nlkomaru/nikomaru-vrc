import type { Metadata } from "next";

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

    const title = post?.title ?? slug;
    const description = post?.description;
    const image = post?.image;

    return {
        title,
        description,
        openGraph: image
            ? {
                  title: `${title} - Nikomaru VRChat Activities`,
                  description,
                  images: [image],
                  siteName: "Nikomaru - VRChat Activities and Experiences",
                  url: `https://vrc.nikomaru.com/blog/${slug}`,
              }
            : undefined,
        twitter: image
            ? {
                  card: "summary_large_image",
                  site: "https://vrc.nikomaru.com/blog",
                  title,
                  description,
                  images: [image],
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
        <div className="max-w-[800px] mx-auto px-4 py-8 font-regular">
            <Post />
        </div>
    );
}

export const dynamicParams = false;

export async function generateStaticParams() {
    const { default: posts } = await import("../content.json");
    return (posts as Array<{ slug: string }>).map((p) => ({ slug: p.slug }));
}
