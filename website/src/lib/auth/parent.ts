import { randomUUID } from "node:crypto";
import { prisma } from "@/lib/prisma";
import { hashSecret, normalizeEmail, normalizeUsername, verifySecret } from "./crypto";
import { createParentSession } from "./session";
import type { ParentSession } from "./types";

const PARENT_USERNAME_PATTERN = /^[a-z0-9](?:[a-z0-9-]{1,22}[a-z0-9])?$/;

function buildParentUsernameBase(email: string) {
  const emailLocalPart = normalizeEmail(email).split("@")[0] ?? "";
  const sanitized = emailLocalPart
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  const base = (sanitized || "parent").slice(0, 24).replace(/-+$/g, "");

  if (PARENT_USERNAME_PATTERN.test(base)) {
    return base;
  }

  const normalizedBase = normalizeUsername(base)
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "");

  if (PARENT_USERNAME_PATTERN.test(normalizedBase)) {
    return normalizedBase;
  }

  return "parent";
}

async function generateUniqueParentUsername(email: string) {
  const base = buildParentUsernameBase(email);

  for (let attempt = 0; attempt < 100; attempt += 1) {
    const suffix = attempt === 0 ? "" : `-${attempt + 1}`;
    const maxBaseLength = 24 - suffix.length;
    const candidate = `${base.slice(0, maxBaseLength).replace(/-+$/g, "")}${suffix}`;

    if (!PARENT_USERNAME_PATTERN.test(candidate)) {
      continue;
    }

    const existingParent = await prisma.parentUser.findUnique({
      where: { username: candidate },
      select: { id: true },
    });

    if (!existingParent) {
      return candidate;
    }
  }

  return `parent-${randomUUID().slice(0, 8)}`;
}

export async function authenticateParent(identifier: string, password: string): Promise<ParentSession | null> {
  const normalizedIdentifier = identifier.includes("@") ? normalizeEmail(identifier) : normalizeUsername(identifier);
  const normalizedPassword = password.trim();

  if (!normalizedIdentifier || !normalizedPassword) {
    return null;
  }

  const parent = await prisma.parentUser.findFirst({
    where: identifier.includes("@")
      ? { email: normalizedIdentifier }
      : {
          OR: [{ username: normalizedIdentifier }, { email: normalizedIdentifier }],
        },
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

export async function signInParent(identifier: string, password: string) {
  const session = await authenticateParent(identifier, password);

  if (!session) {
    return { ok: false as const, error: "We couldn't sign you in with that email or username and password." };
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

  const existingParentForEmail = await prisma.parentUser.findUnique({
    where: { email: normalizedEmail },
    select: { id: true },
  });

  if (existingParentForEmail) {
    return { ok: false as const, error: "That email already has a parent account. Sign in instead." };
  }

  const username = await generateUniqueParentUsername(normalizedEmail);

  const parent = await prisma.parentUser.create({
    data: {
      email: normalizedEmail,
      username,
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
