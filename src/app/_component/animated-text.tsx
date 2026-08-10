"use client";

import { motion } from "motion/react";

export const CHARACTER_REVEAL = {
    durationSec: 0.4,
    staggerSec: 0.075,
};

type AnimatedTextProps = {
    text: string;
    delaySec?: number;
};

const characterMotion = {
    hidden: { opacity: 0, y: 8 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: CHARACTER_REVEAL.durationSec,
            ease: "easeOut" as const,
        },
    },
};

export const AnimatedText = ({ text, delaySec = 0 }: AnimatedTextProps) => {
    const characterCounts = new Map<string, number>();

    return (
        <motion.span
            aria-hidden="true"
            className="inline-flex"
            initial="hidden"
            animate="show"
            variants={{
                hidden: { opacity: 1 },
                show: {
                    opacity: 1,
                    transition: {
                        delayChildren: delaySec,
                        staggerChildren: CHARACTER_REVEAL.staggerSec,
                    },
                },
            }}
        >
            {Array.from(text).map((character) => {
                const count = characterCounts.get(character) ?? 0;
                characterCounts.set(character, count + 1);

                return (
                    <motion.span
                        key={`${character}-${count}`}
                        variants={characterMotion}
                    >
                        {character}
                    </motion.span>
                );
            })}
        </motion.span>
    );
};
