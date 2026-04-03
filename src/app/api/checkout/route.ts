import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Lazy initialize Stripe to avoid build-time errors if environment variables are missing
let stripe: Stripe | null = null;

function getStripe() {
    if (!stripe && process.env.STRIPE_SECRET_KEY) {
        stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
            apiVersion: '2024-12-18.acacia' as any,
        });
    }
    return stripe;
}

export async function POST(req: Request) {
    try {
        if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY.includes('sample')) {
            throw new Error('STRIPE_SECRET_KEY is missing or invalid in your environment variables.');
        }

        if (!process.env.NEXT_PUBLIC_BASE_URL) {
            throw new Error('NEXT_PUBLIC_BASE_URL is not defined.');
        }

        const body = await req.json();
        const {
            bookingId,
            customerEmail,
            serviceName,
            price,
            date,
            time
        } = body;

        // Clean price string
        const numericPrice = parseInt(price.replace(/[^0-9]/g, ''));

        const stripe = getStripe();
        if (!stripe) {
            throw new Error('Stripe is not configured. STRIPE_SECRET_KEY may be missing.');
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            customer_email: customerEmail,
            line_items: [
                {
                    price_data: {
                        currency: 'aud',
                        product_data: {
                            name: serviceName,
                            description: `${serviceName} on ${date} at ${time}`,
                        },
                        unit_amount: numericPrice * 100, // Stripe uses cents
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/book?status=success&booking_id=${bookingId}`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/book?status=cancelled&booking_id=${bookingId}`,
            metadata: {
                bookingId: bookingId,
            },
        });

        return NextResponse.json({ url: session.url });
    } catch (error: any) {
        console.error('STRIIPE_ERROR', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
