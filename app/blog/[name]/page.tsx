import prisma from "@/app/utils/db";
import { notFound } from "next/navigation";
import Logo from '@/public/kitaba.svg';
import Link from "next/link";
import Image from "next/image";
import { ModeToggle } from "@/app/components/dashboard/ModeToggle";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DefaultImage from '@/public/defaultImage.png';

async function getData(subDir: string) {
    const data = await prisma.site.findUnique({
        where: {
            subdirectory: subDir
        },
        select: {
            name: true,
            posts: {
                select: {
                    smallDescription: true,
                    title: true,
                    image: true,
                    createdAt: true,
                    slug: true,
                    id: true
                },
                orderBy: {
                    createdAt: 'desc'
                }
            }
        }
    });

    if (!data) {
        return notFound();
    }

    return data;
}

export default async function BlogIndexPage({ params }: { params: { name: string; }; }) {
    const subDirName = params.name;

    const data = await getData(subDirName);

    return (
        <>
            <nav className="grid grid-cols-3 my-10">
                <div className="col-span-1" />
                <div className="flex items-center gap-x-4 justify-center">
                    <Link href={'/'} className="flex items-center gap-2 font-semibold" >
                        <Image src={Logo} alt="kitaba logo" width={40} height={40} />
                        <h3 className="text-3xl font-semibold tracking-tight">{data.name}</h3>
                    </Link>
                </div>

                <div className="col-span-1 flex w-full justify-end">
                    <ModeToggle />
                </div>
            </nav>

            <div className="grid grid-cols-1 gap4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
                {data.posts.map(item => (
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
                                <Link href={`/blog/${subDirName}/${item.slug}`}>View Article</Link>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div >
        </>
    );
}