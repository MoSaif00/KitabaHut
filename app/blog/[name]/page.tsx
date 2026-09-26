import prisma from "@/app/utils/db";
import { notFound } from "next/navigation";
import Logo from "@/public/kitaba.svg";
import Link from "next/link";
import Image from "next/image";
import { ModeToggle } from "@/app/components/dashboard/ModeToggle";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DefaultImage from "@/public/defaultImage.png";

type blogIndexProps = Promise<{ name: string }>;

async function getData(subDir: string) {
  const data = await prisma.site.findUnique({
    where: {
      subdirectory: subDir,
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
          id: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
}

export default async function BlogIndexPage({
  params,
}: {
  params: blogIndexProps;
}) {
  const { name: subDirName } = await params;
  const data = await getData(subDirName);

  return (
    <>
      <nav className="relative my-6 flex items-start justify-between gap-3 sm:my-10 sm:items-center">
        <div className="w-10 shrink-0 sm:w-12" />
        <Link href="/" className="mx-auto min-w-0 font-semibold">
          <div className="flex flex-col items-center gap-2 text-center sm:gap-3">
            <Image
              src={data.imageUrl || Logo}
              alt="blog logo"
              className="rounded-sm object-cover shadow-lg"
              width={80}
              height={80}
            />
            <h3 className="break-words text-xl font-bold tracking-tight text-gray-800 dark:text-gray-100 sm:text-2xl md:text-3xl">
              {data.name}
            </h3>
          </div>
        </Link>
        <div className="flex w-10 shrink-0 justify-end sm:w-12">
          <ModeToggle />
        </div>
      </nav>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
        {data.posts.map((item) => (
          <Card
            key={item.id}
            className="overflow-hidden transition-all duration-300 hover:shadow-xl sm:hover:scale-[1.02]"
          >
            <Image
              src={item.image ?? DefaultImage}
              alt={item.title}
              className="h-[160px] w-full rounded-t-lg object-cover sm:h-[200px]"
              width={400}
              height={200}
            />
            <CardHeader className="p-4">
              <CardTitle className="truncate text-base font-semibold text-gray-800 dark:text-gray-100 sm:text-lg">
                {item.title}
              </CardTitle>
              <CardDescription className="line-clamp-3 text-sm text-gray-600 dark:text-gray-400">
                {item.smallDescription}
              </CardDescription>
            </CardHeader>
            <CardFooter className="p-4 pt-0">
              <Button asChild className="w-full bg-primary text-white hover:bg-primary/90">
                <Link href={`/blog/${subDirName}/${item.slug}`}>View Article</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
