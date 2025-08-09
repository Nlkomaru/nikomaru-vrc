"use client";

import { useEffect, useState } from "react";
import { Title } from "./title";
import { Navigation } from "./navigation";
import { ANIMATION_TIMING } from "./animation-constants";

export const Header = () => {
    const [showNav, setShowNav] = useState(false);

    useEffect(() => {
        const totalDelayMs =
            (ANIMATION_TIMING.titleDurationSec + ANIMATION_TIMING.navAfterTitleGapSec) *
            1000;
        const id = setTimeout(() => setShowNav(true), totalDelayMs);
        return () => clearTimeout(id);
    }, []);

    return (
        <div className="absolute top-1/8 left-1/8 text-left">
            <Title />
            {showNav ? <Navigation /> : null}
        </div>
    );
};


