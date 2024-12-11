import { DeletePostAction } from "@/app/actions";
import { SubmitButton } from "@/app/components/dashboard/SubmitButtons";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";


export default async function DeleteArticleRoute({ params }: { params: { siteId: string, articleId: string; }; }) {
    const siteId = params.siteId;
    const articleId = params.articleId;

    return (
        <div className="flex flex-1 items-center justify-center">
            <Card className="max-w-xl">
                <CardHeader>
                    <CardTitle>Are you sure you want to delete this article?</CardTitle>
                    <CardDescription>This action will delete the article permanently from our servers</CardDescription>
                </CardHeader>
                <CardFooter className="w-full flex justify-between">
                    <Button variant="secondary" asChild>
                        <Link href={`/dashboard/sites/${siteId}`}>
                            Cancel
                        </Link>
                    </Button>
                    <form action={DeletePostAction}>
                        <input type="hidden" name='siteId' value={siteId} />
                        <input type="hidden" name="articleId" value={articleId} />
                        <SubmitButton
                            variant={"destructive"}
                            text="Delete article"
                        />
                    </form>
                </CardFooter>
            </Card>
        </div>
    );
}