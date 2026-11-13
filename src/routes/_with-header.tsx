import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/organisms/footer";
import PastelBlobs from "@/components/organisms/pastel-blobs";

export const Route = createFileRoute("/_with-header")({
    component: WithHeaderLayout,
});

function WithHeaderLayout() {
    return (
        <>
            <PastelBlobs />
            <Header />
            <main className="mx-auto max-w-7xl px-3 py-4 min-h-screen">
                <Outlet />
            </main>
            <Footer />
        </>
    );
}
