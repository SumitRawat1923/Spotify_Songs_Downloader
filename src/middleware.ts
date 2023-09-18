import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  if (path.startsWith("/login") && !!token) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }
  if (
    (path.startsWith("/collection") ||
      path.startsWith("/profile") ||
      path.startsWith("/search/:path") ||
      path.startsWith("/genre")) &&
    !token
  ) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/collection/:path*", "/search", "/genre"],
};
