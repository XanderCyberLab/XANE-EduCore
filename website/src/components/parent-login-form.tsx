"use client";

import { useActionState } from "react";
import { parentCreateAccountAction, parentLoginAction, type ParentLoginState } from "@/app/parent/login/actions";
import { AuthSubmitButton } from "@/components/auth-submit-button";

const initialState: ParentLoginState = {};

export function ParentLoginForm({ hasExistingParentAccount }: { hasExistingParentAccount: boolean }) {
  const [signInState, signInAction] = useActionState(parentLoginAction, initialState);
  const [createState, createAction] = useActionState(parentCreateAccountAction, initialState);

  return (
    <div className="grid gap-4 xl:grid-cols-2">
      <section className={`space-y-4 rounded-3xl border p-5 transition ${hasExistingParentAccount ? "border-white/20 bg-[var(--parent-surface-soft)] shadow-[0_0_0_1px_rgba(255,255,255,0.06)]" : "border-white/10 bg-[var(--parent-surface-soft)]"}`}>
        <div className="rounded-2xl border border-white/10 bg-slate-950/10 px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--parent-muted)]">Sign in</p>
          <h2 className="mt-2 text-lg font-semibold text-[var(--parent-text)]">Return to your parent dashboard</h2>
          <p className="mt-1 text-sm leading-6 text-[var(--parent-muted)]">
            Use your existing parent email or username with your password to continue where you left off.
          </p>
        </div>

        <form action={signInAction} className="space-y-4">
          <div>
            <label htmlFor="signin-identifier" className="text-sm font-semibold text-[var(--parent-text)]">
              Email or username
            </label>
            <input
              id="signin-identifier"
              name="identifier"
              type="text"
              autoComplete="username"
              autoCapitalize="none"
              autoCorrect="off"
              required
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/20 px-4 py-3 text-sm text-white outline-none ring-0 placeholder:text-slate-400"
              placeholder="parent@example.com or xander"
              autoFocus={hasExistingParentAccount}
            />
          </div>
          <div>
            <label htmlFor="signin-password" className="text-sm font-semibold text-[var(--parent-text)]">
              Password
            </label>
            <input
              id="signin-password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/20 px-4 py-3 text-sm text-white outline-none ring-0 placeholder:text-slate-400"
              placeholder="Your password"
            />
          </div>
          {signInState.error ? <p className="text-sm text-rose-300" role="alert">{signInState.error}</p> : null}
          <div className="space-y-3">
            <AuthSubmitButton label="Sign in" pendingLabel="Signing in..." className="bg-white text-slate-950" />
            <p className="text-sm leading-6 text-[var(--parent-muted)]">
              Returning parent accounts can sign in here with either email or username, without switching modes or losing the create-account path.
            </p>
          </div>
        </form>
      </section>

      <section className="space-y-4 rounded-3xl border border-emerald-400/40 bg-emerald-500/10 p-5 shadow-[0_0_0_1px_rgba(52,211,153,0.12)] transition">
        <div className="rounded-2xl border border-emerald-300/30 bg-emerald-400/10 px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--parent-muted)]">Create account</p>
          <h2 className="mt-2 text-lg font-semibold text-[var(--parent-text)]">Create a new parent account</h2>
          <p className="mt-1 text-sm leading-6 text-[var(--parent-muted)]">
            Add another parent account for this EduCore install and sign in immediately after creation.
          </p>
        </div>

        <form action={createAction} className="space-y-4">
          <div>
            <label htmlFor="create-email" className="text-sm font-semibold text-[var(--parent-text)]">
              Email
            </label>
            <input
              id="create-email"
              name="email"
              type="email"
              autoComplete="email"
              autoCapitalize="none"
              autoCorrect="off"
              required
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/20 px-4 py-3 text-sm text-white outline-none ring-0 placeholder:text-slate-400"
              placeholder="parent@example.com"
              autoFocus={!hasExistingParentAccount}
            />
          </div>
          <div>
            <label htmlFor="create-password" className="text-sm font-semibold text-[var(--parent-text)]">
              Password
            </label>
            <input
              id="create-password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              minLength={8}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/20 px-4 py-3 text-sm text-white outline-none ring-0 placeholder:text-slate-400"
              placeholder="At least 8 characters"
            />
          </div>
          <input type="hidden" name="timezone" value="America/Chicago" />
          {createState.error ? <p className="text-sm text-rose-300" role="alert">{createState.error}</p> : null}
          <div className="space-y-3">
            <AuthSubmitButton
              label="Create parent account"
              pendingLabel="Creating parent account..."
              className="bg-emerald-300 text-emerald-950"
            />
            <p className="text-sm leading-6 text-[var(--parent-muted)]">
              This path still requires email for account identity, and the parent username defaults to the part before the @ for easier sign-in.
            </p>
          </div>
        </form>
      </section>
    </div>
  );
}
