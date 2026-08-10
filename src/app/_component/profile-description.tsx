"use client";

import { motion } from "motion/react";

export const PROFILE_DESCRIPTION_DURATION_SEC = 0.4;

type ProfileDescriptionProps = {
    delaySec: number;
};

export const ProfileDescription = ({ delaySec }: ProfileDescriptionProps) => (
    <motion.p
        className="text-lg font-normal"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
            duration: PROFILE_DESCRIPTION_DURATION_SEC,
            delay: delaySec,
            ease: "easeOut",
        }}
        style={{ color: "rgba(255, 255, 255, 0.8)" }}
    >
        Full Stack Developer ・ Designer ・ Photographer
    </motion.p>
);
