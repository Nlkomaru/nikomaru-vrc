import { cloudflare } from "@cloudflare/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import { cdnAdapter } from "@vinext/cloudflare/cache/cdn-adapter";
import { defineConfig } from "vite";
import vinext from "vinext";

export default defineConfig({
    // react-notion-x が依存する CJS パッケージ (react-image など) の
    // default import を Vite 7 以前と同じ緩い解釈で扱う
    legacy: {
        inconsistentCjsInterop: true,
    },
    plugins: [
        // Tailwind CSS v4 は PostCSS 経由ではなく Vite プラグインとして読み込む
        tailwindcss(),
        // vinext auto-injects @mdx-js/rollup with plugins from next.config
        vinext({
            // ISR / ページキャッシュを Workers Cache (wrangler.jsonc の cache.enabled) に載せる
            cache: { cdn: cdnAdapter() },
        }),
        cloudflare({
            // Worker のエントリは RSC 環境で動き、SSR をその子環境として持つ
            viteEnvironment: {
                name: "rsc",
                childEnvironments: ["ssr"],
            },
        }),
    ],
});
