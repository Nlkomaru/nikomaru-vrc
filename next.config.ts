import createMDX from "@next/mdx";
import type { NextConfig } from "next";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";

const nextConfig: NextConfig = {
    /* config options here */
    pageExtensions: ["ts", "tsx", "mdx"],
};

const withMDX = createMDX({
    // Use classic MDX pipeline with remark plugins
    extension: /\.(md|mdx)$/,
    options: {
        remarkPlugins: [remarkGfm, remarkFrontmatter],
    },
});

// Merge MDX config with Next.js config
export default withMDX({
    ...nextConfig,
});
