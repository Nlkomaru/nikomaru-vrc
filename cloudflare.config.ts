import { bindings, defineConfig } from "cf/config";

export default defineConfig({
    worker: {
        name: "nikomaru-vrc",
        compatibilityDate: "2026-07-01",
        compatibilityFlags: ["nodejs_compat"],
        entrypoint: "./src/worker.ts",
        previewUrls: true,
        observability: {
            enabled: true,
        },
        domains: ["vrc.nikomaru.dev"],
        env: {
            TABLE_URL: bindings.secret(),
            DRAGONFLY_DB: bindings.d1({
                id: "6d3b4492-c258-4ade-b97d-50d73563ed5a",
            }),
            DRAGONFLY_PHOTOS: bindings.r2({
                name: "dragonfly-photos",
            }),
        },
    },
});
