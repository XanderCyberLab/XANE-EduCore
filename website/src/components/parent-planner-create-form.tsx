"use client";

import { useActionState } from "react";
import { saveWeeklyPlanAction, type SaveWeeklyPlanState } from "@/app/parent/planner/actions";
import { AuthSubmitButton } from "@/components/auth-submit-button";

const initialState: SaveWeeklyPlanState = {};
const scopeDayOptions = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] as const;

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
  const childrenWithPlans = plannerChildren.filter((child) => child.hasPlan).length;

  const [state, formAction] = useActionState(saveWeeklyPlanAction, initialState);
  const selectedScopeMode = state.values?.scopeMode ?? "full-week";

  return (
    <form action={formAction} className="rounded-[var(--radius-card)] border border-white/10 bg-[var(--parent-surface)] p-6 shadow-[var(--shadow-soft)]">
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--parent-muted)]">Create or update week</p>
        <h2 className="text-2xl font-semibold text-white">Build a calm weekly plan inside EduCore</h2>
        <p className="max-w-3xl text-sm leading-7 text-[var(--parent-muted)]">
          Start with your own plan lines, or leave sections light and let EduCore generate a gentle starter week. You can now update the whole week, one day, or a smaller day range without forcing a full replacement.
        </p>
      </div>

      <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-4 text-sm leading-7 text-[var(--parent-muted)]">
        <p className="font-semibold text-white">Practical authoring rules</p>
        <ul className="mt-2 space-y-1">
          <li>Use the Monday date for the exact week you want to save.</li>
          <li>Add up to 5 non-empty lines per subject, one line per weekday.</li>
          <li>Pick a smaller scope when you only want to adjust one day or part of the week.</li>
        </ul>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
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
          <p className="mt-2 text-xs text-[var(--parent-muted)]">Use a Monday date. EduCore will only save the week you explicitly choose.</p>
          <FieldError message={state.fields?.weekOf} />
        </div>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <div>
          <label htmlFor="scopeMode" className="text-sm font-semibold text-white">Edit scope</label>
          <select id="scopeMode" name="scopeMode" defaultValue={selectedScopeMode} className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/20 px-4 py-3 text-sm text-white outline-none">
            <option value="full-week">Full week</option>
            <option value="single-day">Single day</option>
            <option value="day-range">Day range</option>
          </select>
        </div>

        <div>
          <label htmlFor="scopeStartDay" className="text-sm font-semibold text-white">Start day</label>
          <select id="scopeStartDay" name="scopeStartDay" defaultValue={state.values?.scopeStartDay ?? "Monday"} className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/20 px-4 py-3 text-sm text-white outline-none">
            {scopeDayOptions.map((day) => (
              <option key={day} value={day}>{day}</option>
            ))}
          </select>
          <FieldError message={state.fields?.scopeStartDay} />
        </div>

        <div>
          <label htmlFor="scopeEndDay" className="text-sm font-semibold text-white">End day</label>
          <select id="scopeEndDay" name="scopeEndDay" defaultValue={state.values?.scopeEndDay ?? "Friday"} className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/20 px-4 py-3 text-sm text-white outline-none">
            {scopeDayOptions.map((day) => (
              <option key={day} value={day}>{day}</option>
            ))}
          </select>
          <p className="mt-2 text-xs text-[var(--parent-muted)]">For single-day edits, EduCore uses the start day. For smaller ranges, only the selected day window is replaced.</p>
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

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-white/10 bg-[var(--parent-surface-soft)] p-4">
          <p className="text-sm font-semibold text-white">Current week coverage</p>
          <p className="mt-2 text-sm leading-6 text-[var(--parent-muted)]">
            {childrenWithPlans > 0
              ? `${childrenWithPlans} of ${plannerChildren.length} ${plannerChildren.length === 1 ? "child already has" : "children already have"} a saved week in the current planner view.`
              : "No child has a saved week in the current planner view yet."}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {plannerChildren.map((child) => (
              <span
                key={child.id}
                className={`rounded-full border px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] ${child.hasPlan ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-100" : "border-white/10 bg-slate-950/20 text-[var(--parent-muted)]"}`}
              >
                {child.nickname} {child.hasPlan ? "• saved week" : "• open"}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-[var(--parent-surface-soft)] p-4">
          <p className="text-sm font-semibold text-white">What happens when you save</p>
          <ul className="mt-2 space-y-2 text-sm leading-6 text-[var(--parent-muted)]">
            <li>Saved plan lines become the weekly blocks the child flow already reads.</li>
            <li>Blank subjects stay untouched during smaller scoped saves, unless you choose starter generation.</li>
            <li>Weeks with recorded completions stay protected from unsafe overwrite.</li>
          </ul>
        </div>
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-3">
        {[
          {
            key: "readingPlan" as const,
            label: "Reading",
            hint: "Add lines only if you want to replace reading in the selected scope.",
            placeholder: "Read together and retell the story\nShort phonics card review\nLibrary picture walk",
          },
          {
            key: "mathPlan" as const,
            label: "Math",
            hint: "Leave blank to keep existing math, or generate calm starter prompts.",
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
            <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-slate-400">Monday to Friday, up to 5 saved lines</p>
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
        If the selected child already has recorded completions inside the scope you are replacing, EduCore will protect those completion-linked plan items instead of silently replacing them.
      </div>

      {state.error ? <p className="mt-4 text-sm text-rose-300">{state.error}</p> : null}
      {state.success ? <p className="mt-4 text-sm text-emerald-300">{state.success}</p> : null}

      <div className="mt-6 flex flex-wrap gap-3">
        <button type="submit" name="intent" value="generate" className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
          Generate starter scope
        </button>
        <AuthSubmitButton label="Save weekly plan" pendingLabel="Saving weekly plan..." className="bg-white text-slate-950" />
      </div>
    </form>
  );
}
