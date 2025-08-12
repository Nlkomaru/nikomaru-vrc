/*
  Build-time script: Scan public/bibtex/*.bib and generate BibTeXId type for src/types/bibtex.ts
  Each .bib file in public/bibtex directory will be used to generate the type list
*/
import fs from "node:fs/promises";
import path from "node:path";

async function main() {
    const bibtexDir = path.join(process.cwd(), "public", "bibtex");
    const outputFile = path.join(process.cwd(), "src", "types", "bibtex.ts");

    try {
        // bibtexディレクトリ内の.bibファイルを読み込み
        const entries = await fs.readdir(bibtexDir, { withFileTypes: true });
        const bibFiles = entries
            .filter((e) => e.isFile() && e.name.endsWith(".bib"))
            .map((e) => e.name.replace(".bib", "")) // .bib拡張子を除去
            .sort(); // アルファベット順にソート

        if (bibFiles.length === 0) {
            console.warn("No .bib files found in public/bibtex directory");
            return;
        }

        // 既存のbibtex.tsxファイルを読み込み
        const existingContent = await fs.readFile(outputFile, "utf8");

        // //startと//endの間のBibTeXIdの型定義を置換
        const startPattern = /\/\/start/;
        const endPattern = /\/\/end/;
        const newTypeDefinition = `//start\nexport type BibTeXId = "${bibFiles.join('" | "')}";\n//end`;

        if (
            startPattern.test(existingContent) &&
            endPattern.test(existingContent)
        ) {
            // //startと//endの間の型定義を置換
            const updatedContent = existingContent.replace(
                /\/\/start[\s\S]*?\/\/end/,
                newTypeDefinition,
            );
            await fs.writeFile(outputFile, updatedContent, "utf8");
            console.info(
                `Updated BibTeXId type in ${path.relative(process.cwd(), outputFile)}`,
            );
        } else {
            // //startと//endのコメントが見つからない場合は警告
            console.warn(
                "Could not find //start and //end comments in bibtex.ts",
            );
            console.info(
                "Please manually update the type definition with:",
                newTypeDefinition,
            );
        }

        console.info(
            `Found ${bibFiles.length} bibtex files: ${bibFiles.join(", ")}`,
        );
    } catch (error) {
        console.error("Error generating bibtex types:", error);
        process.exit(1);
    }
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
