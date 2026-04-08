import { ParentHero } from "@/components/parent-ui";
import { requireParentSession } from "@/lib/auth/guards";
import { parentDashboardData } from "@/lib/mock-parent";

type RewardAction = {
  label: string;
  note: string;
};

type RewardPlan = {
  id: string;
  childId: string;
  childName: string;
  ageLabel: string;
  tone: string;
  rewardTitle: string;
  rewardReason: string;
  parentCue: string;
  progressNote: string;
  tokens: number;
  goal: number;
  weeklyEarned: number;
  nextMilestone: string;
  status: "steady" | "close" | "needs-adjustment";
  supportNote: string;
  ideas: string[];
  actions: RewardAction[];
};

const rewardPlans: RewardPlan[] = [
  {
    id: "junie-zoo",
    childId: "junie",
    childName: "Junie",
    ageLabel: "Age 6",
    tone: "Steady and excited",
    rewardTitle: "Zoo afternoon",
    rewardReason: "A shared outing feels meaningful to Junie and keeps the reward rooted in family time, not screen-only novelty.",
    parentCue: "Parent-defined reward, chosen because Junie has been asking for more animal sketching time.",
    progressNote: "Progress is strong. Reading confidence is helping the reward stay visible without needing extra pressure.",
    tokens: 19,
    goal: 25,
    weeklyEarned: 6,
    nextMilestone: "6 more tokens until the family can plan the afternoon.",
    status: "close",
    supportNote: "A simple celebration note at the end of reading blocks is probably enough here.",
    ideas: ["Choose the movie night pick", "Story basket choice", "Baking helper time"],
    actions: [
      { label: "Edit reward text", note: "Refine how the reward is described to Junie" },
      { label: "Adjust token goal", note: "Raise or lower the finish line if the rhythm changes" },
      { label: "Review child status", note: "Check whether learning pace still fits the reward" },
      { label: "Swap reward", note: "Replace with another real-life family reward" },
    ],
  },
  {
    id: "milo-lego",
    childId: "milo",
    childName: "Milo",
    ageLabel: "Age 4",
    tone: "Needs a lighter push",
    rewardTitle: "Lego helper set",
    rewardReason: "This is still tangible and parent-guided, but specific enough to motivate short hands-on work.",
    parentCue: "Parent-defined reward, framed as something Milo can enjoy together with help instead of a solo prize chase.",
    progressNote: "Math friction suggests the reward may need a gentler path, not a louder incentive.",
    tokens: 14,
    goal: 24,
    weeklyEarned: 4,
    nextMilestone: "10 more tokens, with the next check-in after two calmer math sessions.",
    status: "needs-adjustment",
    supportNote: "Consider lowering the goal slightly or renaming the reward so it feels more reachable this week.",
    ideas: ["Zoo afternoon", "Choose the picnic snack", "Story basket choice"],
    actions: [
      { label: "Edit reward text", note: "Make the wording feel simpler and more concrete" },
      { label: "Adjust token goal", note: "Reduce the goal if the current target feels too far away" },
      { label: "Review child status", note: "Look at effort, energy, and recent learning blocks" },
      { label: "Add or swap reward", note: "Try a more immediate real-life reward option" },
    ],
  },
];

function percent(tokens: number, goal: number) {
  return Math.max(6, Math.min(100, Math.round((tokens / goal) * 100)));
}

function statusBadge(status: RewardPlan["status"]) {
  if (status === "close") {
    return "border-emerald-400/25 bg-emerald-400/12 text-emerald-100";
  }

  if (status === "needs-adjustment") {
    return "border-amber-300/25 bg-amber-300/12 text-amber-100";
  }

  return "border-white/10 bg-white/5 text-slate-200";
}

function statusLabel(status: RewardPlan["status"]) {
  if (status === "close") return "Close to ready";
  if (status === "needs-adjustment") return "Worth adjusting";
  return "Steady progress";
}

