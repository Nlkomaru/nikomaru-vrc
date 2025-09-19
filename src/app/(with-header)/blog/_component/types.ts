export type PostMeta = {
    id: string;
    title: string;
    slug: string;
    status?: string;
    created_at?: string;
    thumbnail?: {
        name: string;
        url: string;
    }[];
    description?: string;
};
