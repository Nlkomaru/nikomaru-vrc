import { Hono } from "hono";
import { handle } from "hono/vercel";

const app = new Hono().basePath("/api");

app.get("/hello", (c) => {
    return c.json({
        message: "Hello Next.js!",
    });
});

app.get("/model/:modelName", async (c) => {
    const modelName = c.req.param("modelName");
    const data = await fetch(`https://cdn.vrc.nikomaru.dev/${modelName}`);
    const blob = await data.blob();
    return c.body(blob, 200, {
        "Content-Type": "application/octet-stream",
    });
});

export const GET = handle(app);
export const POST = handle(app);
