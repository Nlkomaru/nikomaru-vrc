"use client";

import { useEffect, useState } from "react";
import {
    GREETING_SEQUENCE_DURATION_SEC,
    GreetingText,
} from "../../_component/greeting-text";
import { Navigation } from "./navigation";

export const HomeHeader = () => {
    const [showNavigation, setShowNavigation] = useState(false);

    useEffect(() => {
        const timeoutId = setTimeout(
            () => setShowNavigation(true),
            GREETING_SEQUENCE_DURATION_SEC * 1000,
        );

        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <div className="absolute top-1/8 left-1/8 text-left">
            <GreetingText />
            {showNavigation ? <Navigation /> : null}
        </div>
    );
};
