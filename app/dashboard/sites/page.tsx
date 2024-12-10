import prisma from "@/app/utils/db";
import { Button } from "@/components/ui/button";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import DefaultImage from '@/public/defaultImage.png';
import Image from "next/image";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/app/components/dashboard/EmptyState";

async function getData(userId: string) {
    const data = await prisma.site.findMany({
        where: {
            userId: userId,
        },
        orderBy: {
            createdAt: 'desc',
        }
    });

    return data;
}
export default async function SitesRoute() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) {
        return redirect('api/auth/login');
    }

    const data = await getData(user.id);

    return (
        <>
            <div className="flex w-full justify-end">
                <Button asChild>
                    <Link
                        href={'/dashboard/sites/new'}
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
                <div className="grid grid-cols-1 gap4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
                    {data.map(item => (
                        <Card key={item.id}>
                            <Image
                                src={item.imageUrl ?? DefaultImage}
                                alt={item.name}
                                className="rounded-t-lg object-cover w-full h-[200px]"
                                width={400}
                                height={200}
                            />
                            <CardHeader>
                                <CardTitle>
                                    {item.name}
                                </CardTitle>
                                <CardDescription>
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
            )
            }
        </>
    );
};