import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const {
            customerName,
            customerEmail,
            customerPhone,
            serviceName,
            date,
            time,
            notes,
            suburb,
            ndisNumber
        } = body;

        // 1. Conflict Check
        const existing = await prisma.booking.findFirst({
            where: {
                date: new Date(date),
                time: time,
                status: { not: 'cancelled' }
            }
        });

        if (existing) {
            return NextResponse.json({ error: "This time slot is already booked." }, { status: 400 });
        }

        // 2. Create the Booking
        const booking = await prisma.booking.create({
            data: {
                customerName,
                customerEmail,
                customerPhone,
                serviceName,
                servicePrice: 0, // NDIS/Funded
                date: new Date(date),
                time: time,
                status: 'pending',
                paymentStatus: 'unpaid',
            }
        });

        return NextResponse.json({ success: true, bookingId: booking.id });
    } catch (error: any) {
        console.error("UNPAID_BOOKING_ERROR", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
