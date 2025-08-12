"use client";

import { motion } from "motion/react";
import { ANIMATION_TIMING } from "./animation-constants";

export const FirstLetter = ({ input }: { input: string }) => {
    const upperLetter = input.toUpperCase();
    return (
        <div className="text-white text-2xl md:text-4xl first-letter:text-4xl first-letter:md:text-5xl">
            {upperLetter}
        </div>
    );
};

export const Title = () => {
    return (
        <motion.div
            className="flex flex-col gap-2 mt-8 text-2xl text-white font-['Montserrat']"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: ANIMATION_TIMING.titleDurationSec,
                ease: "easeOut",
            }}
        >
            <div className="flex gap-6">
                <FirstLetter input="Nikomaru" />
                <FirstLetter input="VRChat" />
            </div>
            <FirstLetter input="Footprints" />
        </motion.div>
    );
};
