import { jwtVerify } from "jose";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const AUTH_ISSUER = "educore";
const PARENT_COOKIE = "educore_parent_session";
const CHILD_COOKIE = "educore_child_session";
const encoder = new TextEncoder();

async function hasValidSessionToken(token: string | undefined, secret: string | undefined) {
  if (!token || !secret) {
    return false;
  }

  try {
    await jwtVerify(token, encoder.encode(secret), { issuer: AUTH_ISSUER });
    return true;
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authSecret = process.env.AUTH_SECRET;

  if (!authSecret) {
    return NextResponse.next();
  }

  const parentToken = request.cookies.get(PARENT_COOKIE)?.value;
  const childToken = request.cookies.get(CHILD_COOKIE)?.value;
  const [hasParentSession, hasChildSession] = await Promise.all([
    hasValidSessionToken(parentToken, authSecret),
    hasValidSessionToken(childToken, authSecret),
  ]);

  if (pathname === "/parent/login" && hasParentSession) {
    return NextResponse.redirect(new URL("/parent/dashboard", request.url));
  }

  if (pathname === "/child/login" && hasChildSession) {
    return NextResponse.redirect(new URL("/child/home", request.url));
  }

  if (pathname.startsWith("/parent") && pathname !== "/parent/login" && !hasParentSession) {
    return NextResponse.redirect(new URL("/parent/login", request.url));
  }

  if (pathname.startsWith("/child") && pathname !== "/child/login" && !hasChildSession) {
    return NextResponse.redirect(new URL("/child/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/parent/:path*", "/child/:path*"],
};
