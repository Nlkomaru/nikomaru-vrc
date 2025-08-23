"use client";

import { faker } from "@faker-js/faker";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

// PastelBlobs renders multiple softly animated, pastel-colored blobs.
// The arrangement is deterministic per pathname so each route has its own look
// while remaining stable across renders and sessions.
// Uses fixed positioning to stay in viewport regardless of page height.
export const PastelBlobs = () => {
    // Get pathname to derive a deterministic random seed per path
    const pathname = usePathname().split("/")[1] ?? "/";

    // Build blob specs using faker's deterministic randomness per path
    const blobs = useMemo(() => {
        // Set faker seed based on pathname for consistent results per route
        faker.seed(
            pathname.length + pathname.charCodeAt(0) + pathname.charCodeAt(1),
        );

        // Palette of soft Tailwind colors with transparency
        // Number of blobs: 5-9 depending on seed
        const count = faker.number.int({ min: 12, max: 20 });
        const items: Array<{
            key: string;
            topPercent: number;
            leftPercent: number;
            sizePx: number;
            colorClass: string;
            durationSec: number;
            xKey: number[];
            yKey: number[];
            scaleKey: number[];
        }> = [];

        for (let i = 0; i < count; i += 1) {
            // Position within viewport bounds, allow slight overflow for softness
            const top = faker.number.float({ min: -10, max: 110 }); // -10% to 110%
            const left = faker.number.float({ min: -10, max: 120 }); // -10% to 120%

            // Size: 180px - 380px
            const size = faker.number.int({ min: 180, max: 280 });

            // Color: pick from palette
            const color = `oklch(0.88 0.15 ${faker.number.int({ min: 0, max: 360 })} / 0.25)`;
            // const color = faker.helpers.arrayElement(colorClasses);

            // Motion parameters
            const amp = 8 + (size / 380) * 24; // movement amplitude scales with size
            const xKey = [0, amp, -amp * 0.5, 0];
            const yKey = [0, -amp * 0.6, amp * 0.4, 0];
            const scaleKey = [
                1,
                1 + faker.number.float({ min: 0, max: 0.06 }),
                0.98 + faker.number.float({ min: 0, max: 0.03 }),
                1,
            ];
            const duration = faker.number.float({ min: 12, max: 20 }); // 12s - 20s

            items.push({
                key: `${pathname}-blob-${i}`,
                topPercent: top,
                leftPercent: left,
                sizePx: size,
                colorClass: color,
                durationSec: duration,
                xKey,
                yKey,
                scaleKey,
            });
        }

        return items;
    }, [pathname]);

    return (
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
            {blobs.map((b) => (
                <div
                    key={b.key}
                    className={"absolute rounded-full blur-2xl"}
                    style={{
                        top: `${b.topPercent}%`,
                        left: `${b.leftPercent}%`,
                        width: `${b.sizePx}px`,
                        height: `${b.sizePx}px`,
                        backgroundColor: b.colorClass,
                    }}
                />
            ))}
        </div>
    );
};

export default PastelBlobs;
