import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

interface AuthMiddlewareState {
  userId?: string;
}

export default withAuth({
  loginPage: "/api/auth/login",
  isReturnToCurrentPage: true,
  afterAuth(auth: AuthMiddlewareState, req: NextRequest) {
    // If the user is not authenticated and trying to access protected routes
    if (!auth.userId && req.nextUrl.pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/api/auth/login", req.url));
    }
    return NextResponse.next();
  },
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/api/auth/kinde_callback",
    "/api/auth/creation",
  ],
};