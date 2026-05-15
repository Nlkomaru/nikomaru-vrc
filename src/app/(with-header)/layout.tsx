import type React from "react";
import { Footer } from "@/components/organisms/footer";
import { Header } from "@/components/organisms/header";
import PastelBlobs from "@/components/organisms/pastel-blobs";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <PastelBlobs />
            <Header />
            <main className="mx-auto max-w-7xl px-8 py-4 min-h-screen">
                {children}
            </main>
            <Footer />
        </>
    );
}
