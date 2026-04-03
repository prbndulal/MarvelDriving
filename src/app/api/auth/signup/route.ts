import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { email, password, name } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ error: "Missing fields" }, { status: 400 });
        }

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        // Create the user
        // NOTE: You should hash the password before saving in production!
        const user = await prisma.user.create({
            data: {
                email,
                password, // In a real app, use bcrypt.hash(password)
                name,
                role: email === "admin@marveldriving.com.au" ? "admin" : "user"
            }
        });

        return NextResponse.json({ user: { email: user.email, name: user.name } });
    } catch (error: any) {
        console.error("SIGNUP_ERROR", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
