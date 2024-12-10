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
    return (
        <div className="flex flex-col flex-1 items-center justify-center">
            <Card className="max-w-[550px]">
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
                        <SubmitButton text="Submit" />
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}