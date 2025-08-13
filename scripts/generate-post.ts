/*
  Build-time script: Generate a new post directory with uuidv7 format
  Creates src/content/<uuidv7>/index.mdx with frontmatter
*/
import fs from "node:fs/promises";
import path from "node:path";
import { uuidv7 } from "uuidv7";

// 新しい投稿のテンプレートfrontmatter
const POST_TEMPLATE = `---
title: "新しい投稿"
date: "${new Date().toISOString()}"
tags: []
description: "投稿の概要をここに記述してください"
image: null
---

# 新しい投稿

ここに投稿の内容を記述してください。

## 見出し1

段落の内容...

## 見出し2

- リストアイテム1
- リストアイテム2
- リストアイテム3

\`\`\`typescript
// コードブロックの例
function hello() {
  console.log("Hello, World!");
}
\`\`\`
`;

async function main() {
    try {
        // uuidv7でユニークなIDを生成
        const postId = uuidv7();

        // 投稿ディレクトリのパスを作成
        const contentRoot = path.join(process.cwd(), "src", "content");
        const postDir = path.join(contentRoot, postId);
        const mdxPath = path.join(postDir, "index.mdx");

        // ディレクトリを作成
        await fs.mkdir(postDir, { recursive: true });

        const assetsRoot = path.join(process.cwd(), "public", "assets");
        const assetsDir = path.join(assetsRoot, postId);
        await fs.mkdir(assetsDir, { recursive: true });

        // index.mdxファイルを作成
        await fs.writeFile(mdxPath, POST_TEMPLATE, "utf8");

        console.info("✅ 新しい投稿を作成しました！");
        console.info(`📁 ディレクトリ: src/content/${postId}/`);
        console.info(`📝 ファイル: src/content/${postId}/index.mdx`);
        console.info(`🔗 投稿ID: ${postId}`);
        console.info(
            `\n📝 編集を開始するには: src/content/${postId}/index.mdx を開いてください`,
        );
    } catch (error) {
        console.error("❌ 投稿の作成に失敗しました:", error);
        process.exit(1);
    }
}

main();
