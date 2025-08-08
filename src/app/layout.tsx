import type React from "react";
import "./globals.css";

import { JetBrains_Mono, Poppins, Zen_Kaku_Gothic_New } from "next/font/google";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { cn } from "@/lib/utils";

const zenKakuGothicNew = Zen_Kaku_Gothic_New({
    subsets: ["latin"],
    variable: "--font-zen-kaku-gothic-new",
    weight: ["500", "700"],
});

const poppins = Poppins({
    subsets: ["latin"],
    variable: "--font-poppins",
    weight: ["400", "500"],
});

const jetbrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    variable: "--font-jetbrains-mono",
    weight: ["400", "500", "600", "700"],
});

export const metadata = {
    description:
        "A collection of VRChat activities and experiences by Nikomaru",
    title: "Nikomaru - VRChat Activities and Experiences",
    openGraph: {
        title: "Nikomaru - VRChat Activities and Experiences",
        description:
            "A collection of VRChat activities and experiences by Nikomaru",
        url: "https://vrc.nikomaru.com",
        siteName: "Nikomaru - VRChat Activities and Experiences",
        images: [
            {
                url: "https://scorpioides.nikomaru.dev/0197c5ed-de70-74fb-ad2c-7a6bb2c2240f.png",
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
                    zenKakuGothicNew.variable,
                    jetbrainsMono,
                )}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem={false}
                    disableTransitionOnChange
                >
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
