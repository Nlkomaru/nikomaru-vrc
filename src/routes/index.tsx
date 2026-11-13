import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { BgImage } from "@/components/home/bg-image";
import { HomeHeader } from "@/components/layout/home-header";

export const Route = createFileRoute("/")({
    component: HomePage,
});

function HomePage() {
    const [bgReady, setBgReady] = useState(false);

    return (
        <>
            <BgImage onLoaded={() => setBgReady(true)} />
            {bgReady ? <HomeHeader /> : null}
        </>
    );
}
