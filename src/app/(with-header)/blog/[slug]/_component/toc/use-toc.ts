import { useEffect, useState } from "react";
import type { TOCItem } from "./toc-types";

/**
 * TOCコンポーネントのロジックを管理するカスタムフック
 * 見出しの取得、アクティブ状態の管理、スクロール処理を行う
 */
export function useTOC() {
    const [headings, setHeadings] = useState<TOCItem[]>([]);
    const [activeId, setActiveId] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        // DOMの準備が完了するまで少し待つ
        const timer = setTimeout(() => {
            // notion-hash-linkを持つアンカーからTOCを生成
            const contentContainer = document.querySelector(".prose");
            if (!contentContainer) {
                setHeadings([]);
                setIsLoading(false);
                return;
            }
            // notion-hash-linkを全て取得
            const anchorElements =
                contentContainer.querySelectorAll("a.notion-hash-link");
            const tocItems: TOCItem[] = Array.from(anchorElements)
                .map((anchor) => {
                    // 親のnotion-h（notion-h1, notion-h2, ...）を取得
                    const parent = anchor.closest<HTMLElement>(".notion-h");
                    if (!parent) return null;
                    // レベルをクラス名から判定
                    let level = 1;
                    if (parent.classList.contains("notion-h1")) level = 1;
                    else if (parent.classList.contains("notion-h2")) level = 2;
                    else if (parent.classList.contains("notion-h3")) level = 3;
                    else if (parent.classList.contains("notion-h4")) level = 4;
                    // notion-h-titleからテキスト取得
                    const titleEl =
                        parent.querySelector<HTMLElement>(".notion-h-title");
                    const text = titleEl?.innerText || parent.textContent || "";
                    // idはhrefの#以降
                    const href = anchor.getAttribute("href") || "";
                    const id = href.startsWith("#") ? href.slice(1) : href;
                    return { id, text, level };
                })
                .filter(Boolean) as TOCItem[];
            setHeadings(tocItems);
            setIsLoading(false);

            // ページ読み込み時にハッシュフラグメントを処理
            const handleHashFragment = () => {
                const hash = window.location.hash.slice(1); // #を除去
                if (hash) {
                    const targetElement = document.getElementById(hash);
                    if (targetElement) {
                        setTimeout(() => {
                            // notion-header-anchorの上に60px余白を確保してスクロール
                            const y =
                                targetElement.getBoundingClientRect().top +
                                window.scrollY -
                                60;
                            window.scrollTo({ top: y, behavior: "smooth" });
                            setActiveId(hash);
                        }, 100);
                    }
                }
            };
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
            // notion-header-anchor（id付きdiv）を監視対象に
            const anchorDivs = contentContainer.querySelectorAll<HTMLElement>(
                ".notion-header-anchor[id]",
            );
            anchorDivs.forEach((el) => {
                observer.observe(el);
            });


            // ハッシュフラグメントの変更を監視
            const handleHashChange = () => {
                handleHashFragment();
            };
            window.addEventListener("hashchange", handleHashChange);

            // クリーンアップ関数
            return () => {
                observer.disconnect();
                window.removeEventListener("hashchange", handleHashChange);
            };
        }, 500); // 500ms待つ
        return () => clearTimeout(timer);
    }, []);

    /**
     * 見出しクリック時の処理
     * スクロールとURL更新を行う
     */
    const handleHeadingClick = (id: string) => {
        // notion-header-anchor（id付きdiv）までスクロール
        const element = document.getElementById(id);
        if (element) {
            const y =
                element.getBoundingClientRect().top + window.scrollY - 630;
            window.scrollTo({ top: y, behavior: "smooth" });
        }
        // URLを更新してリンクとして機能させる
        const url = new URL(window.location.href);
        url.hash = id;
        window.history.pushState({}, "", url.toString());
        setActiveId(id);
    };

    return {
        headings,
        activeId,
        handleHeadingClick,
        isLoading,
    };
}
