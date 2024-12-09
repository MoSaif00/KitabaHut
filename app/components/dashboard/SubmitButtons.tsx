"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";
import { useFormStatus } from "react-dom";

interface buttonProps {
    text: string;
    className?: string;
    variant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined;
}
export function SubmitButton({ text, className, variant }: buttonProps) {
    const { pending } = useFormStatus();
    return (
        <>
            {pending ? (
                <Button
                    disabled
                    className={cn('w-fit', className)}
                    variant={variant}
                    type="submit"
                >
                    <Loader className="mr-2 size-4 animate-spin" /> Loading...
                </Button>
            ) : (
                <Button
                    className={cn('w-fit', className)}
                    variant={variant}
                    type="submit"
                >
                    {text}
                </Button>
            )}
        </>
    );
}