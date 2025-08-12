import type React from "react";
import { Header } from "@/components/header";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            <div className="max-w-7xl mx-auto px-6 py-4">{children}</div>
        </>
    );
}
