import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "../components/dashboard/EmptyState";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import DefaultImage from '@/public/defaultImage.png';
import prisma from "../utils/db";
import { requireAuth } from "../utils/auth";

async function getData(userId: string) {
    const [sites, articles] = await Promise.all([
        prisma.site.findMany({
            where: {
                userId: userId
            },
            orderBy: {
                createdAt: 'desc'
            },
            take: 3
        }),
        prisma.post.findMany({
            where: {
                userId: userId
            },
            orderBy: {
                createdAt: 'desc'
            },
            take: 3
        })
    ]);

    return {
        sites, articles
    };
}

export default async function DashboardIndexPage() {
    const userId = await requireAuth();
    const { sites, articles } = await getData(userId);

    return (
        <div className="w-full min-w-0">
            <h1 className="mb-4 text-xl font-semibold sm:mb-5 sm:text-2xl">Recent Sites</h1>
            {sites.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
                    {sites.map(item => (
                        <Card key={item.id} className="overflow-hidden">
                            <Image
                                src={item.imageUrl ?? DefaultImage}
                                alt={item.name}
                                className="h-[160px] w-full rounded-t-lg object-cover sm:h-[200px]"
                                width={400}
                                height={200}
                            />
                            <CardHeader className="space-y-2 p-4 sm:p-6">
                                <CardTitle className="truncate text-base sm:text-lg">
                                    {item.name}
                                </CardTitle>
                                <CardDescription className="line-clamp-3">
                                    {item.description}
                                </CardDescription>
                            </CardHeader>
                            <CardFooter className="p-4 pt-0 sm:p-6 sm:pt-0">
                                <Button asChild className="w-full">
                                    <Link href={`/dashboard/sites/${item.id}`}>View Articles</Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div >
            ) : (<EmptyState
                title="You do not have any sites yet"
                description="Currently, you do not have any sites yet. Please, create new sites to be able to see them here"
                href="/dashboard/sites/new"
                buttonText="Create new site"
            />)}

            <h1 className="mb-4 mt-8 text-xl font-semibold sm:mb-5 sm:mt-10 sm:text-2xl">Recent Articles</h1>
            {articles.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
                    {articles.map(item => (
                        <Card key={item.id} className="overflow-hidden">
                            <Image
                                src={item.image ?? DefaultImage}
                                alt={item.title}
                                className="h-[160px] w-full rounded-t-lg object-cover sm:h-[200px]"
                                width={400}
                                height={200}
                            />
                            <CardHeader className="space-y-2 p-4 sm:p-6">
                                <CardTitle className="truncate text-base sm:text-lg">
                                    {item.title}
                                </CardTitle>
                                <CardDescription className="line-clamp-3">
                                    {item.smallDescription}
                                </CardDescription>
                            </CardHeader>
                            <CardFooter className="p-4 pt-0 sm:p-6 sm:pt-0">
                                <Button asChild className="w-full">
                                    <Link href={`/dashboard/sites/${item.siteId}/${item.id}`}>Edit Article</Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div >
            ) : (<EmptyState
                title="You do not have any articles yet"
                description="Currently, you do not have any articles yet. Please, create new article to be able to see them here"
                href={`/dashboard/sites`}
                buttonText="Create new article"
            />)}
        </div>
    );
}