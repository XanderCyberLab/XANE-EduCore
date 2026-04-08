"use client";

import { useActionState } from "react";
import { parentLoginAction, type ParentLoginState } from "@/app/parent/login/actions";
import { AuthSubmitButton } from "@/components/auth-submit-button";

const initialState: ParentLoginState = {};

export function ParentLoginForm() {
  const [state, formAction] = useActionState(parentLoginAction, initialState);

  return (
    <form action={formAction} className="space-y-4 rounded-3xl border border-white/10 bg-[var(--parent-surface-soft)] p-5">
      <div>
        <label htmlFor="email" className="text-sm font-semibold text-[var(--parent-text)]">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          autoCapitalize="none"
          autoCorrect="off"
          required
          className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/20 px-4 py-3 text-sm text-white outline-none ring-0 placeholder:text-slate-400"
          placeholder="parent@example.com"
        />
      </div>
      <div>
        <label htmlFor="password" className="text-sm font-semibold text-[var(--parent-text)]">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/20 px-4 py-3 text-sm text-white outline-none ring-0 placeholder:text-slate-400"
          placeholder="Your password"
        />
      </div>
      {state.error ? <p className="text-sm text-rose-300" role="alert">{state.error}</p> : null}
      <AuthSubmitButton label="Sign in" pendingLabel="Signing in..." className="bg-white text-slate-950" />
    </form>
  );
}
