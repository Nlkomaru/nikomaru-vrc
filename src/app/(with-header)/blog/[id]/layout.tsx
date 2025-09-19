import { getCloudflareContext } from "@opennextjs/cloudflare";
import type { Metadata } from "next";
import type { PostMeta } from "../_component/types";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>;
}): Promise<Metadata> {
    const { env } = getCloudflareContext();

    const { id } = await params;
    const data = await fetch(`${env.TABLE_URL}`).then((res) =>
        res.json<PostMeta[]>(),
    );
    const redirect = redirectMap.find((redirect) => redirect.from === id);

    const post = redirect
        ? data.find((p: PostMeta) => p.id === redirect.to)
        : data.find((p: PostMeta) => p.id === id);
    const title = `${post?.title ?? id} - Nikomaru VRChat Activities`;
    const image =
        post?.thumbnail?.[0]?.url ??
        "/0197c5ed-de70-74fb-ad2c-7a6bb2c2240f.webp";
    const description = post?.description;

    return {
        title,
        description,
        openGraph: image
            ? {
                  title: `${title} - Nikomaru VRChat Activities`,
                  description,
                  images: [image],
                  siteName: "Nikomaru - VRChat Activities and Experiences",
                  url: `https://vrc.nikomaru.dev/blog/${post.id}`,
              }
            : undefined,
        twitter: image
            ? {
                  card: "summary_large_image",
                  site: "https://vrc.nikomaru.dev",
                  title,
                  description,
                  images: [image.startsWith("http://") || image.startsWith("https://") ? image : `https://vrc.nikomaru.dev${image}`],
              }
            : undefined,
    } satisfies Metadata;
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}

export const redirectMap: { from: string; to: string }[] = [
    {
        // modeling-1
        from: "019897db-5e61-79a2-b85f-29b412fb2bad",
        to: "270a6d8e-271d-80a8-9cec-f204fdfce114",
    },
    {
        // faceemo
        from: "0198a228-1661-7c66-a978-be4b2921d379",
        to: "272a6d8e-271d-8013-890e-ff6666bc5f7c",
    },
    {
        // modeling-2
        from: "0198be3a-b960-7d1e-b1af-6082e108a014",
        to: "273a6d8e-271d-8000-b90a-c66fce1c7b20",
    },
    {
        // modeling-3
        from: "0198c8dc-6ab6-73e0-b286-7377f7bb9017",
        to: "273a6d8e-271d-809e-b588-cc34bb48c137",
    },
    {
        // modeling-4
        from: "0198db9f-7a6c-7987-ae3f-23b30a460d68",
        to: "273a6d8e-271d-8094-ae9a-f1d7325ebc5c",
    },
    {
        // modeling-5
        from: "01991d3e-4e61-78bf-a011-7c0c51ef1845",
        to: "273a6d8e-271d-8093-a507-eb0f2816d11c",
    },
    {
        // modeling-6
        from: "01993432-5137-7158-bc31-dddde6f60683",
        to: "273a6d8e-271d-8085-ac19-cbf20ebdb725",
    },
];
