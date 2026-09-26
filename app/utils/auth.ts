import { auth } from "@clerk/nextjs/server";

/** Require a signed-in user; redirects to sign-in when unauthenticated. */
export async function requireAuth() {
  const { userId } = await auth.protect();
  return userId;
}
