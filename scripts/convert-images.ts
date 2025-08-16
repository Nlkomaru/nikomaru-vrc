import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const PUBLIC_DIR = "public";
const SUPPORTED_FORMATS = [".png", ".jpg", ".jpeg", ".gif", ".bmp", ".tiff"];

async function convertImagesToWebP() {
    try {
        const files = getAllImageFiles(PUBLIC_DIR);

        for (const file of files) {
            await convertFileToWebP(file);
        }

        console.info("All images were converted to webp");
    } catch (error) {
        console.error("Error was occurred:", error);
    }
}

function getAllImageFiles(dir: string): string[] {
    const files: string[] = [];

    function scanDirectory(currentDir: string) {
        const items = fs.readdirSync(currentDir);

        for (const item of items) {
            const fullPath = path.join(currentDir, item);
            const stat = fs.statSync(fullPath);

            if (stat.isDirectory()) {
                scanDirectory(fullPath);
            } else if (stat.isFile()) {
                const ext = path.extname(item).toLowerCase();
                if (SUPPORTED_FORMATS.includes(ext)) {
                    files.push(fullPath);
                }
            }
        }
    }

    scanDirectory(dir);
    return files;
}

async function convertFileToWebP(filePath: string) {
    try {
        const dir = path.dirname(filePath);
        const name = path.basename(filePath, path.extname(filePath));
        const outputPath = path.join(dir, `${name}.webp`);

        if (fs.existsSync(outputPath)) {
            fs.unlinkSync(filePath);
            console.info(`Already converted: ${filePath}`);
            return;
        }

        await sharp(filePath).webp({ quality: 80 }).toFile(outputPath);

        const beforeSize = fs.statSync(filePath).size;
        const afterSize = fs.statSync(outputPath).size;

        fs.unlinkSync(filePath);
        console.info(
            `Converted: ${filePath} -> ${outputPath} ${beforeSize} -> ${afterSize} ${(beforeSize / afterSize) * 100}%`,
        );
    } catch (error) {
        console.error(`Error converting ${filePath}:`, error);
    }
}

convertImagesToWebP();
