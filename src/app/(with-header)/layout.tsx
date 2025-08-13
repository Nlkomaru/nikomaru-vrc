import type React from "react";
import { Footer } from "@/components/organisms/footer";
import { Header } from "@/components/organisms/header";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 max-w-7xl mx-auto px-6 py-4">
                {children}
            </main>
            <Footer />
        </div>
    );
}
