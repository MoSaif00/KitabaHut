"use client";

import { UploadDropzone } from "@/app/utils/uploadthing";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { useState } from "react";
import { SubmitButton } from "../SubmitButtons";
import { toast } from "sonner";
import { UpdateSiteImageAction } from "@/app/actions";

interface uploadProps {
    siteId: string;
}
export function UploadImageForm({ siteId }: uploadProps) {
    const [siteImage, setSiteImage] = useState<undefined | string>(undefined);
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Site Image
                </CardTitle>
                <CardDescription>
                    Add Image to your sites to keep it cool
                </CardDescription>
            </CardHeader>
            <CardContent>
                {siteImage ? (
                    <Image
                        src={siteImage}
                        alt="Uploaded site image"
                        width={200}
                        height={200}
                        className="size-[200px] object-cover rounded-lg"
                    />
                ) : (
                    <UploadDropzone
                        endpoint="imageUploader"
                        onClientUploadComplete={(res) => {
                            setSiteImage(res[0].url);
                            toast.success('Image is uploaded');
                        }}
                        onUploadError={() => {
                            toast.error('Something went wrong uploading image');
                        }}
                    />
                )}
            </CardContent>
            <CardFooter>
                <form action={UpdateSiteImageAction}>
                    <input type="hidden" name="siteId" value={siteId} />
                    <input type="hidden" name="imageUrl" value={siteImage} />
                    <SubmitButton text="Save" />
                </form>
            </CardFooter>
        </Card>
    );
}