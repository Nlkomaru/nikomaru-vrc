import type React from "react";
import { Footer } from "@/components/organisms/footer";
import PastelBlobs from "@/components/organisms/pastel-blobs";
import { Header } from "./_components/header";

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
