import { auth } from '@clerk/nextjs/server';
import { Hero } from "./components/frontend/Hero";
import { Features } from "./components/frontend/Features";
import { PricingTable } from "./components/Shared/Pricing";
import { redirect } from "next/navigation";

export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    return redirect('/dashboard');
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
      <Hero />
      <Features />
      <PricingTable />
    </div>
  );
}
