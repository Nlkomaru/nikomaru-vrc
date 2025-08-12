import * as React from "react";

import { cn } from "@/lib/utils";

const Card = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
    const cardRef = ref;
    return (
        <div
            ref={cardRef}
            className={cn(
                "rounded-lg border bg-card text-card-foreground shadow-sm",
                className,
            )}
            {...props}
        />
    );
});
Card.displayName = "Card";

const CardHeader = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
    const headerRef = ref;
    return (
        <div
            ref={headerRef}
            className={cn("flex flex-col space-y-1.5 p-6", className)}
            {...props}
        />
    );
});
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
    HTMLHeadingElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => {
    const titleRef = ref;
    return (
        <h3
            ref={titleRef}
            className={cn(
                "text-2xl font-semibold leading-none tracking-tight",
                className,
            )}
            {...props}
        />
    );
});
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
    const descriptionRef = ref;
    return (
        <p
            ref={descriptionRef}
            className={cn("text-sm text-muted-foreground", className)}
            {...props}
        />
    );
});
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
    const contentRef = ref;
    return (
        <div
            ref={contentRef}
            className={cn("p-6 pt-0", className)}
            {...props}
        />
    );
});
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
    const footerRef = ref;
    return (
        <div
            ref={footerRef}
            className={cn("flex items-center p-6 pt-0", className)}
            {...props}
        />
    );
});
CardFooter.displayName = "CardFooter";

export {
    Card,
    CardHeader,
    CardFooter,
    CardTitle,
    CardDescription,
    CardContent,
};
