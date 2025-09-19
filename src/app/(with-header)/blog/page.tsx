import { getCloudflareContext } from "@opennextjs/cloudflare";
import { PostCard } from "./_component/post-card";
import type { PostMeta } from "./_component/types";

export default async function BlogIndexPage() {
    let tableUrl = process.env.TABLE_URL;
    if (!tableUrl) {
        const { env } = await getCloudflareContext({ async: true });
        tableUrl = env.TABLE_URL;
    }

    const res = await fetch(`${tableUrl}`);
    let json = await res.json<PostMeta[]>();
    json.sort(
        (a, b) =>
            new Date(b.created_at ?? "").getTime() -
            new Date(a.created_at ?? "").getTime(),
    );
    json = json.filter(
        (post: PostMeta) => !post.description?.startsWith("_hidden"),
    );

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {json.map((post: PostMeta) => (
                <PostCard key={post.id} post={post} />
            ))}
        </div>
    );
}
