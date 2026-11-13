import { createFileRoute } from "@tanstack/react-router";
import { getPortfolioPhotoObject } from "@/lib/portfolio-photos";

export const Route = createFileRoute("/api/photography/$photoId")({
    server: {
        handlers: {
            GET: async ({ params, request }) => {
                const object = await getPortfolioPhotoObject(params.photoId);

                if (!object) {
                    return new Response("Not found", { status: 404 });
                }

                const headers = new Headers();
                object.writeHttpMetadata(headers);
                headers.set(
                    "content-type",
                    headers.get("content-type") ?? "image/avif",
                );
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
            },
        },
    },
});
