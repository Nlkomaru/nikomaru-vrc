"use client";

import { List } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { TOCContent } from "./toc-content";
import type { TOCProps } from "./toc-types";
import { useTOC } from "./use-toc";

/**
 * 目次（Table of Contents）コンポーネント
 * ページ内の見出しを自動検出し、クリック可能な目次を表示する
 * ボタンを押すとTOCカードが表示される
 */
export function TOC({ className }: TOCProps) {
    const [isVisible, setIsVisible] = useState(false); // TOCカードの表示/非表示状態
    const { headings, activeId, handleHeadingClick, isLoading } = useTOC();

    // 見出しが存在しない場合は何も表示しない
    if (!isLoading && headings.length === 0) {
        return null;
    }

    return (
        <div className={className}>
            {/* スマホ用のTOC表示ボタン */}
            <div className="lg:hidden mb-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsVisible(!isVisible)}
                    className="w-full"
                >
                    <List className="h-4 w-4 mr-2" />
                    目次を表示
                </Button>
            </div>

            {/* TOCカード（スマホ用：条件付き表示、デスクトップ用：常時表示） */}
            <div className={isVisible ? "block lg:block" : "hidden lg:block"}>
                {isLoading ? (
                    <Card className="md:w-[20rem] w-full">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-lg">
                                Table of Contents
                            </CardTitle>
                        </CardHeader>
                        <div className="px-6 pb-6">
                            <div className="space-y-2">
                                <Skeleton className="h-6 w-3/4" />
                                <Skeleton className="h-4 w-2/3" />
                            </div>
                        </div>
                    </Card>
                ) : (
                    <Card className="md:w-[20rem] w-full">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-lg">
                                Table of Contents
                            </CardTitle>
                        </CardHeader>
                        <TOCContent
                            headings={headings}
                            activeId={activeId}
                            onHeadingClick={handleHeadingClick}
                        />
                    </Card>
                )}
            </div>
        </div>
    );
}
