"use server";

import { redirect } from "next/navigation";
import { signInParent } from "@/lib/auth/parent";

export type ParentLoginState = {
  error?: string;
};

export async function parentLoginAction(_: ParentLoginState, formData: FormData): Promise<ParentLoginState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password.trim()) {
    return { error: "Please enter your email and password." };
  }

  const result = await signInParent(email, password);

  if (!result.ok) {
    return { error: result.error };
  }

  redirect("/parent/dashboard");
}
