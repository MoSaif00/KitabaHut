import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
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
        benefits: [
            '1 Site',
            'Unlimited Articles',
            'Unlimited Visitors',
            'Forever Free'
        ],
    },
    {
        id: 1,
        cardTitle: "Professional",
        cardDescription: "Free plan for starting out.",
        priceTitle: "€11",
        benefits: [
            'Unlimited Site',
            'Unlimited Articles',
            'Unlimited Visitors',
            'Analysis Dashboard',
        ],
    }
];
export function PricingTable() {
    return (
        <>
            <div className="max-w-4xl mx-auto text-center">
                <p className="text-primary font-semibold">Pricing</p>
                <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl ">Pricing Plans for all!</h1>
            </div>
            <p className="mx-auto mt-6 max-w-2xl text-center leading-tight text-muted-foreground">
                Our service is free for everyone at all time, but we offer a paid plan for extra features
            </p>

            <div className="grid grid-cols-1 gap-8 mt-16 lg:grid-cols-2">
                {PricingPlans.map(plan => (
                    <Card
                        key={plan.id}
                        className={plan.id === 1 ? 'border-primary' : ''}
                    >
                        <CardHeader>
                            <CardTitle>
                                {plan.id === 1 ? (
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-primary">{plan.cardTitle}</h3>
                                        <p className="rounded-full bg-primary/20 px-3 py-1 text-xs font-semibold leading-5 text-primary">Recommended</p>
                                    </div>
                                ) : (
                                    <>
                                        {plan.cardTitle}
                                    </>
                                )}
                            </CardTitle>
                            <CardDescription>
                                {plan.cardDescription}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="mt-6 text-4xl font-bold tracking-tight">
                                {plan.priceTitle}
                            </p>
                            <ul className="mt-8 space-y-3 text-xs leading-6 text-muted-foreground">
                                {plan.benefits.map((benefit, i) => (
                                    <li key={i} className="flex gap-x-3">
                                        <BadgeCheck className="text-primary size-5" />{benefit}
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                        <CardFooter>
                            {
                                plan.id === 1 ? (
                                    <form
                                        className="w-full"
                                        action={CreateSubscription}
                                    >
                                        <SubmitButton
                                            text="Buy plan"
                                            className="mt-5 w-full"
                                        />
                                    </form>
                                ) : (
                                    <Button
                                        variant="outline"
                                        className="mt-5 w-full"
                                        asChild
                                    >
                                        <Link href={'/dashboard'}>
                                            Try for free
                                        </Link>
                                    </Button>

                                )
                            }
                        </CardFooter>
                    </Card>
                ))}
            </div >
        </>
    );
}