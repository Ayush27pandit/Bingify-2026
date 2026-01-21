import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
    const cookieStore = await cookies();

    // Force delete the session cookie
    cookieStore.delete("session");

    // Also try setting it to empty with past expiry just to be safe
    cookieStore.set("session", "", { expires: new Date(0), path: "/" });

    return NextResponse.json({ success: true });
}
