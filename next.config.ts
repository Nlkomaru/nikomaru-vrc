import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    pageExtensions: ["ts", "tsx", "mdx"],
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "loremflickr.com",
            },
            {
                protocol: "https",
                hostname: "picsum.photos",
            },
            {
                protocol: "https",
                hostname: "www.notion.so",
            },
        ],
    },
};

export default nextConfig;
