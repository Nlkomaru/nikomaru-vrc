import { useEffect, useState } from "react";
import type { TOCItem } from "./toc-types";

/**
 * TOCコンポーネントのロジックを管理するカスタムフック
 * 見出しの取得、アクティブ状態の管理、スクロール処理を行う
 */
export function useTOC() {
    const [headings, setHeadings] = useState<TOCItem[]>([]);
    const [activeId, setActiveId] = useState<string>("");

    useEffect(() => {
        // DOMの準備が完了するまで少し待つ
        const timer = setTimeout(() => {
            // markdownコンテンツエリア内の見出し要素のみを取得してTOCアイテムを作成
            // proseクラスを持つコンテナ内の見出しのみを対象とする
            const contentContainer = document.querySelector(".prose");

            if (!contentContainer) {
                setHeadings([]);
                return;
            }

            const headingElements =
                contentContainer.querySelectorAll("h1, h2, h3, h4");

            const tocItems: TOCItem[] = Array.from(headingElements).map(
                (element) => {
                    const id =
                        element.id ||
                        element.textContent
                            ?.toLowerCase()
                            .replace(/\s+/g, "-") ||
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
                            targetElement.scrollIntoView({
                                behavior: "smooth",
                            });
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

            // クリーンアップ関数を設定
            return () => {
                observer.disconnect();
                window.removeEventListener("hashchange", handleHashChange);
            };
        }, 500); // 500ms待つ

        return () => clearTimeout(timer);
    }, []); // 依存配列を空にして、初回のみ実行

    /**
     * 見出しクリック時の処理
     * スクロールとURL更新を行う
     */
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

    return {
        headings,
        activeId,
        handleHeadingClick,
    };
}
