import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

// Lazy initialization to prevent build-time crashes if keys are missing
let stripeInstance: Stripe | null = null;
let supabaseInstance: any = null;

function getStripe() {
    if (!stripeInstance && process.env.STRIPE_SECRET_KEY) {
        stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY, {
            apiVersion: '2024-12-18.acacia' as any,
        });
    }
    return stripeInstance;
}

function getSupabase() {
    if (!supabaseInstance && process.env.NEXT_PUBLIC_SUPABASE_URL) {
        supabaseInstance = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL,
            process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );
    }
    return supabaseInstance;
}

export async function POST(req: Request) {
    const body = await req.text();
    const signature = req.headers.get('stripe-signature') as string;

    const stripe = getStripe();
    const supabaseAdmin = getSupabase();

    if (!stripe || !supabaseAdmin) {
        return NextResponse.json({ error: 'Services not initialized' }, { status: 500 });
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
            const { error } = await supabaseAdmin
                .from('bookings')
                .update({ 
                    payment_status: 'paid',
                    status: 'confirmed',
                    stripe_payment_id: session.id as string
                })
                .eq('id', bookingId);

            if (error) {
                console.error('Error updating booking in webhook:', error);
                return NextResponse.json({ error: 'Database update failed' }, { status: 500 });
            }
        }
    }

    return NextResponse.json({ received: true });
}
