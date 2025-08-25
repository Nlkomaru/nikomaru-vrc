import Image from "next/image";
import Link from "next/link";
import type { PostMeta } from "./types";

type Props = {
    post: PostMeta;
};

export function PostCard({ post }: Props) {
    let img = (post.image ?? "/bg-image.webp") as string;
    if (img.startsWith(":/")) {
        img = `/assets/${post.slug}${img.slice(1)}`;
    }
    return (
        <Link href={`/blog/${post.slug}`}>
            <article className="h-full rounded-lg overflow-hidden bg-white/5 border border-border">
                <div className="relative w-full aspect-[16/9]">
                    <Image
                        src={img}
                        alt={post.title ?? post.slug}
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="p-4 bg-white/50 backdrop-blur-sm">
                    <h3
                        className="text-lg font-medium font-regular overflow-hidden text-ellipsis whitespace-nowrap"
                        title={post.title ?? post.slug}
                    >
                        {post.title ?? post.slug}
                    </h3>
                    {post.description ? (
                        <p
                            className="text-sm mt-2 text-muted-foreground overflow-hidden text-ellipsis whitespace-nowrap"
                            title={post.description}
                        >
                            {post.description}
                        </p>
                    ) : null}
                    {post.date ? (
                        <p className="text-sm mt-2 font-regular text-muted-foreground">
                            Published:{" "}
                            {new Date(post.date).toISOString().split("T")[0]}
                        </p>
                    ) : null}
                </div>
            </article>
        </Link>
    );
}
