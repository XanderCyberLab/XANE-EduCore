import { prisma } from "@/lib/prisma";
import { hashSecret, normalizeEmail, verifySecret } from "./crypto";
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

export async function hasParentAccount() {
  const parent = await prisma.parentUser.findFirst({
    select: { id: true },
  });

  return Boolean(parent);
}

export async function createParentAccount(email: string, password: string, timezone = "America/Chicago") {
  const normalizedEmail = normalizeEmail(email);
  const normalizedPassword = password.trim();
  const normalizedTimezone = timezone.trim() || "America/Chicago";

  if (!normalizedEmail || !normalizedPassword) {
    return { ok: false as const, error: "Please enter your email and password." };
  }

  const [existingParentForEmail, anyExistingParent] = await Promise.all([
    prisma.parentUser.findUnique({
      where: { email: normalizedEmail },
      select: { id: true },
    }),
    prisma.parentUser.findFirst({
      select: { id: true },
    }),
  ]);

  if (existingParentForEmail) {
    return { ok: false as const, error: "That email already has a parent account. Sign in instead." };
  }

  if (anyExistingParent) {
    return { ok: false as const, error: "A parent account already exists for this EduCore install. Sign in instead." };
  }

  const parent = await prisma.parentUser.create({
    data: {
      email: normalizedEmail,
      passwordHash: hashSecret(normalizedPassword),
      timezone: normalizedTimezone,
    },
    select: {
      id: true,
      email: true,
      sessionVersion: true,
    },
  });

  await createParentSession({
    role: "parent",
    parentUserId: parent.id,
    email: parent.email,
    sessionVersion: parent.sessionVersion,
  });

  return { ok: true as const };
}
