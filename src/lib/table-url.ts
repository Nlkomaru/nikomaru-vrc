import { env } from "cloudflare:workers";

/**
 * Resolves the Notion table endpoint without allowing build-time local variables
 * to override the Worker Secret Store binding in deployed versions.
 */
export async function getTableUrl(): Promise<string> {
    if (process.env.NEXTJS_ENV === "development") {
        const localTableUrl = process.env.TABLE_URL;
        if (localTableUrl) {
            return localTableUrl;
        }
    }

    return env.TABLE_URL.get();
}

/**
 * Fetches the Notion table endpoint. TABLE_URL must point at the custom domain
 * (notion-api.nikomaru.dev), not the workers.dev host: a fetch from a preview
 * URL (workers.dev) to another workers.dev Worker fails with Cloudflare error
 * 1042.
 */
export async function fetchTable(): Promise<Response> {
    return fetch(await getTableUrl());
}
