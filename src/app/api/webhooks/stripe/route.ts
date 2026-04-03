import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { prisma } from "@/lib/prisma";

// Lazy initialization to prevent build-time crashes if keys are missing
let stripeInstance: Stripe | null = null;

function getStripe() {
    if (!stripeInstance && process.env.STRIPE_SECRET_KEY) {
        stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY, {
            apiVersion: '2024-12-18.acacia' as any,
        });
    }
    return stripeInstance;
}

export async function POST(req: Request) {
    const body = await req.text();
    const signature = req.headers.get('stripe-signature') as string;

    const stripe = getStripe();

    if (!stripe) {
        return NextResponse.json({ error: 'Stripe not initialized' }, { status: 500 });
    }

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (error: any) {
        console.error(`Webhook Error: ${error.message}`);
        return NextResponse.json({ error: `Webhook Error: ${error.message}` }, { status: 400 });
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object as Stripe.Checkout.Session;
        const bookingId = session.metadata?.bookingId;

        if (bookingId) {
            try {
                // Update booking in Render PostgreSQL using Prisma
                await prisma.booking.update({
                    where: { id: bookingId },
                    data: {
                        paymentStatus: 'paid',
                        status: 'confirmed',
                        stripeId: session.id as string
                    }
                });
            } catch (error: any) {
                console.error('Error updating booking in Prisma webhook:', error);
                return NextResponse.json({ error: 'Database update failed' }, { status: 500 });
            }
        }
    }

    return NextResponse.json({ received: true });
}
