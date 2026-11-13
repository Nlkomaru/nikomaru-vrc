// TOCコンポーネントで使用する型定義
export interface TOCItem {
    id: string;
    text: string;
    level: number;
}

export interface TOCProps {
    className?: string;
}
