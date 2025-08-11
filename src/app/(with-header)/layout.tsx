import type React from "react";
import { Header } from "@/components/header";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            <div className="max-w-[1440px] mx-auto">{children}</div>
        </>
    );
}
