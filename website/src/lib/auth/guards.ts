import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { readChildSession, readParentSession } from "./session";

export async function requireParentSession() {
  const session = await readParentSession();

  if (!session) {
    redirect("/parent/login");
  }

  const parent = await prisma.parentUser.findUnique({
    where: { id: session.parentUserId },
    select: { id: true, email: true, sessionVersion: true },
  });

  if (!parent || parent.sessionVersion !== session.sessionVersion) {
    redirect("/parent/login");
  }

  return session;
}

export async function requireChildSession() {
  const session = await readChildSession();

  if (!session) {
    redirect("/child/login");
  }

  const child = await prisma.childProfile.findUnique({
    where: { id: session.childProfileId },
    select: { id: true, sessionVersion: true, isArchived: true },
  });

  if (!child || child.isArchived || child.sessionVersion !== session.sessionVersion) {
    redirect("/child/login");
  }

  return session;
}
