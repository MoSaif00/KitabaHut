import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "../components/dashboard/EmptyState";
import prisma from "../utils/db";
import { requireUser } from "../utils/requireUser";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import DefaultImage from '@/public/defaultImage.png';

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
    const user = await requireUser();
    const { sites, articles } = await getData(user.id);

    return (
        <div className="">
            <h1 className="text-2xl font-semibold mb-5">Recent Sites</h1>
            {sites.length > 0 ? (
                <div className="grid grid-cols-1 gap4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
                    {sites.map(item => (
                        <Card key={item.id}>
                            <Image
                                src={item.imageUrl ?? DefaultImage}
                                alt={item.name}
                                className="rounded-t-lg object-cover w-full h-[200px]"
                                width={400}
                                height={200}
                            />
                            <CardHeader>
                                <CardTitle className="truncate">
                                    {item.name}
                                </CardTitle>
                                <CardDescription className="line-clamp-3">
                                    {item.description}
                                </CardDescription>
                            </CardHeader>
                            <CardFooter>
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

            <h1 className="text-2xl mt-10 mb-5 font-semibold">Recent Articles</h1>
            {articles.length > 0 ? (
                <div className="grid grid-cols-1 gap4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
                    {articles.map(item => (
                        <Card key={item.id}>
                            <Image
                                src={item.image ?? DefaultImage}
                                alt={item.title}
                                className="rounded-t-lg object-cover w-full h-[200px]"
                                width={400}
                                height={200}
                            />
                            <CardHeader>
                                <CardTitle className="truncate">
                                    {item.title}
                                </CardTitle>
                                <CardDescription className="line-clamp-3">
                                    {item.smallDescription}
                                </CardDescription>
                            </CardHeader>
                            <CardFooter>
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