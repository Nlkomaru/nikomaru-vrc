"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

// ナビゲーションリンクの配列
type NavLink = {
    label: string;
    href: string;
};

const navLinks: NavLink[] = [
    { label: "photo", href: "/photography" },
    { label: "blog", href: "/blog" },
    { label: "about", href: "/about" },
];

/**
 * ナビゲーションバーコンポーネント
 * デスクトップヘッダーで使用されるナビゲーションリンクを表示
 * 統一感のあるグレーベースのスタイルとsmoothなアニメーション
 */
export const Navbar = () => {
    const pathname = usePathname();
    return (
        <nav>
            <ul className="flex gap-16 text-lg">
                {navLinks.map((link) => {
                    const isActive = pathname === link.href;
                    const halfActive = pathname.startsWith(link.href);
                    return (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                className={`
                                    relative pb-1 transition-colors duration-200
                                    ${
                                        isActive
                                            ? "text-gray-900"
                                            : "text-gray-500 hover:text-gray-800"
                                    }
                                `}
                            >
                                {link.label.charAt(0).toUpperCase() +
                                    link.label.slice(1)}

                                {/* 統一感のあるアンダーライン */}
                                {(isActive || halfActive) && (
                                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-400 px-5 rounded-sm" />
                                )}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};
