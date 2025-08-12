import Image from "next/image";
import Link from "next/link";
import type { PostMeta } from "./types";

type Props = {
    post: PostMeta;
};

export function PostCard({ post }: Props) {
    const img = (post.image ?? "/bg-image.png") as string;
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
                <div className="p-4">
                    <h3 className="text-lg font-medium font-regular">
                        {post.title ?? post.slug}
                    </h3>
                    {post.date ? (
                        <p className="text-sm mt-1 font-regular">
                            Published:{" "}
                            {new Date(post.date).toISOString().split("T")[0]}
                        </p>
                    ) : null}
                </div>
            </article>
        </Link>
    );
}
