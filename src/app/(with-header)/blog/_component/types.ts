export type PostMeta = {
    id: string;
    title: string;
    hidden?: boolean;
    created_at?: string;
    thumbnail?: {
        name: string;
        url: string;
        rawUrl?: string;
    }[];
    description?: string;
};
