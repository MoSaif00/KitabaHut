import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BadgeCheck } from "lucide-react";
import { SubmitButton } from "../dashboard/SubmitButtons";
import Link from "next/link";
import { CreateSubscription } from "@/app/actions";

interface pricingProps {
  id: number;
  cardTitle: string;
  cardDescription: string;
  priceTitle: string;
  benefits: string[];
}

export const PricingPlans: pricingProps[] = [
  {
    id: 0,
    cardTitle: "Starter",
    cardDescription: "Free plan for starting out.",
    priceTitle: "Free",
    benefits: ["1 Site", "Unlimited Articles", "Unlimited Visitors", "Forever Free"],
  },
  {
    id: 1,
    cardTitle: "Professional",
    cardDescription: "Free plan for starting out.",
    priceTitle: "€11",
    benefits: [
      "Unlimited Site",
      "Unlimited Articles",
      "Unlimited Visitors",
      "Analysis Dashboard",
    ],
  },
];

export function PricingTable() {
  return (
    <section className="pb-8">
      <div className="mx-auto max-w-4xl text-center">
        <p className="text-sm font-semibold text-primary sm:text-base">Pricing</p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
          Pricing Plans for all!
        </h2>
      </div>
      <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-relaxed text-muted-foreground sm:mt-6 sm:text-base">
        Our service is free for everyone at all time, but we offer a paid plan
        for extra features
      </p>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:mt-12 sm:gap-8 lg:mt-16 lg:grid-cols-2">
        {PricingPlans.map((plan) => (
          <Card key={plan.id} className={plan.id === 1 ? "border-primary" : ""}>
            <CardHeader>
              <CardTitle>
                {plan.id === 1 ? (
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-primary">{plan.cardTitle}</h3>
                    <p className="rounded-full bg-primary/20 px-3 py-1 text-xs font-semibold leading-5 text-primary">
                      Recommended
                    </p>
                  </div>
                ) : (
                  plan.cardTitle
                )}
              </CardTitle>
              <CardDescription>{plan.cardDescription}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mt-2 text-3xl font-bold tracking-tight sm:mt-6 sm:text-4xl">
                {plan.priceTitle}
              </p>
              <ul className="mt-6 space-y-3 text-sm leading-6 text-muted-foreground sm:mt-8">
                {plan.benefits.map((benefit, i) => (
                  <li key={i} className="flex gap-x-3">
                    <BadgeCheck className="size-5 shrink-0 text-primary" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              {plan.id === 1 ? (
                <form className="w-full" action={CreateSubscription}>
                  <SubmitButton text="Buy plan" className="mt-2 w-full sm:mt-5" />
                </form>
              ) : (
                <Button variant="outline" className="mt-2 w-full sm:mt-5" asChild>
                  <Link href="/dashboard">Try for free</Link>
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
