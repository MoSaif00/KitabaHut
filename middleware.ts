import { clerkMiddleware } from "@clerk/nextjs/server";

// Keep middleware for Clerk session handling only.
// Auth checks live on each protected resource (see app/dashboard/layout.tsx).
export default clerkMiddleware();

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
