"use client";

import { useActionState } from "react";
import { saveWeeklyPlanAction, type SaveWeeklyPlanState } from "@/app/parent/planner/actions";
import { AuthSubmitButton } from "@/components/auth-submit-button";

const initialState: SaveWeeklyPlanState = {};

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-2 text-xs text-rose-300">{message}</p>;
}

export function ParentPlannerCreateForm({
  plannerChildren,
  defaultWeekOf,
}: {
  plannerChildren: Array<{ id: string; nickname: string; ageLabel: string; hasPlan: boolean }>;
  defaultWeekOf: string;
}) {
  const [state, formAction] = useActionState(saveWeeklyPlanAction, initialState);

  return (
    <form action={formAction} className="rounded-[var(--radius-card)] border border-white/10 bg-[var(--parent-surface)] p-6 shadow-[var(--shadow-soft)]">
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--parent-muted)]">Create or generate week</p>
        <h2 className="text-2xl font-semibold text-white">Build a calm weekly plan inside EduCore</h2>
        <p className="max-w-3xl text-sm leading-7 text-[var(--parent-muted)]">
          Start with your own plan lines, or leave sections light and let EduCore generate a gentle starter week. Either way, the saved plan flows straight into the child experience.
        </p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="childId" className="text-sm font-semibold text-white">Child</label>
          <select id="childId" name="childId" defaultValue={state.values?.childId ?? ""} className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/20 px-4 py-3 text-sm text-white outline-none">
            <option value="">Choose a child</option>
            {plannerChildren.map((child) => (
              <option key={child.id} value={child.id}>
                {child.nickname} • {child.ageLabel} {child.hasPlan ? "• has saved week" : ""}
              </option>
            ))}
          </select>
          <FieldError message={state.fields?.childId} />
        </div>

        <div>
          <label htmlFor="weekOf" className="text-sm font-semibold text-white">Week of</label>
          <input id="weekOf" name="weekOf" type="date" defaultValue={state.values?.weekOf ?? defaultWeekOf} className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/20 px-4 py-3 text-sm text-white outline-none" />
          <p className="mt-2 text-xs text-[var(--parent-muted)]">Use the Monday date for the week you want to plan.</p>
          <FieldError message={state.fields?.weekOf} />
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="summary" className="text-sm font-semibold text-white">Weekly note, optional</label>
        <textarea
          id="summary"
          name="summary"
          rows={3}
          maxLength={280}
          className="mt-2 w-full rounded-3xl border border-white/10 bg-slate-950/20 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-400"
          placeholder="Keep the week light, tactile, and readable."
          defaultValue={state.values?.summary ?? ""}
        />
        <FieldError message={state.fields?.summary} />
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-3">
        {[
          {
            key: "readingPlan" as const,
            label: "Reading",
            hint: "One line per weekday, up to 5 lines.",
            placeholder: "Read together and retell the story\nShort phonics card review\nLibrary picture walk",
          },
          {
            key: "mathPlan" as const,
            label: "Math",
            hint: "Leave blank to generate calm starter prompts.",
            placeholder: "Counting tray warm-up\nShape sorting game\nPrintable number match",
          },
          {
            key: "thinkingPlan" as const,
            label: "Thinking",
            hint: "Shared or offline moments count here too.",
            placeholder: "Pattern puzzle\nObservation walk\nWeekly reflection moment",
          },
        ].map((field) => (
          <div key={field.key} className="rounded-3xl border border-white/10 bg-[var(--parent-surface-soft)] p-4">
            <label htmlFor={field.key} className="text-sm font-semibold text-white">{field.label}</label>
            <p className="mt-2 text-xs leading-5 text-[var(--parent-muted)]">{field.hint}</p>
            <textarea
              id={field.key}
              name={field.key}
              rows={7}
              className="mt-3 w-full rounded-3xl border border-white/10 bg-slate-950/20 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-400"
              placeholder={field.placeholder}
              defaultValue={state.values?.[field.key] ?? ""}
            />
            <FieldError message={state.fields?.[field.key]} />
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-4 text-sm leading-7 text-[var(--parent-muted)]">
        Saving a plan updates the shared weekly planner data that the parent dashboard and child daily task flow already read. Generating a starter week uses a small built-in template layer, not heavy AI.
      </div>

      <div className="mt-4 rounded-3xl border border-amber-300/20 bg-amber-300/10 p-4 text-sm leading-7 text-amber-100">
        If that child already has recorded completions for the selected week, EduCore will protect the saved week instead of silently replacing completion-linked plan items.
      </div>

      {state.error ? <p className="mt-4 text-sm text-rose-300">{state.error}</p> : null}
      {state.success ? <p className="mt-4 text-sm text-emerald-300">{state.success}</p> : null}

      <div className="mt-6 flex flex-wrap gap-3">
        <button type="submit" name="intent" value="generate" className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
          Generate starter week
        </button>
        <AuthSubmitButton label="Save weekly plan" pendingLabel="Saving weekly plan..." className="bg-white text-slate-950" />
      </div>
    </form>
  );
}
