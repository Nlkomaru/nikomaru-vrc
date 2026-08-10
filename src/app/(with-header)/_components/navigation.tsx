"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
    ANIMATION_TIMING,
    HOVER_DIM_DURATION_SEC,
    HOVER_DIM_OPACITY,
} from "./animation-constants";

const NAVIGATION_LINKS = ["photography", "blog", "about"] as const;

// 表示名だけを短くする。遷移先は /photography のまま。
const NAVIGATION_LABELS: Record<(typeof NAVIGATION_LINKS)[number], string> = {
    photography: "PHOTO",
    blog: "BLOG",
    about: "ABOUT",
};

export const Navigation = () => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [visibleCount, setVisibleCount] = useState(0);

    useEffect(() => {
        const timeouts = NAVIGATION_LINKS.map((_, index) =>
            setTimeout(
                () => setVisibleCount((count) => Math.max(count, index + 1)),
                index * ANIMATION_TIMING.navStaggerSec * 1000,
            ),
        );

        return () => {
            timeouts.forEach((timeoutId) => {
                clearTimeout(timeoutId);
            });
        };
    }, []);

    return (
        <nav
            aria-label="メインナビゲーション"
            className="mt-12 flex w-fit flex-col text-xl font-light text-white md:text-2xl"
        >
            {NAVIGATION_LINKS.slice(0, visibleCount).map((link, index) => (
                <motion.div
                    key={link}
                    initial={{ opacity: 0, y: 14 }}
                    animate={
                        hoveredIndex === null || hoveredIndex === index
                            ? {
                                  opacity: 1,
                                  y: 0,
                                  transition: {
                                      duration:
                                          ANIMATION_TIMING.navItemDurationSec,
                                      ease: "easeOut",
                                  },
                              }
                            : {
                                  opacity: HOVER_DIM_OPACITY,
                                  y: 0,
                                  transition: {
                                      duration: HOVER_DIM_DURATION_SEC,
                                      ease: "easeOut",
                                  },
                              }
                    }
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className="my-2 w-fit"
                >
                    <Link href={`/${link}`} className="block">
                        {NAVIGATION_LABELS[link]}
                    </Link>
                </motion.div>
            ))}
        </nav>
    );
};
