import Link from "next/link";
import type { PostMeta } from "./types";

export function PostCard({ post }: { post: PostMeta }) {
    const img = (post.thumbnail?.[0]?.url ?? "/bg-image.webp") as string;

    return (
        <Link href={`/blog/${post.id}`}>
            <article className="h-full rounded-md overflow-hidden bg-white/5 border border-border">
                <div className="relative w-full aspect-[16/9]">
                    {/* biome-ignore lint/performance/noImgElement: Notion renders these remote thumbnails directly, avoiding edge image-optimizer failures. */}
                    <img
                        src={img}
                        alt={post.title ?? post.id}
                        loading="lazy"
                        decoding="async"
                        className="size-full object-cover"
                    />
                </div>
                <div className="p-4 bg-white/50 backdrop-blur-sm">
                    <h3
                        className="text-lg font-medium font-regular overflow-hidden text-ellipsis whitespace-nowrap"
                        title={post.title ?? post.id}
                    >
                        {post.title ?? post.id}
                    </h3>
                    {post.description ? (
                        <p
                            className="text-sm mt-2 text-muted-foreground overflow-hidden text-ellipsis whitespace-nowrap"
                            title={post.description}
                        >
                            {post.description}
                        </p>
                    ) : null}
                    {post.created_at ? (
                        <p className="text-sm mt-2 font-regular text-muted-foreground">
                            Published:{" "}
                            {
                                new Date(post.created_at)
                                    .toISOString()
                                    .split("T")[0]
                            }
                        </p>
                    ) : null}
                </div>
            </article>
        </Link>
    );
}
