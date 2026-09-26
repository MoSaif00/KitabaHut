"use client";

import { CreateSiteAction } from "@/app/actions";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useActionState } from "react";
import { useForm } from '@conform-to/react';
import { parseWithZod } from "@conform-to/zod";
import { siteSchema } from "@/app/utils/zodSchemas";
import { SubmitButton } from "@/app/components/dashboard/SubmitButtons";

export default function NewSiteRoute() {
    const [lastResult, action] = useActionState(CreateSiteAction, undefined);
    const [form, fields] = useForm({
        lastResult,

        onValidate({ formData }) {
            return parseWithZod(formData, {
                schema: siteSchema
            });
        },

        shouldValidate: 'onBlur',
        shouldRevalidate: 'onInput'
    });

    const handleSubdirectoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        e.target.value = e.target.value.toLowerCase();
    };


    return (
        <div className="flex w-full flex-1 flex-col items-center justify-center px-1 py-4 sm:px-0">
            <Card className="w-full max-w-[550px]">
                <CardHeader>
                    <CardTitle>Create site</CardTitle>
                    <CardDescription>Create new site here.</CardDescription>
                </CardHeader>
                <form id={form.id} onSubmit={form.onSubmit} action={action}>
                    <CardContent>
                        <div className="flex flex-col gap-y-6">
                            <div className="grid gap-3">
                                <Label>Site Name</Label>
                                <Input
                                    name={fields.name.name}
                                    key={fields.name.key}
                                    defaultValue={fields.name.initialValue}
                                    placeholder="Site Name"
                                />
                                <p className="text-red-500 text-sm">{fields.name.errors}</p>
                            </div>
                            <div className="grid gap-3">
                                <Label>Subdirectory</Label>
                                <Input
                                    name={fields.subdirectory.name}
                                    key={fields.subdirectory.key}
                                    defaultValue={fields.subdirectory.initialValue}
                                    placeholder="Subdirectory"
                                    onChange={handleSubdirectoryChange}
                                />
                                <p className="text-red-500 text-sm">{fields.subdirectory.errors}</p>
                            </div>
                            <div className="grid gap-3">
                                <Label>Description</Label>
                                <Textarea
                                    name={fields.description.name}
                                    key={fields.description.key}
                                    defaultValue={fields.description.initialValue}
                                    placeholder="Site Description"
                                />
                                <p className="text-red-500 text-sm">{fields.description.errors}</p>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <SubmitButton text="Submit" className="w-full sm:w-auto" />
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}