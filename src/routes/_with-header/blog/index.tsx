import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { PostCard } from "@/components/blog/post-card";
import type { PostMeta } from "@/components/blog/types";
import { fetchTable } from "@/lib/table-url";

const loadBlogPosts = createServerFn({ method: "GET" }).handler(
    async (): Promise<PostMeta[]> => {
        const res = await fetchTable();
        const json = await res.json<PostMeta[]>();
        return json
            .filter(
                (post) =>
                    !post.hidden && !post.description?.startsWith("_hidden"),
            )
            .sort(
                (a, b) =>
                    new Date(b.created_at ?? "").getTime() -
                    new Date(a.created_at ?? "").getTime(),
            );
    },
);

export const Route = createFileRoute("/_with-header/blog/")({
    loader: () => loadBlogPosts(),
    component: BlogIndexPage,
});

function BlogIndexPage() {
    const posts = Route.useLoaderData();

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
                <PostCard key={post.id} post={post} />
            ))}
        </div>
    );
}
