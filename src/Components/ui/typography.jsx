import * as React from "react"
import { cn } from "@/lib/utils"

export function TypographyH1({ className, ...props }) {
    return (
        <h1
            className={cn(
                "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
                className
            )}
            {...props}
        />
    )
}

export function TypographyH2({ className, ...props }) {
    return (
        <h2
            className={cn(
                "scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0",
                className
            )}
            {...props}
        />
    )
}

export function TypographyH3({ className, ...props }) {
    return (
        <h3
            className={cn(
                "scroll-m-20 text-2xl font-semibold tracking-tight",
                className
            )}
            {...props}
        />
    )
}

export function TypographyP({ className, ...props }) {
    return (
        <p
            className={cn("leading-7 [&:not(:first-child)]:mt-4", className)}
            {...props}
        />
    )
}
