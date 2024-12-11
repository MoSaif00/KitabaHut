import { EditArticleForm } from "@/app/components/dashboard/forms/EditArticleForm";
import prisma from "@/app/utils/db";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

type editArticleProps = Promise<{ siteId: string; articleId: string; }>;

async function getData(postId: string) {
    const data = await prisma.post.findUnique({
        where: {
            id: postId,
        },
        select: {
            image: true,
            title: true,
            smallDescription: true,
            slug: true,
            articleContent: true,
            id: true,
        }
    });

    if (!data) {
        return notFound();
    }

    return data;
}
export default async function EditArticleRoute({ params }: { params: editArticleProps; }) {
    const { articleId, siteId } = await params;
    const data = await getData(articleId);

    return (
        <div>
            <div className="flex items-center">
                <Button size="icon" variant="outline" className="mr-3" asChild>
                    <Link href={`/dashboard/sites/${siteId}`}>
                        <ArrowLeft className="size-4" />
                    </Link>
                </Button>
                <h1 className="text-xl font-semibold">Edit Article</h1>
            </div>

            <EditArticleForm data={data} siteId={siteId} />
        </div>
    );
}