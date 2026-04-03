import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    const email = "admin@marveldriving.com.au";
    const password = "admin_password_123"; // CHANGE THIS LATER!
    const name = "Admin User";

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.upsert({
        where: { email },
        update: {
            password: hashedPassword,
            role: "admin",
            name: name
        },
        create: {
            email,
            password: hashedPassword,
            role: "admin",
            name: name
        },
    });

    console.log("-----------------------------------------");
    console.log("✅ Admin user created/updated!");
    console.log(`Email: ${user.email}`);
    console.log(`Role:  ${user.role}`);
    console.log("-----------------------------------------");
}

main()
    .catch((e) => {
        console.error("❌ Error seeding admin:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
