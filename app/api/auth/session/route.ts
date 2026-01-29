
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
    const authHeader = req.headers.get("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return NextResponse.json({ message: "No token provided" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];

    try {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
        if (!backendUrl) {
            console.error("NEXT_PUBLIC_BACKEND_URL is not defined");
            return NextResponse.json({ message: "Server configuration error" }, { status: 500 });
        }

        const response = await fetch(`${backendUrl}/auth/session`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json(data, { status: response.status });
        }

        // Set the cookie on the frontend domain
        // The backend verified the token, so we can trust it.
        // We use the same token as the session cookie.

        (await cookies()).set("session", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            path: "/",
            maxAge: 60 * 60 * 24 * 5, // 5 days
        });

        return NextResponse.json({ success: true, user: data.user });

    } catch (error) {
        console.error("Proxy error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
