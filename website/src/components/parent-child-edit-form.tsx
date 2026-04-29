"use client";

import { useActionState } from "react";
import {
  updateChildCredentialsAction,
  updateChildProfileAction,
  type UpdateChildCredentialsState,
  type UpdateChildProfileState,
} from "@/app/parent/children/actions";
import { AuthSubmitButton } from "@/components/auth-submit-button";

type ParentChildEditFormProps = {
  child: {
    id: string;
    name: string;
    ageLabel: string;
    username: string;
  };
};

const initialProfileState: UpdateChildProfileState = {};
const initialCredentialsState: UpdateChildCredentialsState = {};

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-2 text-xs text-rose-300">{message}</p>;
}

function ageBandValueFromLabel(label: string) {
  if (label === "Early years") return "EARLY_YEARS";
  if (label === "Lower elementary") return "LOWER_ELEMENTARY";
  if (label === "Upper elementary") return "UPPER_ELEMENTARY";
  return "";
}

export function ParentChildEditForm({ child }: ParentChildEditFormProps) {
  const [profileState, profileAction] = useActionState(updateChildProfileAction, initialProfileState);
  const [credentialsState, credentialsAction] = useActionState(updateChildCredentialsAction, initialCredentialsState);

  return (
    <div className="grid gap-4 xl:grid-cols-2">
      <form action={profileAction} className="rounded-3xl border border-white/10 bg-slate-950/20 p-5">
        <input type="hidden" name="childId" value={child.id} />
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--parent-muted)]">Edit profile</p>
          <h3 className="text-lg font-semibold text-white">Keep the child profile light and familiar</h3>
          <p className="text-sm leading-6 text-[var(--parent-muted)]">Update the nickname they recognize and the age band that helps planning stay realistic.</p>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor={`nickname-${child.id}`} className="text-sm font-semibold text-white">Nickname</label>
            <input
              id={`nickname-${child.id}`}
              name="nickname"
              type="text"
              required
              maxLength={40}
              defaultValue={child.name}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/30 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-400"
            />
            <FieldError message={profileState.fields?.nickname} />
          </div>

          <div>
            <label htmlFor={`ageBand-${child.id}`} className="text-sm font-semibold text-white">Age band</label>
            <select
              id={`ageBand-${child.id}`}
              name="ageBand"
              defaultValue={ageBandValueFromLabel(child.ageLabel)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/30 px-4 py-3 text-sm text-white outline-none"
            >
              <option value="">Keep open for now</option>
              <option value="EARLY_YEARS">Early years</option>
              <option value="LOWER_ELEMENTARY">Lower elementary</option>
              <option value="UPPER_ELEMENTARY">Upper elementary</option>
            </select>
            <FieldError message={profileState.fields?.ageBand} />
          </div>
        </div>

        {profileState.error ? <p className="mt-4 text-sm text-rose-300">{profileState.error}</p> : null}
        {profileState.success ? <p className="mt-4 text-sm text-emerald-300">{profileState.success}</p> : null}

        <div className="mt-4">
          <AuthSubmitButton label="Save profile" pendingLabel="Saving profile..." className="bg-white text-slate-950" />
        </div>
      </form>

      <form action={credentialsAction} className="rounded-3xl border border-white/10 bg-slate-950/20 p-5">
        <input type="hidden" name="childId" value={child.id} />
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--parent-muted)]">Login details</p>
          <h3 className="text-lg font-semibold text-white">Adjust username or rotate the PIN</h3>
          <p className="text-sm leading-6 text-[var(--parent-muted)]">Only enter a new PIN when you want to replace the current one. EduCore stores it as a secure hash and does not show it back.</p>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <label htmlFor={`username-${child.id}`} className="text-sm font-semibold text-white">Username</label>
            <input
              id={`username-${child.id}`}
              name="username"
              type="text"
              autoCapitalize="none"
              autoCorrect="off"
              required
              minLength={3}
              maxLength={24}
              defaultValue={child.username}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/30 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-400"
            />
            <p className="mt-2 text-xs text-[var(--parent-muted)]">Lowercase letters, numbers, and hyphens only.</p>
            <FieldError message={credentialsState.fields?.username} />
          </div>

          <div>
            <label htmlFor={`pin-${child.id}`} className="text-sm font-semibold text-white">New PIN, optional</label>
            <input
              id={`pin-${child.id}`}
              name="pin"
              type="password"
              inputMode="numeric"
              pattern="[0-9]{4,8}"
              maxLength={8}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/30 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-400"
              placeholder="Leave blank to keep current PIN"
            />
            <FieldError message={credentialsState.fields?.pin} />
          </div>

          <div>
            <label htmlFor={`pinConfirm-${child.id}`} className="text-sm font-semibold text-white">Confirm new PIN</label>
            <input
              id={`pinConfirm-${child.id}`}
              name="pinConfirm"
              type="password"
              inputMode="numeric"
              pattern="[0-9]{4,8}"
              maxLength={8}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/30 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-400"
              placeholder="Repeat the new PIN"
            />
            <FieldError message={credentialsState.fields?.pinConfirm} />
          </div>
        </div>

        {credentialsState.error ? <p className="mt-4 text-sm text-rose-300">{credentialsState.error}</p> : null}
        {credentialsState.success ? <p className="mt-4 text-sm text-emerald-300">{credentialsState.success}</p> : null}

        <div className="mt-4">
          <AuthSubmitButton label="Save login details" pendingLabel="Saving login..." className="bg-white text-slate-950" />
        </div>
      </form>
    </div>
  );
}
