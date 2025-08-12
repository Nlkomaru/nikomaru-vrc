// BibTeXエントリの型定義
export interface BibTeXEntry {
    type: string;
    id: string;
    author: string;
    title: string;
    publisher: string;
    year: string;
    URL: string;
    [key: string]: string;
}

// BibTeXのIDの型定義（自動生成される）
//start
export type BibTeXId = "R100000002-I026732388" | "R100000002-I029782896" | "R100000002-I030122788" | "R100000002-I031794026" | "R100000002-I033001065";
//end

// BibTeXテキストを解析する関数
export const parseBibTeX = (bibtexText: string): BibTeXEntry | null => {
    try {
        const cleanText = bibtexText.replace(/\s+/g, " ").trim();

        const match = cleanText.match(/@(\w+)\s*\{([^,]+),(.+)\}/);
        if (!match) {
            return null;
        }

        const [, type, id, fields] = match;

        const entry: BibTeXEntry = {
            type,
            id: id.trim(),
            author: "",
            title: "",
            publisher: "",
            year: "",
            URL: "",
        };

        // フィールドを解析
        const fieldRegex = /(\w+)\s*=\s*"([^"]+)"/g;
        let fieldMatch: RegExpExecArray | null;
        while (true) {
            fieldMatch = fieldRegex.exec(fields);
            if (fieldMatch === null) break;

            const [, key, value] = fieldMatch;
            entry[key] = value;
        }

        return entry;
    } catch (_error) {
        return null;
    }
};
