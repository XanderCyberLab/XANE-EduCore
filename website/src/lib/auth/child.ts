import { prisma } from "@/lib/prisma";
import { normalizePin, normalizeUsername, verifySecret } from "./crypto";
import { createChildSession } from "./session";
import type { ChildSession } from "./types";

export async function authenticateChild(username: string, pin: string): Promise<ChildSession | null> {
  const normalizedUsername = normalizeUsername(username);
  const normalizedPin = normalizePin(pin);

  const child = await prisma.childProfile.findUnique({
    where: { username: normalizedUsername },
    select: {
      id: true,
      parentUserId: true,
      nickname: true,
      username: true,
      pinHash: true,
      isArchived: true,
      sessionVersion: true,
    },
  });

  if (!child || child.isArchived || !verifySecret(normalizedPin, child.pinHash)) {
    return null;
  }

  return {
    role: "child",
    childProfileId: child.id,
    parentUserId: child.parentUserId,
    username: child.username,
    nickname: child.nickname,
    sessionVersion: child.sessionVersion,
  };
}

export async function signInChild(username: string, pin: string) {
  const session = await authenticateChild(username, pin);

  if (!session) {
    return { ok: false as const, error: "That name and code didn't match a child profile." };
  }

  await createChildSession(session);

  return { ok: true as const };
}
