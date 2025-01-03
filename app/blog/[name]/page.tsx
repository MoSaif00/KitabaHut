import prisma from "@/app/utils/db";
import { notFound } from "next/navigation";
import Logo from '@/public/kitaba.svg';
import Link from "next/link";
import Image from "next/image";
import { ModeToggle } from "@/app/components/dashboard/ModeToggle";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DefaultImage from '@/public/defaultImage.png';

type blogIndexProps = Promise<{ name: string; }>;

async function getData(subDir: string) {
    const data = await prisma.site.findUnique({
        where: {
            subdirectory: subDir
        },
        select: {
            name: true,
            imageUrl: true,
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

export default async function BlogIndexPage({ params }: { params: blogIndexProps; }) {
    const { name: subDirName } = await params;

    const data = await getData(subDirName);

    return (
        <>
            <nav className="grid grid-cols-3 my-10">
                <div className="col-span-1" />
                <div className="flex items-center justify-center">
                    <Link href={'/'} className="font-semibold">
                        <div className="flex flex-col items-center text-center gap-3">
                            <Image
                                src={data.imageUrl || Logo}
                                alt="blog logo"
                                className="rounded-sm object-cover shadow-lg"
                                width={80}
                                height={80}
                            />
                            <h3 className="text-3xl font-bold text-gray-800 dark:text-gray-100 tracking-tight">
                                {data.name}
                            </h3>
                        </div>
                    </Link>
                </div>
                <div className="col-span-1 flex w-full justify-end">
                    <ModeToggle />
                </div>
            </nav>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
                {data.posts.map((item) => (
                    <Card
                        key={item.id}
                        className="transition-all duration-300 hover:scale-105 hover:shadow-xl"
                    >
                        <Image
                            src={item.image ?? DefaultImage}
                            alt={item.title}
                            className="rounded-t-lg object-cover w-full h-[200px]"
                            width={400}
                            height={200}
                        />
                        <CardHeader className="p-4">
                            <CardTitle className="truncate text-lg font-semibold text-gray-800 dark:text-gray-100">
                                {item.title}
                            </CardTitle>
                            <CardDescription className="line-clamp-3 text-sm text-gray-600 dark:text-gray-400">
                                {item.smallDescription}
                            </CardDescription>
                        </CardHeader>
                        <CardFooter>
                            <Button
                                asChild
                                className="w-full bg-primary text-white hover:bg-primary-dark"
                            >
                                <Link href={`/blog/${subDirName}/${item.slug}`}>
                                    View Article
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </>
    );
}