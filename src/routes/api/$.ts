import { createFileRoute } from "@tanstack/react-router";
import { Hono } from "hono";

const app = new Hono().basePath("/api");

app.get("/hello", (c) => {
    return c.json({
        message: "Hello TanStack Start!",
    });
});

app.get("/model/:modelName", async (c) => {
    const modelName = c.req.param("modelName");
    const data = await fetch(`https://cdn.vrc.nikomaru.dev/${modelName}`);
    const blob = await data.blob();
    return c.body(blob as unknown as ArrayBuffer, 200, {
        "Content-Type": "application/octet-stream",
    });
});

export const Route = createFileRoute("/api/$")({
    server: {
        handlers: {
            GET: ({ request }) => app.fetch(request),
            POST: ({ request }) => app.fetch(request),
        },
    },
});
