import prisma from "@/app/utils/db";
import { Button } from "@/components/ui/button";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { BookOpenText, FileIcon, NotebookPen, Settings } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

async function getData(userId: string, siteId: string) {
    console.log("🚀 ~ getData ~ prisma:", prisma.post);
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

export default async function SiteIdRoute({ params }: { params: { siteId: string; }; }) {
    const siteId = params.siteId;
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
                    <Link href={'#'}>
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
                            href={'/dashboard/sites/new'}
                        >
                            <NotebookPen className="mr-2 size-4" />Create Blog
                        </Link>
                    </Button>
                </div>
            ) : (
                <h1>here is data</h1>
            )}
        </>
    );
}