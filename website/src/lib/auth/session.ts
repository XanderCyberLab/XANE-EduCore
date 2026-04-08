import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { authConfig, requireAuthSecret } from "./config";
import type { AuthSessionClaims, ChildSession, ChildSessionClaims, ParentSession, ParentSessionClaims } from "./types";

const encoder = new TextEncoder();

function secretKey() {
  return encoder.encode(requireAuthSecret());
}

async function signToken(claims: AuthSessionClaims, maxAge: number) {
  return new SignJWT(claims)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setIssuer(authConfig.issuer)
    .setExpirationTime(`${maxAge}s`)
    .sign(secretKey());
}

async function verifyToken<T extends AuthSessionClaims>(token: string | undefined) {
  if (!token) {
    return null;
  }

  try {
    const verified = await jwtVerify<T>(token, secretKey(), {
      issuer: authConfig.issuer,
    });

    return verified.payload;
  } catch {
    return null;
  }
}

export async function createParentSession(session: ParentSession) {
  const token = await signToken(
    {
      role: "parent",
      sub: session.parentUserId,
      email: session.email,
      sessionVersion: session.sessionVersion,
    },
    authConfig.parentSessionMaxAge,
  );

  const cookieStore = await cookies();
  cookieStore.set(authConfig.parentCookieName, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: authConfig.parentSessionMaxAge,
  });
  cookieStore.delete(authConfig.childCookieName);
}

export async function createChildSession(session: ChildSession) {
  const token = await signToken(
    {
      role: "child",
      sub: session.childProfileId,
      parentUserId: session.parentUserId,
      username: session.username,
      nickname: session.nickname,
      sessionVersion: session.sessionVersion,
    },
    authConfig.childSessionMaxAge,
  );

  const cookieStore = await cookies();
  cookieStore.set(authConfig.childCookieName, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: authConfig.childSessionMaxAge,
  });
  cookieStore.delete(authConfig.parentCookieName);
}

export async function clearParentSession() {
  const cookieStore = await cookies();
  cookieStore.delete(authConfig.parentCookieName);
}

export async function clearChildSession() {
  const cookieStore = await cookies();
  cookieStore.delete(authConfig.childCookieName);
}

export async function readParentSession() {
  const cookieStore = await cookies();
  const claims = await verifyToken<ParentSessionClaims>(cookieStore.get(authConfig.parentCookieName)?.value);

  if (!claims || claims.role !== "parent") {
    return null;
  }

  return {
    role: "parent",
    parentUserId: claims.sub,
    email: claims.email,
    sessionVersion: claims.sessionVersion,
  } satisfies ParentSession;
}

export async function readChildSession() {
  const cookieStore = await cookies();
  const claims = await verifyToken<ChildSessionClaims>(cookieStore.get(authConfig.childCookieName)?.value);

  if (!claims || claims.role !== "child") {
    return null;
  }

  return {
    role: "child",
    childProfileId: claims.sub,
    parentUserId: claims.parentUserId,
    username: claims.username,
    nickname: claims.nickname,
    sessionVersion: claims.sessionVersion,
  } satisfies ChildSession;
}

export async function readAnySession() {
  const [parentSession, childSession] = await Promise.all([readParentSession(), readChildSession()]);
  return parentSession ?? childSession;
}
