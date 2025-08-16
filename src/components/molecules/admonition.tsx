"use client";

import {
    OctagonAlert as DangerIcon,
    Info as InfoIcon,
    NotebookText as NoteIcon,
    CheckCircle2 as SuccessIcon,
    Lightbulb as TipIcon,
    AlertTriangle as WarningIcon,
} from "lucide-react";
import type React from "react";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type AdmonitionType =
    | "note"
    | "tip"
    | "info"
    | "warning"
    | "danger"
    | "success";

type AdmonitionProps = React.HTMLAttributes<HTMLDivElement> & {
    /**
     * Visual style and semantics for the admonition
     */
    type?: AdmonitionType;
    /**
     * Optional heading displayed at the top-left of the box
     */
    title?: string;
};

const TYPE_TO_STYLES: Record<AdmonitionType, string> = {
    // Light background with border and readable foreground in both themes
    note: "border-blue-200 dark:border-blue-900/40 bg-blue-50/70 dark:bg-blue-950/30 text-blue-900 dark:text-blue-100",
    tip: "border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/70 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-100",
    info: "border-sky-200 dark:border-sky-900/40 bg-sky-50/70 dark:bg-sky-950/30 text-sky-900 dark:text-sky-100",
    warning:
        "border-amber-200 dark:border-amber-900/40 bg-amber-50/70 dark:bg-amber-950/30 text-amber-900 dark:text-amber-100",
    danger: "border-red-200 dark:border-red-900/40 bg-red-50/70 dark:bg-red-950/30 text-red-900 dark:text-red-100",
    success:
        "border-green-200 dark:border-green-900/40 bg-green-50/70 dark:bg-green-950/30 text-green-900 dark:text-green-100",
};

const TYPE_TO_ICON: Record<
    AdmonitionType,
    React.ComponentType<{
        className?: string;
    }>
> = {
    note: NoteIcon,
    tip: TipIcon,
    info: InfoIcon,
    warning: WarningIcon,
    danger: DangerIcon,
    success: SuccessIcon,
};

/**
 * Admonition
 * A callout box for notes, tips, warnings, etc., optimized for MDX usage.
 */
export const Admonition = forwardRef<HTMLDivElement, AdmonitionProps>(
    ({ type = "note", title, className, children, ...rest }, ref) => {
        const Icon = TYPE_TO_ICON[type];

        // Map severe types to an appropriate ARIA role
        const role = type === "warning" || type === "danger" ? "alert" : "note";

        return (
            <div
                // biome-ignore lint/style/noParameterAssign: forwardRefの標準的なパターン
                ref={ref}
                role={role}
                {...(role === "alert" && { "aria-label": title ?? type })}
                className={cn(
                    "not-prose w-full border rounded-md px-4 py-3 my-4 flex gap-3",
                    "shadow-sm",
                    TYPE_TO_STYLES[type],
                    className,
                )}
                {...rest}
            >
                <div className="mt-0.5">
                    <Icon className="size-5 opacity-90" />
                </div>
                <div className="min-w-0">
                    {title ? (
                        <div className="font-semibold leading-6 mb-1">
                            {title}
                        </div>
                    ) : null}
                    <div className="text-sm leading-relaxed">{children}</div>
                </div>
            </div>
        );
    },
);
Admonition.displayName = "Admonition";

// Convenience wrappers for MDX ergonomics
export function Note(props: Omit<AdmonitionProps, "type">) {
    return <Admonition type="note" {...props} />;
}
export function Tip(props: Omit<AdmonitionProps, "type">) {
    return <Admonition type="tip" {...props} />;
}
export function Info(props: Omit<AdmonitionProps, "type">) {
    return <Admonition type="info" {...props} />;
}
export function Warning(props: Omit<AdmonitionProps, "type">) {
    return <Admonition type="warning" {...props} />;
}
export function Danger(props: Omit<AdmonitionProps, "type">) {
    return <Admonition type="danger" {...props} />;
}
export function Success(props: Omit<AdmonitionProps, "type">) {
    return <Admonition type="success" {...props} />;
}

export type { AdmonitionProps };
