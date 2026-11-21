import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/utils/db";

/**
 * Keep-alive endpoint for Supabase Free-tier inactivity.
 * Protected by KEEPALIVE_SECRET — called from GitHub Actions.
 */
export async function GET(request: NextRequest) {
  const secret = process.env.KEEPALIVE_SECRET;
  const provided =
    request.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ??
    request.nextUrl.searchParams.get("secret");

  if (!secret || provided !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS "_keepalive" (
        id int PRIMARY KEY DEFAULT 1,
        last_ping timestamptz NOT NULL DEFAULT now(),
        ping_count bigint NOT NULL DEFAULT 0
      )
    `;

    await prisma.$executeRaw`
      INSERT INTO "_keepalive" (id, last_ping, ping_count)
      VALUES (1, now(), 1)
      ON CONFLICT (id) DO UPDATE
      SET last_ping = now(),
          ping_count = "_keepalive".ping_count + 1
    `;

    const [users, sites, posts, ping] = await Promise.all([
      prisma.user.count(),
      prisma.site.count(),
      prisma.post.count(),
      prisma.$queryRaw<
        { last_ping: Date; ping_count: bigint }[]
      >`SELECT last_ping, ping_count FROM "_keepalive" WHERE id = 1`,
    ]);

    return NextResponse.json({
      ok: true,
      users,
      sites,
      posts,
      last_ping: ping[0]?.last_ping ?? null,
      ping_count: ping[0] ? Number(ping[0].ping_count) : 0,
    });
  } catch (error) {
    console.error("keepalive failed", error);
    return NextResponse.json({ error: "Keepalive failed" }, { status: 500 });
  }
}
