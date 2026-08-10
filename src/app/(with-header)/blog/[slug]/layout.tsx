import type { Metadata } from "next";
import { fetchTable } from "@/lib/table-url";
import type { PostMeta } from "../_component/types";
import { redirectMap } from "./redirect";

// Post metadata is fetched through a Worker binding and cannot be prerendered.
export const dynamic = "force-dynamic";

function toAbsoluteUrl(url: string) {
    return new URL(url, "https://vrc.nikomaru.dev").toString();
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const res0 = await fetchTable();
    const data = await res0.json<PostMeta[]>();
    const redirect = redirectMap.find((redirect) => redirect.from === slug);

    const post = redirect
        ? data.find((p: PostMeta) => p.id === redirect.to)
        : data.find((p: PostMeta) => p.id === slug);
    const title = `${post?.title ?? slug} - Nikomaru VRChat Activities`;
    const image =
        post?.thumbnail?.[0]?.url ??
        "/0197c5ed-de70-74fb-ad2c-7a6bb2c2240f.webp";
    const absoluteImage = toAbsoluteUrl(image);
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
                  url: `https://vrc.nikomaru.dev/blog/${post?.id ?? slug}`,
              }
            : undefined,
        twitter: image
            ? {
                  card: "summary_large_image",
                  site: "https://vrc.nikomaru.dev",
                  title: title,
                  description,
                  images: [absoluteImage],
              }
            : undefined,
    } satisfies Metadata;
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
