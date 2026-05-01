"use client";

import { useActionState } from "react";
import { createChildProfileAction, type CreateChildProfileState } from "@/app/parent/children/actions";
import { AuthSubmitButton } from "@/components/auth-submit-button";

const initialState: CreateChildProfileState = {};

type ParentChildCreateFormProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  redirectTo?: string;
  submitLabel?: string;
  pendingLabel?: string;
};

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-2 text-xs text-rose-300">{message}</p>;
}

export function ParentChildCreateForm({
  eyebrow = "Add child",
  title = "Create a calm, privacy-first child profile",
  description = "Keep setup light. Just add the nickname they know, a simple username, and a parent-managed PIN for child login.",
  redirectTo,
  submitLabel = "Create child profile",
  pendingLabel = "Creating profile...",
}: ParentChildCreateFormProps = {}) {
  const [state, formAction] = useActionState(createChildProfileAction, initialState);

  return (
    <form action={formAction} className="space-y-5 rounded-[var(--radius-card)] border border-white/10 bg-[var(--parent-surface)] p-6 shadow-[var(--shadow-soft)]">
      {redirectTo ? <input type="hidden" name="redirectTo" value={redirectTo} /> : null}
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--parent-muted)]">{eyebrow}</p>
        <h2 className="text-2xl font-semibold text-white">{title}</h2>
        <p className="max-w-2xl text-sm leading-7 text-[var(--parent-muted)]">{description}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="nickname" className="text-sm font-semibold text-white">Nickname</label>
          <input
            id="nickname"
            name="nickname"
            type="text"
            required
            maxLength={40}
            className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/20 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-400"
            placeholder="Junie"
          />
          <FieldError message={state.fields?.nickname} />
        </div>

        <div>
          <label htmlFor="ageBand" className="text-sm font-semibold text-white">Age band, optional</label>
          <select
            id="ageBand"
            name="ageBand"
            defaultValue=""
            className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/20 px-4 py-3 text-sm text-white outline-none"
          >
            <option value="">Keep open for now</option>
            <option value="EARLY_YEARS">Early years</option>
            <option value="LOWER_ELEMENTARY">Lower elementary</option>
            <option value="UPPER_ELEMENTARY">Upper elementary</option>
          </select>
          <FieldError message={state.fields?.ageBand} />
        </div>

        <div>
          <label htmlFor="username" className="text-sm font-semibold text-white">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            autoCapitalize="none"
            autoCorrect="off"
            required
            minLength={3}
            maxLength={24}
            className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/20 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-400"
            placeholder="junie-sky"
          />
          <p className="mt-2 text-xs text-[var(--parent-muted)]">Lowercase letters, numbers, and hyphens only.</p>
          <FieldError message={state.fields?.username} />
        </div>

        <div>
          <label htmlFor="pin" className="text-sm font-semibold text-white">PIN</label>
          <input
            id="pin"
            name="pin"
            type="password"
            inputMode="numeric"
            pattern="[0-9]{4,8}"
            required
            maxLength={8}
            className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/20 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-400"
            placeholder="4 to 8 digits"
          />
          <FieldError message={state.fields?.pin} />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="parentNotes" className="text-sm font-semibold text-white">Planning notes, optional</label>
          <textarea
            id="parentNotes"
            name="parentNotes"
            rows={4}
            maxLength={600}
            className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/20 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-400"
            placeholder="Short notes that help future planning stay realistic, like pacing, interests, helpful supports, or sensitivities."
          />
          <p className="mt-2 text-xs text-[var(--parent-muted)]">Parent-authored only. Keep it short and practical for planning.</p>
          <FieldError message={state.fields?.parentNotes} />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="pinConfirm" className="text-sm font-semibold text-white">Confirm PIN</label>
          <input
            id="pinConfirm"
            name="pinConfirm"
            type="password"
            inputMode="numeric"
            pattern="[0-9]{4,8}"
            required
            maxLength={8}
            className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/20 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-400 md:max-w-sm"
            placeholder="Enter the PIN again"
          />
          <FieldError message={state.fields?.pinConfirm} />
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bg-[var(--parent-surface-soft)] p-4 text-sm leading-7 text-[var(--parent-muted)]">
        EduCore stores the child PIN as a secure hash, keeps identity nickname-first, and limits planning context to a short parent-authored note instead of a heavy profile system.
      </div>

      {state.error ? <p className="text-sm text-rose-300">{state.error}</p> : null}
      {state.success ? <p className="text-sm text-emerald-300">{state.success}</p> : null}

      <AuthSubmitButton label={submitLabel} pendingLabel={pendingLabel} className="bg-white text-slate-950" />
    </form>
  );
}
