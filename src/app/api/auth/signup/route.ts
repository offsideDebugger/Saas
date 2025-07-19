import { signUpSchema } from "@/lib/types";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt"


export async function POST(req: Request) {
    const body = await req.json();
    const validation = signUpSchema.safeParse(body);
    if (!validation.success) {
        return new Response(JSON.stringify({ error: "Invalid input" }), { status: 400 });
    }
    const hashedPassword = await bcrypt.hash(validation.data.password, 10);
    const user = await prisma.user.create({
        data: {
            username: validation.data.username,
            email: validation.data.email,
            password: hashedPassword,
        },
    });

    if (!user) {
        return new Response(JSON.stringify({ error: "User creation failed" }), { status: 500 });
    }

    return new Response(JSON.stringify({ message: "User created successfully" }), { status: 200 });
}
