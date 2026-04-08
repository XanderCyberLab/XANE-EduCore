import { prisma } from "@/lib/prisma";
import { normalizeEmail, verifySecret } from "./crypto";
import { createParentSession } from "./session";
import type { ParentSession } from "./types";

export async function authenticateParent(email: string, password: string): Promise<ParentSession | null> {
  const normalizedEmail = normalizeEmail(email);
  const normalizedPassword = password.trim();

  if (!normalizedEmail || !normalizedPassword) {
    return null;
  }

  const parent = await prisma.parentUser.findUnique({
    where: { email: normalizedEmail },
    select: {
      id: true,
      email: true,
      passwordHash: true,
      sessionVersion: true,
    },
  });

  if (!parent || !parent.passwordHash || !verifySecret(normalizedPassword, parent.passwordHash)) {
    return null;
  }

  return {
    role: "parent",
    parentUserId: parent.id,
    email: parent.email,
    sessionVersion: parent.sessionVersion,
  };
}

export async function signInParent(email: string, password: string) {
  const session = await authenticateParent(email, password);

  if (!session) {
    return { ok: false as const, error: "We couldn't sign you in with that email and password." };
  }

  await createParentSession(session);

  return { ok: true as const };
}
