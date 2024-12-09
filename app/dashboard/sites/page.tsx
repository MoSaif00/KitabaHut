import { Button } from "@/components/ui/button";
import { FileIcon, PlusCircle } from "lucide-react";
import Link from "next/link";

export default function SitesRoute() {
    return (
        <>
            <div className="flex w-full justify-end">
                <Button asChild>
                    <Link
                        href={'/dashboard/sites/new'}
                    >
                        <PlusCircle className="mr-2 size-4" />Start a site
                    </Link>
                </Button>
            </div>
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center animate-in fade-in-50">
                <div className="flex size-20 items-center justify-center rounded-full bg-primary/10">
                    <FileIcon className="size-10 text-primary" />
                </div>
                <h2 className="mt-6 mb-8 text-xl font-semibold">You have not created any sites</h2>
                <Button asChild>
                    <Link
                        href={'/dashboard/sites/new'}
                    >
                        <PlusCircle className="mr-2 size-4" />Create site
                    </Link>
                </Button>
            </div>
        </>
    );
}