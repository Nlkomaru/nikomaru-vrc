"use client";

import { useState } from "react";
import { BgImage } from "./_component/bg-image";
import { Header } from "./_component/header";

export default function Home() {
    const [bgReady, setBgReady] = useState(false);
    return (
        <>
            <BgImage onLoaded={() => setBgReady(true)} />
            {bgReady ? <Header /> : null}
        </>
    );
}
