import { SubmitButton } from "@/app/components/dashboard/SubmitButtons";
import { PricingTable } from "@/app/components/Shared/Pricing";
import { requireAuth } from "@/app/utils/auth";
import prisma from "@/app/utils/db";
import { stripe } from "@/app/utils/stripe";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { redirect } from "next/navigation";

async function getData(userId: string) {
    const data = await prisma.subscription.findUnique({
        where: {
            userId: userId
        },
        select: {
            status: true,
            User: {
                select: {
                    customerId: true
                }
            }
        }
    });
    return data;
}

export default async function PricingPage() {
    const userId = await requireAuth();
    const data = await getData(userId);

    async function createCustomerPortal() {
        "use server";

        const session = await stripe.billingPortal.sessions.create({
            customer: data?.User?.customerId as string,
            return_url: process.env.NODE_ENV === 'production' ? `${process.env.SITE_URL}/dashboard` : 'http://localhost:3000/dashboard'
        });

        return redirect(session.url);

    }

    if (data?.status === 'active') {
        return (
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>
                        Edit Subscription
                    </CardTitle>
                    <CardDescription>
                        You can change your payment details and view your invoices here
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={createCustomerPortal}>
                        <SubmitButton
                            text="View Subscription Details"
                        />
                    </form>
                </CardContent>
            </Card>
        );
    }
    return (
        <div>
            <PricingTable />
        </div>
    );
}