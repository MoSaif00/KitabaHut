import { DeleteSiteAction } from "@/app/actions";
import { UploadImageForm } from "@/app/components/dashboard/forms/UploadImageForm";
import { SubmitButton } from "@/app/components/dashboard/SubmitButtons";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function SettingsSiteRoute({ params }: { params: { siteId: string; }; }) {
    const siteId = params.siteId;

    return (
        <>
            <div className="flex items-center gap-x-2">
                <Button variant="outline" size="icon">
                    <Link href={`/dashboard/sites/${siteId}`}>
                        <ChevronLeft className="size-4" />
                    </Link>
                </Button>
                <h3 className="text-xl font-semibold">Go back</h3>
            </div>

            <UploadImageForm siteId={siteId} />

            <Card className="border-red-500 bg-red-500/10">
                <CardHeader>
                    <CardTitle className="text-red-500">Delete Site</CardTitle>
                    <CardDescription>This is going to delete your current site and all associated articles</CardDescription>
                </CardHeader>
                <CardFooter>
                    <form action={DeleteSiteAction}>
                        <input type="hidden" name="siteId" value={siteId} />
                        <SubmitButton text="Delete now" variant="destructive" />
                    </form>
                </CardFooter>
            </Card>
        </>
    );
}