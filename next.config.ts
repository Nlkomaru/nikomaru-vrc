import createMDX from "@next/mdx";
import type { NextConfig } from "next";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";

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
        ],
    },
};

const withMDX = createMDX({
    // Use classic MDX pipeline with remark plugins
    extension: /\.(md|mdx)$/,
    options: {
        remarkPlugins: [remarkGfm, remarkFrontmatter, remarkToc],
    },
});

// Merge MDX config with Next.js config
export default withMDX({
    ...nextConfig,
});
