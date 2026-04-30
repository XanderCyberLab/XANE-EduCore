"use server";

import { redirect } from "next/navigation";
import { createParentAccount, signInParent } from "@/lib/auth/parent";

export type ParentLoginState = {
  error?: string;
};

function readCredentials(formData: FormData) {
  return {
    email: String(formData.get("email") ?? "").trim(),
    password: String(formData.get("password") ?? ""),
  };
}

export async function parentLoginAction(_: ParentLoginState, formData: FormData): Promise<ParentLoginState> {
  const { email, password } = readCredentials(formData);

  if (!email || !password.trim()) {
    return { error: "Please enter your email and password." };
  }

  const result = await signInParent(email, password);

  if (!result.ok) {
    return { error: result.error };
  }

  redirect("/parent/dashboard");
}

export async function parentCreateAccountAction(_: ParentLoginState, formData: FormData): Promise<ParentLoginState> {
  const { email, password } = readCredentials(formData);
  const timezone = String(formData.get("timezone") ?? "America/Chicago");

  if (!email || !password.trim()) {
    return { error: "Please enter your email and password." };
  }

  if (password.trim().length < 8) {
    return { error: "Use at least 8 characters so the parent account starts with a safer password." };
  }

  const result = await createParentAccount(email, password, timezone);

  if (!result.ok) {
    return { error: result.error };
  }

  redirect("/parent/onboarding");
}
