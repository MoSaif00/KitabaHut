import { Button } from "@/components/ui/button";
import { FileIcon, PlusCircle } from "lucide-react";
import Link from "next/link";

interface emptyStateProps {
    title: string;
    description: string;
    buttonText: string;
    href: string;
}
export function EmptyState({ title, description, buttonText, href }: emptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-6 text-center animate-in fade-in-50 sm:p-8">
            <div className="flex size-16 items-center justify-center rounded-full bg-primary/10 sm:size-20">
                <FileIcon className="size-8 text-primary sm:size-10" />
            </div>
            <h2 className="mt-4 text-lg font-semibold sm:mt-6 sm:text-xl">{title}</h2>
            <p className="mx-auto mb-6 mt-3 max-w-sm text-center text-sm leading-relaxed text-muted-foreground sm:mb-8">
                {description}
            </p>
            <Button asChild className="w-full sm:w-auto">
                <Link href={href}>
                    <PlusCircle className="mr-2 size-4" />{buttonText}
                </Link>
            </Button>
        </div>
    );
}