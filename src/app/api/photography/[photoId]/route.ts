import { getPortfolioPhotoObject } from "@/lib/portfolio-photos";

export const runtime = "edge";

type RouteContext = {
    params: Promise<{ photoId: string }>;
};

/** Streams a published portfolio image from R2 without exposing its storage key. */
export async function GET(_request: Request, { params }: RouteContext) {
    const { photoId } = await params;
    const object = await getPortfolioPhotoObject(photoId);

    if (!object) {
        return new Response("Not found", { status: 404 });
    }

    const headers = new Headers({
        "content-type": object.httpMetadata?.contentType ?? "image/avif",
    });

    if (object.httpEtag) {
        headers.set("etag", object.httpEtag);
    }

    return new Response(object.body, { headers });
}
