"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import {
    GREETING_MESSAGE_DURATION_SEC,
    type Greeting,
    GreetingMessage,
} from "./greeting-message";
import {
    PROFILE_DESCRIPTION_DURATION_SEC,
    ProfileDescription,
} from "./profile-description";

const GREETING_DURATION_SEC = 1;

export const GREETING_SEQUENCE_DURATION_SEC =
    GREETING_MESSAGE_DURATION_SEC + PROFILE_DESCRIPTION_DURATION_SEC;

const getGreeting = (hour: number): Greeting => {
    if (hour >= 5 && hour < 12) {
        return "おはようございます";
    }

    if (hour >= 12 && hour < 18) {
        return "こんにちは";
    }

    return "こんばんは";
};

export const GreetingText = () => {
    const [greeting, setGreeting] = useState<Greeting | null>(null);

    useEffect(() => {
        setGreeting(getGreeting(new Date().getHours()));
    }, []);

    return (
        <motion.div
            className="mt-8 flex flex-col gap-2 text-2xl text-white"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: GREETING_DURATION_SEC,
                ease: "easeOut",
            }}
        >
            {greeting ? (
                <div className="flex flex-col gap-2">
                    <GreetingMessage greeting={greeting} />
                    <ProfileDescription
                        delaySec={GREETING_MESSAGE_DURATION_SEC}
                    />
                </div>
            ) : null}
        </motion.div>
    );
};
