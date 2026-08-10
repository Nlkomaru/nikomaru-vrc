"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAVIGATION_LINKS = ["photography", "blog", "about"] as const;

// 表示名だけを短くする。遷移先は /photography のまま。
const NAVIGATION_LABELS: Record<(typeof NAVIGATION_LINKS)[number], string> = {
    photography: "PHOTO",
    blog: "BLOG",
    about: "ABOUT",
};

export const HeaderNavigation = () => {
    const pathname = usePathname();

    return (
        <nav
            aria-label="メインナビゲーション"
            className="flex items-center gap-6 text-lg text-gray-700 md:gap-8"
        >
            {NAVIGATION_LINKS.map((link) => {
                const isActive =
                    pathname === `/${link}` || pathname.startsWith(`/${link}/`);

                return (
                    <Link
                        key={link}
                        href={`/${link}`}
                        className="relative block pb-1 transition-colors hover:text-gray-900"
                    >
                        {NAVIGATION_LABELS[link]}
                        {isActive ? (
                            <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-sm bg-current" />
                        ) : null}
                    </Link>
                );
            })}
        </nav>
    );
};
