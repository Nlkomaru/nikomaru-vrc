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
        <div className="w-[800px] mx-auto px-4 py-8">
            <Post />
        </div>
    );
}

export const dynamicParams = false;
