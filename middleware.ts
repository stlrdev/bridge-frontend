import { getHomeRoute, canAccessRoute } from "@/core/rbac/config";
import { UserRole } from "@/core/types";
import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";

const PUBLIC_URLS = ["/login", "/register", "/forgot-password", "/api/auth"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (PUBLIC_URLS.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    const url = new URL("/login", req.url);
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }

  const role = token.role as UserRole;

  if (pathname === "/login" || pathname === "/") {
    return NextResponse.redirect(new URL(getHomeRoute(role), req.url));
  }

  if (!canAccessRoute(role, pathname)) {
    return NextResponse.redirect(new URL(getHomeRoute(role), req.url));
  }

  const headers = new Headers(req.headers);
  headers.set("x-user-role", role);
  headers.set("x-user-id", token.sub ?? "");

  return NextResponse.next({ headers });
}

export const config = {
  matchers: ["/((?!_next/static|_next/image|favicon.ico|images|fonts).*)"],
};
