import { ModeToggle } from "@/app/components/dashboard/ModeToggle";
import { RenderArticle } from "@/app/components/dashboard/RenderArticle";
import prisma from "@/app/utils/db";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JSONContent } from "novel";

type slugParams = Promise<{ slug: string; name: string }>;

async function getData(slug: string) {
  const data = await prisma.post.findUnique({
    where: {
      slug: slug,
    },
    select: {
      articleContent: true,
      title: true,
      smallDescription: true,
      image: true,
      createdAt: true,
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
}

export default async function SlugRoute({ params }: { params: slugParams }) {
  const { slug: slugValue, name: subDirName } = await params;
  const data = await getData(slugValue);

  return (
    <>
      <div className="flex items-center justify-between gap-3 pb-4 pt-6 sm:pb-5 sm:pt-10">
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <Button size="icon" variant="outline" asChild className="shrink-0">
            <Link href={`/blog/${subDirName}`}>
              <ArrowLeft className="size-4" />
              <span className="sr-only">Go back</span>
            </Link>
          </Button>
          <h1 className="truncate text-base font-semibold sm:text-xl">Go Back</h1>
        </div>

        <ModeToggle />
      </div>

      <div className="mb-8 flex flex-col items-center justify-center sm:mb-10">
        <div className="m-auto w-full text-center md:w-10/12 lg:w-7/12">
          <p className="m-auto my-4 w-full text-sm font-light text-muted-foreground sm:my-5 md:text-base">
            {new Intl.DateTimeFormat("locale", { dateStyle: "medium" }).format(
              data.createdAt
            )}
          </p>
          <h1 className="mb-4 break-words text-2xl font-bold tracking-tight sm:mb-5 sm:text-4xl md:text-5xl lg:text-6xl">
            {data.title}
          </h1>
          <p className="m-auto w-full text-sm text-muted-foreground line-clamp-4 sm:text-base md:w-10/12">
            {data.smallDescription}
          </p>
        </div>
      </div>

      <div className="relative m-auto mb-8 h-52 w-full max-w-screen-lg overflow-hidden rounded-xl sm:mb-10 sm:h-80 md:mb-20 md:h-[450px] md:w-5/6 md:rounded-2xl lg:w-2/3">
        <Image
          src={data.image}
          alt={data.title}
          width={1200}
          height={630}
          className="h-full w-full object-cover"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
        />
      </div>

      <RenderArticle json={data.articleContent as JSONContent} />
    </>
  );
}
