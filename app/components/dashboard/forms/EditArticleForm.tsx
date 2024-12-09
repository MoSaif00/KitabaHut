/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Sparkle } from "lucide-react";
import { UploadDropzone } from "@/app/utils/uploadthing";
import Image from "next/image";
import TailwindEditor from "../EditorWrapper";
import { SubmitButton } from "../SubmitButtons";
import { toast } from "sonner";
import { useActionState, useState } from "react";
import { JSONContent } from "novel";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { postSchema } from "@/app/utils/zodSchemas";
import { EditPostAction } from "@/app/actions";
import slugify from "react-slugify";

interface articleProps {
    data: {
        title: string;
        slug: string;
        smallDescription: string;
        articleContent: any;
        id: string;
        image: string;
    };
    siteId: string;
}

export function EditArticleForm({ data, siteId }: articleProps) {
    const [imageUrl, setImageUrl] = useState<undefined | string>(data.image);
    const [value, setValue] = useState<JSONContent | undefined>(data.articleContent);
    const [title, setTitle] = useState<undefined | string>(data.title);
    const [slug, setSlug] = useState<undefined | string>(data.slug);

    const [lastResult, action] = useActionState(EditPostAction, undefined);
    const [form, fields] = useForm({
        lastResult,

        onValidate({ formData }) {
            return parseWithZod(formData, {
                schema: postSchema
            });
        },

        shouldValidate: 'onBlur',
        shouldRevalidate: 'onInput'
    });

    function handleSlugGeneration() {
        const titleInput = title;

        if (titleInput?.length == 0 || titleInput === undefined) {
            return toast.error("Please create title first");
        }

        setSlug(slugify(titleInput));

        return toast.success("Slug has been created");
    }

    return (
        <Card className="mt-6">
            <CardHeader>
                <CardTitle>Article Details</CardTitle>
                <CardDescription>Start writing your article</CardDescription>
            </CardHeader>
            <CardContent>
                <form
                    id={form.id} onSubmit={form.onSubmit} action={action}
                    className="flex flex-col gap-6"
                >
                    <input type="hidden" name='articleId' value={data.id} />
                    <input type="hidden" name='siteId' value={siteId} />
                    <div className="grid gap-2">
                        <Label>Title</Label>
                        <Input
                            key={fields.title.key}
                            name={fields.title.name}
                            defaultValue={fields.title.initialValue}
                            placeholder="Write article title"
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                        />
                        <p className="text-red-500 text-sm">{fields.title.errors}</p>
                    </div>
                    <div className="grid gap-2">
                        <Label>Slug</Label>
                        <div className="flex gap-5">
                            <Input
                                key={fields.slug.key}
                                name={fields.slug.name}
                                defaultValue={fields.slug.initialValue}
                                placeholder="Write article slug"
                                onChange={e => setSlug(e.target.value)}
                                value={slug}
                            />
                            <Button onClick={handleSlugGeneration} variant="secondary" type="button">
                                <Sparkle className="size-4 mr-2" /> Generate Slug
                            </Button>
                        </div>
                        <p className="text-red-500 text-sm">{fields.slug.errors}</p>
                    </div>
                    <div className="grid gap-2">
                        <Label>Short Description</Label>
                        <Textarea
                            key={fields.smallDescription.key}
                            name={fields.smallDescription.name}
                            defaultValue={data.smallDescription}
                            className="h-20"
                            placeholder="Write short description about the article"
                        />
                        <p className="text-red-500 text-sm">{fields.smallDescription.errors}</p>
                    </div>
                    <div className="grid gap-2">
                        <Label>Cover Image</Label>
                        <input
                            type="hidden"
                            name={fields.coverImage.name}
                            key={fields.coverImage.key}
                            defaultValue={fields.coverImage.initialValue}
                            value={imageUrl}
                        />
                        {imageUrl ? (
                            <Image
                                src={imageUrl}
                                alt="Uploaded image"
                                className="object-cover w-[400px] h-[200px] rounded-lg"
                                width={200}
                                height={200}
                            />
                        ) : (
                            <UploadDropzone
                                onClientUploadComplete={res => {
                                    setImageUrl(res[0].url);
                                    toast.success('Image has been uploaded');
                                }}
                                endpoint="imageUploader"
                                onUploadError={() => {
                                    toast.error('Something went wrong uploading image..');
                                }}
                            />
                        )}
                        <p className="text-red-500 text-sm">{fields.coverImage.errors}</p>

                    </div>
                    <div className="grid gap-2">
                        <Label>Article Content</Label>
                        <input
                            type="hidden"
                            name={fields.articleContent.name}
                            key={fields.articleContent.key}
                            defaultValue={fields.articleContent.initialValue}
                            value={JSON.stringify(value)}
                        />
                        <TailwindEditor
                            initialValue={value}
                            onChange={setValue}
                        />
                        <p className="text-red-500 text-sm">{fields.articleContent.errors}</p>
                    </div>

                    <SubmitButton text="Update" />
                </form>
            </CardContent>
            <CardFooter>

            </CardFooter>
        </Card>
    );
}