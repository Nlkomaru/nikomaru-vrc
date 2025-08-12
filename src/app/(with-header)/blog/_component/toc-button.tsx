import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { TOCItem } from "./toc-types";

interface TOCButtonProps {
    heading: TOCItem;
    isActive: boolean;
    onClick: (id: string) => void;
}

/**
 * TOCの各見出しボタンコンポーネント
 * 見出しのレベルに応じたスタイリングとクリック処理を行う
 */
export function TOCButton({ heading, isActive, onClick }: TOCButtonProps) {
    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={() => onClick(heading.id)}
            className={cn(
                "w-full justify-start h-auto py-1 px-2",
                isActive
                    ? "bg-accent text-accent-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground",
                // 見出しレベルに応じたスタイリング
                heading.level === 1 && "font-semibold text-base",
                heading.level === 2 && "ml-0 font-medium",
                heading.level === 3 && "ml-3 text-sm",
                heading.level === 4 && "ml-6 text-sm",
                heading.level === 5 && "ml-9 text-xs",
                heading.level === 6 && "ml-12 text-xs",
            )}
        >
            {heading.text}
        </Button>
    );
}
