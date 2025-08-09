import postsData from "^/blog/content.json";
import { PostCard } from "./_component/post-card";
import type { PostMeta } from "./_component/types";

export default function BlogIndexPage() {
    const posts = postsData as PostMeta[];

    return (
        <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                    <PostCard key={post.slug} post={post} />
                ))}
            </div>
        </div>
    );
}
