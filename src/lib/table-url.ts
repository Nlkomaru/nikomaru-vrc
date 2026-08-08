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
