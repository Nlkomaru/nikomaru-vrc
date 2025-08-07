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
    description: "A blank template using Payload in a Next.js app.",
    title: "Payload Blank Template",
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
