import prisma from "@/app/utils/db";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import DefaultImage from '@/public/defaultImage.png';
import Image from "next/image";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/app/components/dashboard/EmptyState";
import { requireAuth } from "@/app/utils/auth";

async function getData(userId: string) {

    const [subStatus, sites] = await Promise.all([
        prisma.subscription.findUnique({
            where: {
                userId: userId
            },
            select: {
                status: true
            }
        }),
        prisma.site.findMany({
            where: {
                userId: userId
            },
        })
    ]);


    return {
        sites,
        subStatus
    };
}
export default async function SitesRoute() {
    const userId = await requireAuth();

    const { sites: data, subStatus } = await getData(userId);

    return (
        <>
            <div className="mb-4 flex w-full justify-stretch sm:justify-end">
                <Button asChild className="w-full sm:w-auto">
                    <Link
                        href={
                            (!subStatus || subStatus.status !== 'active')
                                && data.length >= 1
                                ? '/dashboard/pricing'
                                : '/dashboard/sites/new'
                        }
                    >
                        <PlusCircle className="mr-2 size-4" />Start a site
                    </Link>
                </Button>
            </div>


            {data === undefined || data.length === 0 ? (
                <EmptyState
                    title="You do not have any sites yet"
                    description="Currently, you do not have any sites yet. Please, create new sites to be able to see them here"
                    href="/dashboard/sites/new"
                    buttonText="Create new site"
                />
            ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
                    {data.map(item => (
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
            )
            }
        </>
    );
};