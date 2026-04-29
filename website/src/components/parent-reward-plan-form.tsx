"use client";

import { useActionState } from "react";
import {
  saveRewardPlanAction,
  type SaveRewardPlanState,
} from "@/app/parent/rewards/actions";
import { AuthSubmitButton } from "@/components/auth-submit-button";

type ParentRewardPlanFormProps = {
  childId: string;
  childName: string;
  rewardPlan?: {
    id: string;
    title: string;
    description: string | null;
    goal: number;
  };
};

const initialState: SaveRewardPlanState = {};

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-2 text-xs text-rose-300">{message}</p>;
}

export function ParentRewardPlanForm({ childId, childName, rewardPlan }: ParentRewardPlanFormProps) {
  const [state, formAction] = useActionState(saveRewardPlanAction, initialState);
  const isEditing = Boolean(rewardPlan);

  return (
    <form action={formAction} className="rounded-3xl border border-white/10 bg-slate-950/20 p-5">
      <input type="hidden" name="childId" value={childId} />
      {rewardPlan ? <input type="hidden" name="rewardPlanId" value={rewardPlan.id} /> : null}

      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--parent-muted)]">
          {isEditing ? "Edit reward plan" : "Create reward plan"}
        </p>
        <h3 className="text-lg font-semibold text-white">
          {isEditing ? `Adjust ${childName}'s reward details` : `Set a reward path for ${childName}`}
        </h3>
        <p className="text-sm leading-6 text-[var(--parent-muted)]">
          Keep the reward practical and parent-defined. Updating the wording or token goal will not reset the current cycle.
        </p>
      </div>

      <div className="mt-4 grid gap-4">
        <div>
          <label htmlFor={`reward-title-${childId}`} className="text-sm font-semibold text-white">Reward title</label>
          <input
            id={`reward-title-${childId}`}
            name="title"
            type="text"
            required
            maxLength={80}
            defaultValue={rewardPlan?.title ?? ""}
            placeholder="Movie night, park trip, choose dessert..."
            className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/30 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-400"
          />
          <FieldError message={state.fields?.title} />
        </div>

        <div>
          <label htmlFor={`reward-goal-${childId}`} className="text-sm font-semibold text-white">Token goal</label>
          <input
            id={`reward-goal-${childId}`}
            name="tokenGoal"
            type="number"
            required
            min={1}
            max={500}
            defaultValue={rewardPlan?.goal ?? 10}
            className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/30 px-4 py-3 text-sm text-white outline-none"
          />
          <p className="mt-2 text-xs text-[var(--parent-muted)]">Choose the number of tokens needed before the reward is ready for a parent decision.</p>
          <FieldError message={state.fields?.tokenGoal} />
        </div>

        <div>
          <label htmlFor={`reward-description-${childId}`} className="text-sm font-semibold text-white">Description, optional</label>
          <textarea
            id={`reward-description-${childId}`}
            name="description"
            rows={4}
            maxLength={300}
            defaultValue={rewardPlan?.description ?? ""}
            placeholder="Any gentle note about what the reward means in real life or how the family wants to use it."
            className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/30 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-400"
          />
          <FieldError message={state.fields?.description} />
        </div>
      </div>

      {state.error ? <p className="mt-4 text-sm text-rose-300">{state.error}</p> : null}
      {state.success ? <p className="mt-4 text-sm text-emerald-300">{state.success}</p> : null}

      <div className="mt-4">
        <AuthSubmitButton
          label={isEditing ? "Save reward plan" : "Create reward plan"}
          pendingLabel={isEditing ? "Saving reward plan..." : "Creating reward plan..."}
          className="bg-white text-slate-950"
        />
      </div>
    </form>
  );
}
