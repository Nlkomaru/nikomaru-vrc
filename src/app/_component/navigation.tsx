"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
    ANIMATION_TIMING,
    HOVER_DIM_DURATION_SEC,
    HOVER_DIM_OPACITY,
} from "./animation-constants";

export const Navigation = () => {
    // Define links to show in the navigation
    const links = ["photography", "blog", "about"] as const;

    // Track which link index is being hovered to dim others
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    // Number of links currently revealed (progressively increases)
    const [visibleCount, setVisibleCount] = useState<number>(0);

    // Reveal links one-by-one after the component mounts
    useEffect(() => {
        const intervalMs = ANIMATION_TIMING.navStaggerSec * 1000;
        const timeouts = links.map((_, index) =>
            setTimeout(
                () => setVisibleCount((prev) => Math.max(prev, index + 1)),
                index * intervalMs
            )
        );
        return () => {
            timeouts.forEach((id) => clearTimeout(id));
        };
    }, []);

    const visibleLinks = links.slice(0, visibleCount);

    return (
        <div className="flex flex-col mt-12 text-xl md:text-2xl text-white font-light w-fit">
            {visibleLinks.map((link, i) => (
                <motion.div
                    key={link}
                    initial={{ opacity: 0, y: 14 }}
                    animate={
                        hoveredIndex === null || hoveredIndex === i
                            ? {
                                  opacity: 1,
                                  y: 0,
                                  transition: {
                                      duration: ANIMATION_TIMING.navItemDurationSec,
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
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className="my-2 w-fit"
                >
                    <Link href={`/${link}`} className="w-full h-full">
                        {link.toUpperCase()}
                    </Link>
                </motion.div>
            ))}
        </div>
    );
};


