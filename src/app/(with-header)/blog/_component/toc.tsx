"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface TOCItem {
    id: string;
    text: string;
    level: number;
}

interface TOCProps {
    className?: string;
}

export function TOC({ className }: TOCProps) {
    const [headings, setHeadings] = useState<TOCItem[]>([]);
    const [activeId, setActiveId] = useState<string>("");

    useEffect(() => {
        // ページ内の見出し要素を取得してTOCアイテムを作成
        const headingElements = document.querySelectorAll("h1, h2, h3, h4");
        const tocItems: TOCItem[] = Array.from(headingElements).map(
            (element) => {
                const id =
                    element.id ||
                    element.textContent?.toLowerCase().replace(/\s+/g, "-") ||
                    "";
                const text = element.textContent || "";
                const level = Number.parseInt(element.tagName.charAt(1));

                // IDが重複しないようにする
                if (!element.id) {
                    element.id = id;
                }

                return { id, text, level };
            },
        );

        setHeadings(tocItems);

        // ページ読み込み時にハッシュフラグメントを処理
        const handleHashFragment = () => {
            const hash = window.location.hash.slice(1); // #を除去
            if (hash) {
                const targetElement = document.getElementById(hash);
                if (targetElement) {
                    // 少し遅延させてからスクロール（DOMの準備が完了してから）
                    setTimeout(() => {
                        targetElement.scrollIntoView({ behavior: "smooth" });
                        setActiveId(hash);
                    }, 100);
                }
            }
        };

        // 初回読み込み時のハッシュフラグメント処理
        handleHashFragment();

        // Intersection Observerで現在表示されている見出しを監視
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            {
                rootMargin: "-20% 0px -80% 0px",
                threshold: 0,
            },
        );

        headingElements.forEach((element) => observer.observe(element));

        // ハッシュフラグメントの変更を監視
        const handleHashChange = () => {
            handleHashFragment();
        };

        window.addEventListener("hashchange", handleHashChange);

        return () => {
            observer.disconnect();
            window.removeEventListener("hashchange", handleHashChange);
        };
    }, []);

    const handleHeadingClick = (id: string) => {
        // 見出しまでスクロール
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }

        // URLを更新してリンクとして機能させる
        const url = new URL(window.location.href);
        url.hash = id;
        window.history.pushState({}, "", url.toString());
        setActiveId(id);
    };

    if (headings.length === 0) {
        return null;
    }

    return (
        <Card className={className}>
            <CardHeader className="pb-3">
                <CardTitle className="text-lg">目次</CardTitle>
            </CardHeader>
            <CardContent>
                <nav className="space-y-1">
                    <ul className="space-y-1">
                        {headings.map((heading) => (
                            <li key={heading.id}>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() =>
                                        handleHeadingClick(heading.id)
                                    }
                                    className={cn(
                                        "w-full justify-start h-auto py-1 px-2",
                                        activeId === heading.id
                                            ? "bg-accent text-accent-foreground font-medium"
                                            : "text-muted-foreground hover:text-foreground",
                                        heading.level === 1 &&
                                            "font-semibold text-base",
                                        heading.level === 2 &&
                                            "ml-0 font-medium",
                                        heading.level === 3 && "ml-3 text-sm",
                                        heading.level === 4 && "ml-6 text-sm",
                                        heading.level === 5 && "ml-9 text-xs",
                                        heading.level === 6 && "ml-12 text-xs",
                                    )}
                                >
                                    {heading.text}
                                </Button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </CardContent>
        </Card>
    );
}
