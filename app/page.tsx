import { auth } from "@clerk/nextjs/server";
import { Hero } from "./components/frontend/Hero";
import { Features } from "./components/frontend/Features";
import { PricingTable } from "./components/Shared/Pricing";
import { redirect } from "next/navigation";

export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    return redirect("/dashboard");
  }

  return (
    <div className="mx-auto mb-16 w-full max-w-7xl overflow-x-hidden px-4 sm:mb-20 sm:px-6 lg:mb-24 lg:px-8">
      <Hero />
      <Features />
      <PricingTable />
    </div>
  );
}
