import { getCloudflareContext } from "@opennextjs/cloudflare";
import type { Metadata } from "next";
import type { PostMeta } from "../_component/types";
import { redirectMap } from "./redirect";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { env } = getCloudflareContext();

    const { slug } = await params;
    const data = await fetch(`${env.TABLE_URL}`).then((res) =>
        res.json<PostMeta[]>(),
    );
    const redirect = redirectMap.find((redirect) => redirect.from === slug);

    const post = redirect
        ? data.find((p: PostMeta) => p.id === redirect.to)
        : data.find((p: PostMeta) => p.id === slug);
    const title = `${post?.title ?? slug} - Nikomaru VRChat Activities`;
    const image =
        post?.thumbnail?.[0]?.url ??
        "/0197c5ed-de70-74fb-ad2c-7a6bb2c2240f.webp";
    const description = post?.description;

    return {
        title: title,
        description,
        openGraph: image
            ? {
                  title: `${title} - Nikomaru VRChat Activities`,
                  description,
                  images: [image],
                  siteName: "Nikomaru - VRChat Activities and Experiences",
                  url: `https://vrc.nikomaru.dev/blog/${post?.slug}`,
              }
            : undefined,
        twitter: image
            ? {
                  card: "summary_large_image",
                  site: "https://vrc.nikomaru.dev",
                  title: title,
                  description,
                  images: [`https://vrc.nikomaru.dev${image}`],
              }
            : undefined,
    } satisfies Metadata;
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
