import { fetchTable } from "@/lib/table-url";
import { PostCard } from "./_component/post-card";
import type { PostMeta } from "./_component/types";

// Blog metadata is fetched through a Worker binding and cannot be prerendered.
export const dynamic = "force-dynamic";
export default async function BlogIndexPage() {
    const res = await fetchTable();
    let json = await res.json<PostMeta[]>();
    json.sort(
        (a, b) =>
            new Date(b.created_at ?? "").getTime() -
            new Date(a.created_at ?? "").getTime(),
    );
    json = json.filter(
        (post: PostMeta) =>
            !post.hidden && !post.description?.startsWith("_hidden"),
    );

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {json.map((post: PostMeta) => (
                <PostCard key={post.id} post={post} />
            ))}
        </div>
    );
}