export default async function ParentRewardsPage() {
  await requireParentSession();
  const totalTokens = rewardPlans.reduce((sum, plan) => sum + plan.tokens, 0);
  const totalGoals = rewardPlans.reduce((sum, plan) => sum + plan.goal, 0);
  const closeCount = rewardPlans.filter((plan) => plan.status === "close").length;
  const adjustmentCount = rewardPlans.filter((plan) => plan.status === "needs-adjustment").length;

  return (
    <main className="space-y-6 pb-8">
      <ParentHero
        title="Rewards stay practical, warm, and parent-shaped"
        description="This mock rewards area helps parents define meaningful real-world rewards, keep token goals readable, and notice when motivation needs a calmer adjustment instead of more pressure."
        plannerReadiness={`${closeCount} reward${closeCount === 1 ? "" : "s"} nearing the finish line`}
        attentionNote="EduCore can surface gentle guidance, but the parent still decides what a reward means, when it changes, and how visible it should feel at home."
      />

      <section className="grid gap-4 md:grid-cols-4">
        <div className="rounded-[var(--radius-card)] border border-white/10 bg-[var(--parent-surface)] p-5 shadow-[var(--shadow-soft)]">
          <p className="text-sm text-[var(--parent-muted)]">Active reward plans</p>
          <p className="mt-3 text-3xl font-semibold text-white">{rewardPlans.length}</p>
          <p className="mt-2 text-sm leading-6 text-[var(--parent-muted)]">One visible target per child keeps the system readable and calm.</p>
        </div>
        <div className="rounded-[var(--radius-card)] border border-white/10 bg-[var(--parent-surface)] p-5 shadow-[var(--shadow-soft)]">
          <p className="text-sm text-[var(--parent-muted)]">Tokens in motion</p>
          <p className="mt-3 text-3xl font-semibold text-white">{totalTokens}/{totalGoals}</p>
          <p className="mt-2 text-sm leading-6 text-[var(--parent-muted)]">Progress is visible, but still secondary to the family rhythm and child energy.</p>
        </div>
        <div className="rounded-[var(--radius-card)] border border-white/10 bg-[var(--parent-surface)] p-5 shadow-[var(--shadow-soft)]">
          <p className="text-sm text-[var(--parent-muted)]">Close to completion</p>
          <p className="mt-3 text-3xl font-semibold text-white">{closeCount}</p>
          <p className="mt-2 text-sm leading-6 text-[var(--parent-muted)]">A small celebration can stay warm and low-key when a reward is nearly ready.</p>
        </div>
        <div className="rounded-[var(--radius-card)] border border-white/10 bg-[var(--parent-surface)] p-5 shadow-[var(--shadow-soft)]">
          <p className="text-sm text-[var(--parent-muted)]">Needs review</p>
          <p className="mt-3 text-3xl font-semibold text-white">{adjustmentCount}</p>
          <p className="mt-2 text-sm leading-6 text-[var(--parent-muted)]">If a target feels too far away, the better move may be adjusting it, not pushing harder.</p>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <section className="rounded-[var(--radius-card)] border border-white/10 bg-[var(--parent-surface)] p-6 shadow-[var(--shadow-soft)]">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--parent-muted)]">Reward philosophy</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">Real-life motivation, lightly supported by tokens</h2>
            </div>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--parent-muted)]">
              Mock configuration
            </span>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Parent-defined first",
                note: "Rewards come from what matters at home, not from a generic catalog or storefront feel.",
              },
              {
                title: "Readable progress",
                note: "Children can see momentum, while parents can tell whether a goal still fits the week.",
              },
              {
                title: "Calm adjustments",
                note: "If motivation slips, parents can edit the wording, lower the goal, or swap the reward without drama.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-3xl border border-white/10 bg-[var(--parent-surface-soft)] p-4">
                <p className="text-lg font-semibold text-white">{item.title}</p>
                <p className="mt-3 text-sm leading-6 text-[var(--parent-muted)]">{item.note}</p>
              </div>
            ))}
          </div>
        </section>

        <aside className="rounded-[var(--radius-card)] border border-white/10 bg-[linear-gradient(135deg,rgba(109,124,255,0.14),rgba(23,32,51,0.98)_62%,rgba(17,24,39,1))] p-6 shadow-[var(--shadow-soft)]">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--parent-muted)]">Reward snapshot</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">How rewards are functioning this week</h2>
          <div className="mt-6 space-y-4">
            {rewardPlans.map((plan) => (
              <div key={plan.id} className="rounded-3xl border border-white/10 bg-white/6 p-4 backdrop-blur-sm">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-white">{plan.childName}</p>
                    <p className="mt-1 text-sm text-slate-300">{plan.rewardTitle}</p>
                  </div>
                  <span className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] ${statusBadge(plan.status)}`}>
                    {statusLabel(plan.status)}
                  </span>
                </div>
                <div className="mt-4 h-2 rounded-full bg-white/10">
                  <div className="h-2 rounded-full bg-[var(--accent-reward)]" style={{ width: `${percent(plan.tokens, plan.goal)}%` }} />
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-300">{plan.progressNote}</p>
              </div>
            ))}
          </div>
        </aside>
      </section>

      <section className="space-y-5">
        {rewardPlans.map((plan) => {
          const childProfile = parentDashboardData.children.find((child) => child.id === plan.childId);

          return (
            <article key={plan.id} className="overflow-hidden rounded-[var(--radius-card)] border border-white/10 bg-[var(--parent-surface)] shadow-[var(--shadow-soft)]">
              <div className="border-b border-white/10 bg-[linear-gradient(135deg,rgba(109,124,255,0.12),rgba(36,49,71,0.72),rgba(27,36,53,1))] p-6">
                <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-3xl font-semibold text-white">{plan.childName}</h2>
                      <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-200">{plan.ageLabel}</span>
                      <span className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] ${statusBadge(plan.status)}`}>
                        {statusLabel(plan.status)}
                      </span>
                    </div>
                    <p className="max-w-3xl text-sm leading-7 text-slate-300">{plan.rewardReason}</p>
                    <p className="rounded-2xl border border-white/10 bg-slate-950/20 px-4 py-3 text-sm leading-6 text-slate-200">{plan.parentCue}</p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2 xl:w-[28rem]">
                    {plan.actions.map((action) => (
                      <button
                        key={`${plan.id}-${action.label}`}
                        type="button"
                        className="rounded-3xl border border-white/10 bg-white/5 px-4 py-4 text-left transition hover:bg-white/10"
                      >
                        <p className="text-sm font-semibold text-white">{action.label}</p>
                        <p className="mt-1 text-xs leading-5 text-[var(--parent-muted)]">{action.note}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid gap-5 p-6 xl:grid-cols-[1.05fr_0.95fr]">
                <div className="space-y-5">
                  <div className="grid gap-4 md:grid-cols-4">
                    <div className="rounded-3xl border border-white/10 bg-[var(--parent-surface-soft)] p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--parent-muted)]">Current target</p>
                      <p className="mt-3 text-lg font-semibold text-white">{plan.rewardTitle}</p>
                      <p className="mt-2 text-sm leading-6 text-[var(--parent-muted)]">Parent-chosen reward</p>
                    </div>
                    <div className="rounded-3xl border border-white/10 bg-[var(--parent-surface-soft)] p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--parent-muted)]">Token goal</p>
                      <p className="mt-3 text-lg font-semibold text-white">{plan.tokens}/{plan.goal}</p>
                      <p className="mt-2 text-sm leading-6 text-[var(--parent-muted)]">Visible finish line</p>
                    </div>
                    <div className="rounded-3xl border border-white/10 bg-[var(--parent-surface-soft)] p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--parent-muted)]">This week</p>
                      <p className="mt-3 text-lg font-semibold text-white">+{plan.weeklyEarned} tokens</p>
                      <p className="mt-2 text-sm leading-6 text-[var(--parent-muted)]">Recent momentum</p>
                    </div>
                    <div className="rounded-3xl border border-white/10 bg-[var(--parent-surface-soft)] p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--parent-muted)]">Learning status</p>
                      <p className="mt-3 text-lg font-semibold text-white">{childProfile?.mood ?? plan.tone}</p>
                      <p className="mt-2 text-sm leading-6 text-[var(--parent-muted)]">Context before changing incentives</p>
                    </div>
                  </div>

                  <section className="rounded-3xl border border-white/10 bg-white/5 p-5">
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--parent-muted)]">Reward progress</p>
                        <p className="mt-2 text-2xl font-semibold text-white">{plan.nextMilestone}</p>
                      </div>
                      <p className="rounded-full border border-white/10 bg-slate-950/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--parent-muted)]">
                        {percent(plan.tokens, plan.goal)}% complete
                      </p>
                    </div>
                    <div className="mt-4 h-3 rounded-full bg-white/10">
                      <div className="h-3 rounded-full bg-[var(--accent-reward)]" style={{ width: `${percent(plan.tokens, plan.goal)}%` }} />
                    </div>
                    <p className="mt-4 text-sm leading-6 text-slate-200">{plan.supportNote}</p>
                  </section>

                  <section className="grid gap-4 lg:grid-cols-[1fr_1fr]">
                    <div className="rounded-3xl border border-white/10 bg-[var(--parent-surface-soft)] p-5">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--parent-muted)]">Child reward status</p>
                      <p className="mt-2 text-lg font-semibold text-white">{plan.progressNote}</p>
                      <p className="mt-3 text-sm leading-6 text-[var(--parent-muted)]">
                        {childProfile?.nextStep ?? "Use the child overview to keep reward pacing connected to the real learning day."}
                      </p>
                    </div>
                    <div className="rounded-3xl border border-white/10 bg-[var(--parent-surface-soft)] p-5">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--parent-muted)]">Alternate reward ideas</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {plan.ideas.map((idea) => (
                          <span key={idea} className="rounded-full border border-white/10 bg-slate-950/20 px-3 py-2 text-sm text-slate-200">
                            {idea}
                          </span>
                        ))}
                      </div>
                    </div>
                  </section>
                </div>

                <aside className="space-y-4">
                  <section className="rounded-3xl border border-white/10 bg-[var(--parent-surface-soft)] p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--parent-muted)]">Why this reward works</p>
                    <p className="mt-3 text-sm leading-7 text-slate-200">{plan.rewardReason}</p>
                  </section>

                  <section className="rounded-3xl border border-white/10 bg-white/5 p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--parent-muted)]">Family-first cues</p>
                    <div className="mt-4 space-y-3">
                      {[
                        "Rewards are parent-defined and can change with the week's real energy.",
                        "Offline and shared rewards are treated as meaningful, not secondary.",
                        "Token goals should support encouragement, not become the main event.",
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
          );
        })}
      </section>
    </main>
  );
}
