import prisma from "@/app/utils/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user || !user.id) {
      return NextResponse.redirect(
        new URL("/api/auth/login", request.url)
      );
    }

    let dbUser = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
    });

    if (!dbUser) {
      dbUser = await prisma.user.create({
        data: {
          id: user.id,
          firstName: user.given_name ?? "",
          lastName: user.family_name ?? "",
          email: user.email ?? "",
          profileImage:
            user.picture ?? `https://avatar.vercel.sh/${user.given_name}`,
        },
      });
    }

    const redirectUrl = new URL(
      "/dashboard",
      process.env.NODE_ENV === "production"
        ? "https://kitabahut.vercel.app"
        : "http://localhost:3000"
    );

    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    console.error("Auth creation error:", error);
    return NextResponse.redirect(
      new URL("/api/auth/login", request.url)
    );
  }
}