import { clerkMiddleware } from "@clerk/nextjs/server";

// On *.vercel.app, Clerk loads scripts via /__clerk (FAPI proxy).
// Those URLs end in .js and would otherwise be skipped by the default matcher.
export default clerkMiddleware({
  frontendApiProxy: {
    enabled: true,
  },
});

export const config = {
  matcher: [
    // Skip Next.js internals and static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
    // Always run for Clerk Frontend API proxy (includes .js assets)
    "/__clerk/(.*)",
  ],
};
