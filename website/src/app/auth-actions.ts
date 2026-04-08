"use server";

import { redirect } from "next/navigation";
import { clearChildSession, clearParentSession } from "@/lib/auth/session";

export async function signOutParent() {
  await clearParentSession();
  redirect("/parent/login");
}

export async function signOutChild() {
  await clearChildSession();
  redirect("/child/login");
}
