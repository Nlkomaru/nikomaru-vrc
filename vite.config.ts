import { fileURLToPath, URL } from "node:url";
import { cloudflare } from "@cloudflare/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite-plus";

const ignorePatterns = [
    "**/src/routeTree.gen.ts",
    "**/.cloudflare/**",
    "**/.tanstack/**",
    "**/dist/**",
    "**/node_modules/**",
    "**/public/**",
    "**/src/components/ui/**",
    "**/cloudflare-env.d.ts",
    "**/worker-configuration.d.ts",
];

export default defineConfig({
    // react-notion-x が依存する CJS パッケージ (react-image など) の
    // default import を Vite 7 以前と同じ緩い解釈で扱う
    legacy: {
        inconsistentCjsInterop: true,
    },
    resolve: {
        tsconfigPaths: true,
        alias: {
            "^": fileURLToPath(new URL("./public", import.meta.url)),
        },
    },
    plugins: [
        cloudflare({ viteEnvironment: { name: "ssr" } }),
        tailwindcss(),
        tanstackStart({
            srcDirectory: "src",
        }),
        viteReact(),
    ],
    fmt: {
        useTabs: false,
        tabWidth: 4,
        printWidth: 80,
        singleQuote: false,
        ignorePatterns,
    },
    lint: {
        ignorePatterns,
    },
});
