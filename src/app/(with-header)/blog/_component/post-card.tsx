import Image from "next/image";
import Link from "next/link";
import type { PostMeta } from "./types";

type Props = {
    post: PostMeta;
};

export function PostCard({ post }: Props) {
    const img = (post.thumbnail ?? post.image) as string | undefined;
    return (
        <Link href={`/blog/${post.slug}`}>
            <article className="h-full rounded-lg overflow-hidden bg-white/5">
                {img ? (
                    <div className="relative w-full aspect-[16/9]">
                        <Image
                            src={img}
                            alt={post.title ?? post.slug}
                            fill
                            className="object-cover"
                        />
                    </div>
                ) : (
                    <div className="w-full aspect-[16/9] bg-white/5" />
                )}
                <div className="p-4">
                    <h3 className="text-lg font-medium">
                        {post.title ?? post.slug}
                    </h3>
                    {post.date ? (
                        <p className="text-sm mt-1">
                            {new Date(post.date).toISOString().split("T")[0]}
                        </p>
                    ) : null}
                    {(post.summary ?? post.description) ? (
                        <p className="text-sm mt-2">
                            {post.summary ?? post.description}
                        </p>
                    ) : null}
                    {Array.isArray(post.tags) && post.tags.length > 0 ? (
                        <div className="flex flex-wrap gap-2 mt-3">
                            {post.tags.map((t) => (
                                <span key={t} className="text-xs">
                                    {t}
                                </span>
                            ))}
                        </div>
                    ) : null}
                </div>
            </article>
        </Link>
    );
}
