"use client";

import { useActionState, useState } from "react";
import { parentCreateAccountAction, parentLoginAction, type ParentLoginState } from "@/app/parent/login/actions";
import { AuthSubmitButton } from "@/components/auth-submit-button";

const initialState: ParentLoginState = {};

export function ParentLoginForm({ hasExistingParentAccount }: { hasExistingParentAccount: boolean }) {
  const [mode, setMode] = useState<"signin" | "create">(hasExistingParentAccount ? "signin" : "create");
  const [signInState, signInAction] = useActionState(parentLoginAction, initialState);
  const [createState, createAction] = useActionState(parentCreateAccountAction, initialState);

  const isCreateMode = mode === "create";
  const state = isCreateMode ? createState : signInState;

  return (
    <div className="space-y-4 rounded-3xl border border-white/10 bg-[var(--parent-surface-soft)] p-5">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setMode("signin")}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
            !isCreateMode ? "bg-white text-slate-950" : "border border-white/10 text-[var(--parent-muted)] hover:text-white"
          }`}
        >
          Sign in
        </button>
        <button
          type="button"
          onClick={() => setMode("create")}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
            isCreateMode ? "bg-white text-slate-950" : "border border-white/10 text-[var(--parent-muted)] hover:text-white"
          }`}
        >
          Create parent account
        </button>
      </div>

      <form action={isCreateMode ? createAction : signInAction} className="space-y-4">
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
            autoFocus
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
            autoComplete={isCreateMode ? "new-password" : "current-password"}
            required
            minLength={isCreateMode ? 8 : 1}
            className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/20 px-4 py-3 text-sm text-white outline-none ring-0 placeholder:text-slate-400"
            placeholder={isCreateMode ? "At least 8 characters" : "Your password"}
          />
        </div>
        {isCreateMode ? <input type="hidden" name="timezone" value="America/Chicago" /> : null}
        {state.error ? <p className="text-sm text-rose-300" role="alert">{state.error}</p> : null}
        <div className="space-y-3">
          <AuthSubmitButton
            label={isCreateMode ? "Create account" : "Sign in"}
            pendingLabel={isCreateMode ? "Creating account..." : "Signing in..."}
            className="bg-white text-slate-950"
          />
          <p className="text-sm leading-6 text-[var(--parent-muted)]">
            {isCreateMode
              ? "This creates a parent account on this EduCore install and signs you in right away."
              : hasExistingParentAccount
                ? "Use an existing parent email and password, or switch tabs to create another parent account."
                : "If this is your first time here, create a parent account to begin setup."}
          </p>
        </div>
      </form>
    </div>
  );
}
