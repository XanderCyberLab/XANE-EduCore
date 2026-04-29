"use client";

import { useActionState } from "react";
import { redeemRewardCycleAction } from "@/app/parent/rewards/actions";

export function ParentRewardCycleForm({ rewardPlanId, disabled }: { rewardPlanId: string; disabled: boolean }) {
  const [state, formAction, pending] = useActionState(redeemRewardCycleAction, {});

  return (
    <form action={formAction} className="space-y-3">
      <input type="hidden" name="rewardPlanId" value={rewardPlanId} />
      <label className="block">
        <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--parent-muted)]">Optional parent note</span>
        <textarea
          name="note"
          rows={3}
          placeholder="Optional note about what was redeemed or how you want to restart the next cycle."
          className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/25 px-4 py-3 text-sm text-slate-100 outline-none placeholder:text-slate-500"
        />
      </label>
      <button
        type="submit"
        disabled={disabled || pending}
        className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {pending ? "Closing reward cycle..." : "Mark redeemed and start new cycle"}
      </button>
      {disabled ? <p className="text-xs text-[var(--parent-muted)]">This control unlocks when the token goal has been reached.</p> : null}
      {state.error ? <p className="text-sm text-rose-300">{state.error}</p> : null}
      {state.success ? <p className="text-sm text-emerald-300">{state.success}</p> : null}
    </form>
  );
}
