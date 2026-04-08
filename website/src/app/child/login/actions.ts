"use server";

import { redirect } from "next/navigation";
import { signInChild } from "@/lib/auth/child";

export type ChildLoginState = {
  error?: string;
};

export async function childLoginAction(_: ChildLoginState, formData: FormData): Promise<ChildLoginState> {
  const username = String(formData.get("username") ?? "").trim();
  const pin = String(formData.get("pin") ?? "");

  if (!username || !pin.trim()) {
    return { error: "Please enter the child username and PIN." };
  }

  const result = await signInChild(username, pin);

  if (!result.ok) {
    return { error: result.error };
  }

  redirect("/child/home");
}
