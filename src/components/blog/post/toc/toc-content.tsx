import { CardContent } from "@/components/ui/card";
import { TOCButton } from "./toc-button";
import type { TOCItem } from "./toc-types";

interface TOCContentProps {
    headings: TOCItem[];
    activeId: string;
    onHeadingClick: (id: string) => void;
}

/**
 * TOCのコンテンツ部分コンポーネント
 * 見出しリストを表示する
 */
export function TOCContent({
    headings,
    activeId,
    onHeadingClick,
}: TOCContentProps) {
    return (
        <CardContent>
            <nav className="space-y-1">
                <ul className="space-y-1">
                    {headings.map((heading) => (
                        <li key={heading.id}>
                            <TOCButton
                                heading={heading}
                                isActive={activeId === heading.id}
                                onClick={onHeadingClick}
                            />
                        </li>
                    ))}
                </ul>
            </nav>
        </CardContent>
    );
}
