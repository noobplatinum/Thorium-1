import Stripe from "stripe";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import prismadb from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
    const body = await req.text();
    const headersList = await headers();
    const signature = headersList.get("Stripe-Signature") as string;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        )
    } catch (error: any)
    {
        return new NextResponse("Webhook Error", { status: 400 });
    }

    const session = event.data.object as Stripe.Checkout.Session;
    if(event.type === "checkout.session.completed")
    {
        const subscription = await stripe.subscriptions.retrieve(
            session.subscription as string
        );

        if(!session?.metadata?.userId)
        {
            return new NextResponse("User not found", { status: 400 });
        }

        await prismadb.userSubscription.create({
            data: {
                userId: session?.metadata?.userId,
                stripeCustomerId: subscription.customer as string,
                stripeSubscriptionId: subscription.id,
                stripePriceId: subscription.items.data[0].price.id,
                stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
            },
        });
    }

    if(event.type === "invoice.payment_succeeded")
    {
        const subscription = await stripe.subscriptions.retrieve(
            session.subscription as string
        );

        if(!subscription?.metadata?.userId)
        {
            return new NextResponse("User not found", { status: 400 });
        }

        await prismadb.userSubscription.update({
            where: {
                stripeSubscriptionId: subscription.id,
            },
            data: {
                stripePriceId: subscription.items.data[0].price.id,
                stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
            },
        });
    }
    return new NextResponse("Webhook Success", { status: 200 });
}