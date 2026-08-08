import { env } from "cloudflare:workers";

const PORTFOLIO_TAG = "portfolio";

type PortfolioPhotoRow = {
    id: string;
    width: number;
    height: number;
    blurhash: string | null;
};

type PortfolioPhotoObjectRow = {
    objectKey: string;
};

export type PortfolioPhoto = Readonly<PortfolioPhotoRow>;

/** Lists only photos explicitly published to this site's portfolio. */
export async function listPortfolioPhotos(): Promise<PortfolioPhoto[]> {
    const result = await env.DRAGONFLY_DB.prepare(
        `SELECT p.id, p.width, p.height, p.blurhash
         FROM photos AS p
         INNER JOIN photo_tags AS pt ON pt.photo_id = p.id
         INNER JOIN tags AS t ON t.id = pt.tag_id
         WHERE t.name = ?
         ORDER BY p.taken_at DESC, p.id DESC`,
    )
        .bind(PORTFOLIO_TAG)
        .all<PortfolioPhotoRow>();

    return result.results;
}

/** Resolves an image object only while the corresponding photo keeps its portfolio tag. */
export async function getPortfolioPhotoObject(
    photoId: string,
    variant: "image" | "thumbnail",
): Promise<R2ObjectBody | null> {
    const photo = await env.DRAGONFLY_DB.prepare(
        `SELECT CASE WHEN ? = 'thumbnail' THEN COALESCE(p.thumb_key, p.r2_key) ELSE p.r2_key END AS objectKey
         FROM photos AS p
         INNER JOIN photo_tags AS pt ON pt.photo_id = p.id
         INNER JOIN tags AS t ON t.id = pt.tag_id
         WHERE p.id = ? AND t.name = ?
         LIMIT 1`,
    )
        .bind(variant, photoId, PORTFOLIO_TAG)
        .first<PortfolioPhotoObjectRow>();

    return photo ? env.DRAGONFLY_PHOTOS.get(photo.objectKey) : null;
}
