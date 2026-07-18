import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET() {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Sign a JWT token valid for 1 hour containing user info
    const token = jwt.sign(
        { id: session.user.id, email: session.user.email, name: session.user.name },
        process.env.BETTER_AUTH_SECRET,
        { expiresIn: "1h" }
    );

    return NextResponse.json({ token });
}
