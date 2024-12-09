import prisma from "@/app/utils/db";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { BookOpenText, FileIcon, FilePenLine, FileX, NotebookPen, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

async function getData(userId: string, siteId: string) {
    const data = await prisma.post.findMany({
        where: {
            userId: userId,
            siteId: siteId
        },
        select: {
            image: true,
            title: true,
            createdAt: true,
            id: true,
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    return data;
}

export default async function SiteIdRoute({ params }: { params: Promise<{ siteId: string; }>; }) {
    const siteId = (await params).siteId;
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
        return redirect('api/auth/login');
    }

    const data = await getData(user.id, siteId);


    return (
        <>
            <div className="flex w-full justify-end gap-x-4">
                <Button asChild variant="secondary">
                    <Link href={'#'}>
                        <BookOpenText className="size-4 mr-2" /> View Blog
                    </Link>
                </Button>
                <Button asChild variant="secondary">
                    <Link href={'#'}>
                        <Settings className="size-4 mr-2" />Settings
                    </Link>
                </Button>
                <Button asChild>
                    <Link href={`/dashboard/sites/${siteId}/create`}>
                        <NotebookPen className="size-4 mr-2" />Create Article
                    </Link>
                </Button>
            </div>
            {data === undefined || data.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center animate-in fade-in-50">
                    <div className="flex size-20 items-center justify-center rounded-full bg-primary/10">
                        <FileIcon className="size-10 text-primary" />
                    </div>
                    <h2 className="mt-6 mb-8 text-xl font-semibold">You do not have any article created</h2>
                    <Button asChild>
                        <Link
                            href={`/dashboard/sites/${siteId}/create`}
                        >
                            <NotebookPen className="mr-2 size-4" />Create Article
                        </Link>
                    </Button>
                </div>
            ) : (
                <div>
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                Articles
                            </CardTitle>
                            <CardDescription>
                                Your place to manage your site articles
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Image</TableHead>
                                        <TableHead>Title</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Created At</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {data.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell>
                                                <Image
                                                    src={item.image}
                                                    className="size-16 rounded-md object-cover"
                                                    width={64}
                                                    height={64}
                                                    alt="Article Cover Image"
                                                />
                                            </TableCell>
                                            <TableCell className="font-medium">
                                                {item.title}
                                            </TableCell>
                                            <TableCell >
                                                <Badge variant={"outline"} className="bg-green-500/10 text-green-500">Published</Badge>
                                            </TableCell>
                                            <TableCell>
                                                {new Intl.DateTimeFormat('locale', {
                                                    dateStyle: 'medium',
                                                }).format(item.createdAt)}
                                            </TableCell>

                                            <TableCell >
                                                <TooltipProvider>
                                                    <div className="flex w-full justify-end gap-x-4">
                                                        <Tooltip>
                                                            <TooltipTrigger>
                                                                <Button
                                                                    size="icon"
                                                                    asChild
                                                                >
                                                                    <Link href={`/dashboard/sites/${siteId}/${item.id}`}>
                                                                        <FilePenLine className="size-4" />
                                                                    </Link>
                                                                </Button>
                                                            </TooltipTrigger>
                                                            <TooltipContent>
                                                                <p className="text-primary" >Edit article</p>
                                                            </TooltipContent>

                                                        </Tooltip>
                                                        <Tooltip>
                                                            <TooltipTrigger>
                                                                <Button
                                                                    size="icon"
                                                                    variant="destructive"
                                                                    aria-label="Delete"
                                                                    asChild
                                                                >
                                                                    <Link href={`/dashboard/sites/${siteId}/${item.id}/delete`}>
                                                                        <FileX className="size-4" />
                                                                    </Link>
                                                                </Button>
                                                            </TooltipTrigger>
                                                            <TooltipContent>
                                                                <p className="text-red-500">Delete article</p>
                                                            </TooltipContent>
                                                        </Tooltip>

                                                    </div>
                                                </TooltipProvider>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div >
            )
            }
        </>
    );
}