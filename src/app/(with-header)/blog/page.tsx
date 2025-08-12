import { PostCard } from "./_component/post-card";
import type { PostMeta } from "./_component/types";
import postsData from "./content.json";

export default function BlogIndexPage() {
    const posts = postsData as PostMeta[];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
                <PostCard key={post.slug} post={post} />
            ))}
        </div>
    );
}
