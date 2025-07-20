import { signUpSchema } from "@/lib/types";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt"


export async function POST(req: Request) {
    const body = await req.json();
    const validation = signUpSchema.safeParse(body);
    if (!validation.success) {
        return new Response(JSON.stringify({ error: "Invalid input" }), { status: 400 });
    }

    try {
        // Check if user already exists
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: validation.data.email },
                    { username: validation.data.username }
                ]
            }
        });

        if (existingUser) {
            if (existingUser.email === validation.data.email) {
                return new Response(JSON.stringify({ error: "Email already exists" }), { status: 409 });
            }
            if (existingUser.username === validation.data.username) {
                return new Response(JSON.stringify({ error: "Username already exists" }), { status: 409 });
            }
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
    } catch (error) {
        console.error("Sign-up error:", error);
        return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
    }
}
