"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * 常に右下に固定表示される「一番上に戻る」ボタンコンポーネント
 * スクロール位置に応じて表示/非表示を制御する
 */
export function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // スクロール位置を監視して、ボタンの表示/非表示を制御
        const toggleVisibility = () => {
            // 300px以上スクロールしたら表示
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);

        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    /**
     * 一番上にスクロールする処理
     */
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <Button
            variant="default"
            size="icon"
            onClick={scrollToTop}
            className={cn(
                "fixed bottom-6 right-6 z-50 rounded-full shadow-lg transition-all duration-300 ease-in-out",
                isVisible
                    ? "opacity-80 scale-100 bg-gray-500 size-10"
                    : "opacity-0 scale-75 pointer-events-none",
                "hover:scale-110 active:scale-95",
            )}
            aria-label="一番上に戻る"
        >
            <ArrowUp className="size-6" />
        </Button>
    );
}
