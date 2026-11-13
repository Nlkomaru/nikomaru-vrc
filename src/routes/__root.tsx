import {
    createRootRoute,
    HeadContent,
    Outlet,
    Scripts,
} from "@tanstack/react-router";
import type React from "react";
import { ThemeProvider } from "@/components/ui/theme-provider";
import appCss from "@/globals.css?url";

const SITE_TITLE = "Nikomaru - VRChat Activities and Experiences";
const SITE_DESCRIPTION =
    "A collection of VRChat activities and experiences by Nikomaru";
const SITE_URL = "https://vrc.nikomaru.dev";
const DEFAULT_OG_IMAGE =
    "https://vrc.nikomaru.dev/0197c5ed-de70-74fb-ad2c-7a6bb2c2240f.webp";

export const Route = createRootRoute({
    head: () => ({
        meta: [
            { charSet: "utf-8" },
            {
                name: "viewport",
                content: "width=device-width, initial-scale=1",
            },
            { title: SITE_TITLE },
            { name: "description", content: SITE_DESCRIPTION },
            { property: "og:title", content: SITE_TITLE },
            { property: "og:description", content: SITE_DESCRIPTION },
            { property: "og:url", content: SITE_URL },
            { property: "og:site_name", content: SITE_TITLE },
            { property: "og:image", content: DEFAULT_OG_IMAGE },
            { property: "og:locale", content: "ja_JP" },
            { property: "og:type", content: "website" },
        ],
        links: [
            { rel: "stylesheet", href: appCss },
            {
                rel: "preconnect",
                href: "https://fonts.googleapis.com",
            },
            {
                rel: "preconnect",
                href: "https://fonts.gstatic.com",
                crossOrigin: "anonymous",
            },
            {
                rel: "stylesheet",
                href: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Noto+Sans+JP:wght@400;500;600;700&family=Poppins:wght@200;300;400;500;600;700&display=swap",
            },
        ],
    }),
    shellComponent: RootDocument,
    component: RootComponent,
});

function RootDocument({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ja" suppressHydrationWarning>
            <head>
                <HeadContent />
            </head>
            <body className="min-h-screen bg-background antialiased font-sans">
                <ThemeProvider
                    attribute="class"
                    defaultTheme="light"
                    enableSystem={false}
                    disableTransitionOnChange
                >
                    {children}
                </ThemeProvider>
                <Scripts />
            </body>
        </html>
    );
}

function RootComponent() {
    return <Outlet />;
}
