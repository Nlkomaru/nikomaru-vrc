"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { type BibTeXEntry, type BibTeXId, parseBibTeX } from "@/types/bibtex";

export const Bibtex = ({ id }: { id: BibTeXId }) => {
    const [parsedEntry, setParsedEntry] = useState<BibTeXEntry | null>(null);

    useEffect(() => {
        fetch(`/bibtex/${id}.bib`)
            .then((response) => {
                return response.text();
            })
            .then((text) => {
                const parsed = parseBibTeX(text);
                setParsedEntry(parsed);
            });
    }, [id]);

    if (!parsedEntry) {
        return (
            <div className="text-sm text-muted-foreground">読み込み中...</div>
        );
    }

    return (
        <Link
            href={parsedEntry.URL}
            className="text-md underline underline-offset-4 decoration-dashed decoration-primary "
        >
            {parsedEntry.title}, {parsedEntry.author}, {parsedEntry.publisher},{" "}
            {parsedEntry.year}
        </Link>
    );
};
