import type { Metadata } from "next";
import type React from "react";
import "./globals.css";

import {
    JetBrains_Mono,
    Montserrat,
    Montserrat_Alternates,
    Noto_Sans_JP,
    Poppins,
} from "next/font/google";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { cn } from "@/lib/utils";

const notoSansJP = Noto_Sans_JP({
    subsets: ["latin"],
    variable: "--font-noto-sans-jp",
});

const poppins = Poppins({
    subsets: ["latin"],
    variable: "--font-poppins",
    weight: ["200", "300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    variable: "--font-jetbrains-mono",
    weight: ["400", "500", "600", "700"],
});

const montserrat = Montserrat({
    subsets: ["latin"],
    variable: "--font-montserrat",
    weight: ["400", "500", "600", "700"],
});

const montserratAlternates = Montserrat_Alternates({
    subsets: ["latin"],
    variable: "--font-montserrat-alternates",
    weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
    metadataBase: new URL("https://vrc.nikomaru.dev"),
    description:
        "A collection of VRChat activities and experiences by Nikomaru",
    title: "Nikomaru - VRChat Activities and Experiences",
    openGraph: {
        title: "Nikomaru - VRChat Activities and Experiences",
        description:
            "A collection of VRChat activities and experiences by Nikomaru",
        url: "https://vrc.nikomaru.dev",
        siteName: "Nikomaru - VRChat Activities and Experiences",
        images: [
            {
                url: "/0197c5ed-de70-74fb-ad2c-7a6bb2c2240f.webp",
                width: 1920,
                height: 1080,
                alt: "Nikomaru - VRChat Activities and Experiences",
            },
        ],
        locale: "ja_JP",
        type: "website",
    },
};

export default async function RootLayout(props: { children: React.ReactNode }) {
    const { children } = props;

    return (
        <html lang="ja" suppressHydrationWarning>
            <body
                className={cn(
                    "min-h-screen bg-background antialiased font-sans",
                    poppins.variable,
                    notoSansJP.variable,
                    jetbrainsMono.variable,
                    montserrat.variable,
                    montserratAlternates.variable,
                )}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="light"
                    enableSystem={false}
                    disableTransitionOnChange
                >
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
