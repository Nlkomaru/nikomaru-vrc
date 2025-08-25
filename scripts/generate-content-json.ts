/*
  Build-time script: Scan src/content/** and generate public/blog/content.json
  Each directory under src/content is a post; read its index.mdx frontmatter
*/
import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import type { PostMeta } from "@/app/(with-header)/blog/_component/types";

async function readPostMeta(postDir: string): Promise<PostMeta | null> {
    const slug = path.basename(postDir);
    const mdxPath = path.join(postDir, "index.mdx");
    try {
        const raw = await fs.readFile(mdxPath, "utf8");
        const parsed = matter(raw);
        const data = parsed.data as Record<string, unknown>;

        return {
            slug,
            title: (data.title as string) ?? undefined,
            date: (data.date as string) ?? undefined,
            tags: (data.tags as string[]) ?? undefined,
            description: (data.description as string) ?? undefined,
            image: (data.image as string) ?? undefined,
            ...data,
        };
    } catch {
        return null;
    }
}

async function main() {
    const contentRoot = path.join(process.cwd(), "src", "content");
    const outDir = path.join(
        process.cwd(),
        "src",
        "app",
        "(with-header)",
        "blog",
    );
    const outFile = path.join(outDir, "content.json");

    const entries = await fs
        .readdir(contentRoot, { withFileTypes: true })
        .catch(() => []);
    const dirs = entries
        .filter((e) => e.isDirectory())
        .map((e) => path.join(contentRoot, e.name))
        .filter((dir) => !dir.split(path.sep).pop()?.startsWith("_"));

    const posts = (
        await Promise.all(dirs.map((dir) => readPostMeta(dir)))
    ).filter(Boolean) as PostMeta[];

    posts.sort((a, b) => {
        const da = a.date ? Date.parse(a.date) : 0;
        const db = b.date ? Date.parse(b.date) : 0;
        return db - da;
    });

    await fs.mkdir(outDir, { recursive: true });
    await fs.writeFile(outFile, JSON.stringify(posts, null, 2));
    console.info(
        `Wrote ${posts.length} posts to ${path.relative(process.cwd(), outFile)}`,
    );
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
