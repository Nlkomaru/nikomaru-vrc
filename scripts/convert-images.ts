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

        await sharp(filePath)
            .webp({ lossless: true, quality: 100 })
            .toFile(outputPath);

        const beforeSize = fs.statSync(filePath).size;
        const afterSize = fs.statSync(outputPath).size;

        fs.unlinkSync(filePath);
        const rate = ((beforeSize - afterSize) / beforeSize) * 100;
        const beforeSizeMB = (beforeSize / 1024 / 1024).toFixed(2);
        const afterSizeMB = (afterSize / 1024 / 1024).toFixed(2);
        console.info(
            `Converted: ${filePath} -> ${outputPath} ${beforeSizeMB}MB -> ${afterSizeMB}MB ${rate.toFixed(2)}%`,
        );
    } catch (error) {
        console.error(`Error converting ${filePath}:`, error);
    }
}

convertImagesToWebP();
