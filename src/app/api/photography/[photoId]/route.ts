import { getPortfolioPhotoObject } from "@/lib/portfolio-photos";

export const runtime = "edge";

type RouteContext = {
    params: Promise<{ photoId: string }>;
};

/** Streams a published portfolio image from R2 without exposing its storage key. */
export async function GET(request: Request, { params }: RouteContext) {
    const { photoId } = await params;
    const object = await getPortfolioPhotoObject(photoId);

    if (!object) {
        return new Response("Not found", { status: 404 });
    }

    const headers = new Headers();
    object.writeHttpMetadata(headers);
    headers.set("content-type", headers.get("content-type") ?? "image/avif");
    headers.set("etag", object.httpEtag);

    const ifNoneMatch = request.headers.get("if-none-match");
    const requestedObject = ifNoneMatch
        ?.split(",")
        .some(
            (tag) =>
                tag.trim() === "*" ||
                tag.trim().replace(/^W\//, "") === object.httpEtag,
        );

    if (requestedObject) {
        return new Response(null, { status: 304, headers });
    }

    return new Response(object.body, { headers });
}
