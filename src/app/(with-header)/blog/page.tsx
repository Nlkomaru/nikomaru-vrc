import { getCloudflareContext } from "@opennextjs/cloudflare";
import { PostCard } from "./_component/post-card";
import type { PostMeta } from "./_component/types";

export default async function BlogIndexPage() {
<<<<<<< HEAD
    const { env } = await getCloudflareContext({ async: true });
=======
    const { env } = getCloudflareContext();
>>>>>>> ffd804585717b7c3075a2ff9d870fca18250f814
    const res = await fetch(`${env.TABLE_URL}`);
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
