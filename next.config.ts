import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    pageExtensions: ["ts", "tsx", "mdx"],
};

const withMDX = createMDX({
    // Add markdown plugins here, as desired
    extension: /\.(md|mdx)$/,
});

// Merge MDX config with Next.js config
export default withMDX({
    experimental: {
        mdxRs: {
            mdxType: "gfm",
        },
    },
    ...nextConfig,
});
