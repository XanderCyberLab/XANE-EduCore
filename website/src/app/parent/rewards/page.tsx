import { ParentRewardCycleForm } from "@/components/parent-reward-cycle-form";
import { ParentRewardPlanForm } from "@/components/parent-reward-plan-form";
import { ParentHero, ParentSurfaceSummary } from "@/components/parent-ui";
import { requireParentSession } from "@/lib/auth/guards";
import { getParentRewardPageData } from "@/lib/parent-rewards";

function statusBadge(status: "steady" | "close" | "ready") {
  if (status === "ready") return "border-emerald-400/25 bg-emerald-400/12 text-emerald-100";
  if (status === "close") return "border-sky-300/25 bg-sky-300/12 text-sky-100";
  return "border-white/10 bg-white/5 text-slate-200";
}

function statusLabel(status: "steady" | "close" | "ready") {
  if (status === "ready") return "Ready for parent check-in";
  if (status === "close") return "Close to ready";
  return "Steady progress";
}

function formatWhen(date: Date | null) {
  if (!date) return "Not yet redeemed";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export default async function ParentRewardsPage() {
  const session = await requireParentSession();
  const { rewardPlans, childrenWithoutRewardPlan, rewardSetupSummary, surfaceSummary } = await getParentRewardPageData(session.parentUserId);

  const readyCount = rewardPlans.filter((plan) => plan.status === "ready").length;
  const closeCount = rewardPlans.filter((plan) => plan.status === "close").length;
  const hasMissingRewardPlans = childrenWithoutRewardPlan.length > 0;

  return (
    <main className="space-y-6 pb-8">
      <ParentHero
        title="Rewards stay practical, warm, and parent-shaped"
        description={hasMissingRewardPlans
          ? "After child setup, the next useful step is giving each child one simple reward path. EduCore keeps it visible without turning rewards into a bigger system."
          : "Parents can now create, adjust, and redeem reward plans in-product while keeping the cumulative token cycle calm, visible, and parent-defined."}
        plannerReadiness={
          readyCount > 0
            ? `${readyCount} reward${readyCount === 1 ? " is" : "s are"} ready for a parent decision`
            : hasMissingRewardPlans
              ? `${childrenWithoutRewardPlan.length} child${childrenWithoutRewardPlan.length === 1 ? " still needs" : "ren still need"} a reward path`
              : `${closeCount} reward${closeCount === 1 ? " is" : "s are"} getting close`
        }
        attentionNote={hasMissingRewardPlans
          ? "A first reward can stay very small. Set the goal, keep the meaning simple, and let tokens become understandable before the week gets busy."
          : "EduCore keeps the parent in charge. Tokens can build quietly, and only the parent decides when a reward has truly been redeemed and when the next cycle begins."}
      />

      <ParentSurfaceSummary
        items={surfaceSummary}
        columns="md:grid-cols-3"
      />

      <section className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
        <section className="rounded-[var(--radius-card)] border border-white/10 bg-[var(--parent-surface)] p-6 shadow-[var(--shadow-soft)]">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--parent-muted)]">How rewards work</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">A clear first reward setup keeps motivation visible</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--parent-muted)]">
            Parents only need one simple reward per child to make the token path understandable. The cycle stays calm: create a reward, let tokens build, then redeem only when the real-life reward actually happened.
          </p>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-[var(--parent-surface-soft)] p-4">
              <p className="text-sm font-semibold text-white">1. Create one reward</p>
              <p className="mt-2 text-sm leading-6 text-[var(--parent-muted)]">Choose a practical reward title and a token goal that feels reachable.</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-[var(--parent-surface-soft)] p-4">
              <p className="text-sm font-semibold text-white">2. Let the cycle stay visible</p>
              <p className="mt-2 text-sm leading-6 text-[var(--parent-muted)]">Children see steady progress while parents keep the meaning and pacing grounded in real life.</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-[var(--parent-surface-soft)] p-4">
              <p className="text-sm font-semibold text-white">3. Redeem when it really happened</p>
              <p className="mt-2 text-sm leading-6 text-[var(--parent-muted)]">Only the parent closes the loop and starts a fresh cycle after the reward is actually given.</p>
            </div>
          </div>
        </section>

        <section className="rounded-[var(--radius-card)] border border-white/10 bg-[var(--parent-surface)] p-6 shadow-[var(--shadow-soft)]">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--parent-muted)]">Setup status</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Follow-through at a glance</h2>
          <div className="mt-5 space-y-3 text-sm leading-6 text-slate-200">
            <div className="rounded-3xl border border-white/10 bg-[var(--parent-surface-soft)] p-4">
              <p className="font-semibold text-white">Children with reward paths</p>
              <p className="mt-1 text-[var(--parent-muted)]">{rewardSetupSummary.activePlanCount}/{rewardSetupSummary.totalChildren} children now have an active reward plan.</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-[var(--parent-surface-soft)] p-4">
              <p className="font-semibold text-white">What to do next</p>
              <p className="mt-1 text-[var(--parent-muted)]">
                {rewardSetupSummary.missingPlanCount > 0
                  ? `Create ${rewardSetupSummary.missingPlanCount === 1 ? "the first missing reward plan" : `${rewardSetupSummary.missingPlanCount} missing reward plans`} so each child has a visible reward path.`
                  : rewardSetupSummary.readyCount > 0
                    ? `You have ${rewardSetupSummary.readyCount} reward${rewardSetupSummary.readyCount === 1 ? "" : "s"} ready for parent redemption.`
                    : "All active reward paths are set. You can review wording, goals, or wait for more tokens to build."}
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-[var(--parent-surface-soft)] p-4">
              <p className="font-semibold text-white">Why this matters</p>
              <p className="mt-1 text-[var(--parent-muted)]">Reward setup is easiest right after child setup, before the weekly rhythm starts to depend on it.</p>
            </div>
          </div>
        </section>
      </section>

      <section className="space-y-5">
        {childrenWithoutRewardPlan.length > 0 ? (
          <section className="rounded-[var(--radius-card)] border border-white/10 bg-[var(--parent-surface)] p-6 shadow-[var(--shadow-soft)]">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--parent-muted)]">Reward setup</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">Add a reward path for each child when ready</h2>
              <p className="mt-3 text-sm leading-7 text-[var(--parent-muted)]">
                A reward can stay simple. Parents define the meaning, the token goal, and any calm real-world context they want attached to it.
              </p>
            </div>
            <div className="mt-5 grid gap-4 xl:grid-cols-2">
              {childrenWithoutRewardPlan.map((child) => (
                <ParentRewardPlanForm key={child.id} childId={child.id} childName={child.childName} />
              ))}
            </div>
          </section>
        ) : null}
        {rewardPlans.length === 0 ? (
          <section className="rounded-[var(--radius-card)] border border-white/10 bg-[var(--parent-surface)] p-6 text-sm shadow-[var(--shadow-soft)]">
            <p className="font-semibold text-white">No active reward plans are set up yet.</p>
            <p className="mt-2 max-w-3xl leading-7 text-[var(--parent-muted)]">
              Start with one simple reward for each child you want participating. A small, visible first setup is enough to make the reward system understandable.
            </p>
          </section>
        ) : null}

        {rewardPlans.map((plan) => (
          <article key={plan.id} className="overflow-hidden rounded-[var(--radius-card)] border border-white/10 bg-[var(--parent-surface)] shadow-[var(--shadow-soft)]">
            <div className="border-b border-white/10 bg-[linear-gradient(135deg,rgba(109,124,255,0.12),rgba(36,49,71,0.72),rgba(27,36,53,1))] p-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-3xl font-semibold text-white">{plan.childName}</h2>
                    <span className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] ${statusBadge(plan.status)}`}>
                      {statusLabel(plan.status)}
                    </span>
                  </div>
                  <p className="mt-3 text-lg font-semibold text-white">{plan.rewardTitle}</p>
                  <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-300">
                    {plan.rewardDescription || "A parent-chosen real-world reward, kept simple and practical for family life."}
                  </p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
                  <p>Cycle started: {formatWhen(plan.cycleStartedAt)}</p>
                  <p className="mt-1">Last redeemed: {formatWhen(plan.lastRedeemedAt)}</p>
                  <p className="mt-1">Completed cycles: {plan.cycleCount}</p>
                </div>
              </div>
            </div>

            <div className="grid gap-5 p-6 xl:grid-cols-[1.05fr_0.95fr]">
              <div className="space-y-5">
                <div className="grid gap-4 md:grid-cols-4">
                  <div className="rounded-3xl border border-white/10 bg-[var(--parent-surface-soft)] p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--parent-muted)]">Current cycle</p>
                    <p className="mt-3 text-lg font-semibold text-white">{plan.tokens}/{plan.goal}</p>
                    <p className="mt-2 text-sm leading-6 text-[var(--parent-muted)]">Tokens in the active reward loop</p>
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-[var(--parent-surface-soft)] p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--parent-muted)]">This week</p>
                    <p className="mt-3 text-lg font-semibold text-white">+{plan.weeklyEarned}</p>
                    <p className="mt-2 text-sm leading-6 text-[var(--parent-muted)]">Recent momentum</p>
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-[var(--parent-surface-soft)] p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--parent-muted)]">Progress</p>
                    <p className="mt-3 text-lg font-semibold text-white">{plan.progress}%</p>
                    <p className="mt-2 text-sm leading-6 text-[var(--parent-muted)]">Readable, parent-managed pacing</p>
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-[var(--parent-surface-soft)] p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--parent-muted)]">Next step</p>
                    <p className="mt-3 text-lg font-semibold text-white">{statusLabel(plan.status)}</p>
                    <p className="mt-2 text-sm leading-6 text-[var(--parent-muted)]">{plan.status === "ready" ? "Redeem when the real-life reward has happened." : "Let the cycle continue quietly."}</p>
                  </div>
                </div>

                <section className="rounded-3xl border border-white/10 bg-white/5 p-5">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--parent-muted)]">Reward progress</p>
                      <p className="mt-2 text-2xl font-semibold text-white">{plan.nextStep}</p>
                    </div>
                    <p className="rounded-full border border-white/10 bg-slate-950/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--parent-muted)]">
                      {plan.progress}% complete
                    </p>
                  </div>
                  <div className="mt-4 h-3 rounded-full bg-white/10">
                    <div className="h-3 rounded-full bg-[var(--accent-reward)]" style={{ width: `${Math.max(6, plan.progress)}%` }} />
                  </div>
                </section>

                {plan.lastRedeemedNote ? (
                  <section className="rounded-3xl border border-white/10 bg-[var(--parent-surface-soft)] p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--parent-muted)]">Last parent note</p>
                    <p className="mt-3 text-sm leading-7 text-slate-200">{plan.lastRedeemedNote}</p>
                  </section>
                ) : null}
              </div>

              <aside className="space-y-4">
                <ParentRewardPlanForm
                  childId={plan.childId}
                  childName={plan.childName}
                  rewardPlan={{
                    id: plan.id,
                    title: plan.rewardTitle,
                    description: plan.rewardDescription,
                    goal: plan.goal,
                  }}
                />

                <section className="rounded-3xl border border-white/10 bg-[var(--parent-surface-soft)] p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--parent-muted)]">Close the loop</p>
                  <p className="mt-3 text-sm leading-7 text-slate-200">
                    When the reward has truly happened, mark it redeemed here. EduCore will start a fresh cycle and keep future tokens separate from the completed one.
                  </p>
                  <div className="mt-4">
                    <ParentRewardCycleForm rewardPlanId={plan.id} disabled={plan.tokens < plan.goal} />
                  </div>
                </section>

                <section className="rounded-3xl border border-white/10 bg-white/5 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--parent-muted)]">Family-first cues</p>
                  <div className="mt-4 space-y-3">
                    {[
                      "Parents stay in charge of what counts as a reward and when it is actually redeemed.",
                      "Resetting the cycle should support real life rhythm, not create pressure to cash out instantly.",
                      "Children keep seeing a calm cumulative jar, while parents manage the practical boundary between cycles.",
                    ].map((note) => (
                      <div key={note} className="rounded-2xl border border-white/10 bg-slate-950/20 px-4 py-3 text-sm leading-6 text-slate-300">
                        {note}
                      </div>
                    ))}
                  </div>
                </section>
              </aside>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
