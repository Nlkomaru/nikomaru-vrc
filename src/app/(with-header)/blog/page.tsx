import { env } from "cloudflare:workers";
import { PostCard } from "./_component/post-card";
import type { PostMeta } from "./_component/types";

export default async function BlogIndexPage() {
    // .env / .dev.vars を優先し、Workers 上では wrangler.jsonc の vars を使う
    const tableUrl = process.env.TABLE_URL ?? env.TABLE_URL;

    const res = await fetch(`${tableUrl}`);
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
