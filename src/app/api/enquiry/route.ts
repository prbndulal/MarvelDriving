import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { fullName, email, phoneNumber, message } = body;

        const enquiry = await prisma.enquiry.create({
            data: {
                name: fullName,
                email: email,
                phone: phoneNumber,
                subject: `New Enquiry from ${fullName}`,
                message: message || "No message provided",
                status: "new",
                type: "general"
            }
        });

        return NextResponse.json({ success: true, id: enquiry.id });
    } catch (error: any) {
        console.error("ENQUIRY_API_ERROR", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
