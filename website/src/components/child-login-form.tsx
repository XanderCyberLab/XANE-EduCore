"use client";

import { useActionState } from "react";
import { childLoginAction, type ChildLoginState } from "@/app/child/login/actions";
import { AuthSubmitButton } from "@/components/auth-submit-button";

const initialState: ChildLoginState = {};

export function ChildLoginForm() {
  const [state, formAction] = useActionState(childLoginAction, initialState);

  return (
    <form action={formAction} className="space-y-4 rounded-[1.75rem] bg-white/90 p-5 shadow-sm">
      <div>
        <label htmlFor="username" className="text-sm font-semibold text-[var(--child-text)]">
          Child name
        </label>
        <input
          id="username"
          name="username"
          type="text"
          autoCapitalize="none"
          autoCorrect="off"
          required
          className="mt-2 w-full rounded-[1.25rem] border border-slate-200 bg-white px-4 py-3 text-base text-[var(--child-text)] outline-none placeholder:text-[var(--child-muted)]"
          placeholder="username"
          autoFocus
        />
      </div>
      <div>
        <label htmlFor="pin" className="text-sm font-semibold text-[var(--child-text)]">
          Code
        </label>
        <input
          id="pin"
          name="pin"
          type="password"
          inputMode="numeric"
          pattern="[0-9]{4,8}"
          required
          className="mt-2 w-full rounded-[1.25rem] border border-slate-200 bg-white px-4 py-3 text-base text-[var(--child-text)] outline-none placeholder:text-[var(--child-muted)]"
          placeholder="4 to 8 numbers"
          maxLength={8}
        />
      </div>
      {state.error ? <p className="text-sm text-rose-600">{state.error}</p> : null}
      <AuthSubmitButton label="Start" pendingLabel="Starting..." />
    </form>
  );
}
