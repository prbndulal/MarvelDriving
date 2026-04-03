import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Fetch all rules
export async function GET() {
    try {
        const rules = await prisma.availability.findMany({
            orderBy: { dayOfWeek: 'asc' }
        });
        return NextResponse.json({ rules });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// Bulk update rules
export async function POST(req: Request) {
    try {
        const { schedules } = await req.json();

        // Use a transaction for bulk update
        const updates = schedules.map((s: any) => 
            prisma.availability.upsert({
                where: { dayOfWeek: s.dayOfWeek },
                update: {
                    startTime: s.startTime,
                    endTime: s.endTime,
                    isActive: s.isActive
                },
                create: {
                    dayOfWeek: s.dayOfWeek,
                    startTime: s.startTime,
                    endTime: s.endTime,
                    isActive: s.isActive
                }
            })
        );

        await Promise.all(updates);

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("AVAILABILITY_UPDATE_ERROR", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
