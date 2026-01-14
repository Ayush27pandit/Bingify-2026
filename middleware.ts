import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const session = req.cookies.get("session");
  const pathname = req.nextUrl.pathname;

  //user not logged in
  if (!session && pathname.startsWith("/start")) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  if (!session && pathname.startsWith("/lobby")) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }
  //  User is logged in → block /login
  if (session && pathname === "/auth") {
    return NextResponse.redirect(new URL("/start", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/auth", "/lobby/:path*", "/start/:path*"],
};
