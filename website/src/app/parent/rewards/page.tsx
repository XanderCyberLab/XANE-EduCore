import { ParentHero, RewardOverviewCard } from "@/components/parent-ui";
import { parentDashboardData } from "@/lib/mock-parent";

export default function ParentRewardsPage() {
  return (
    <main className="space-y-6 pb-8">
      <ParentHero
        title="Rewards stay visible, warm, and low-pressure"
        description="This mock rewards view keeps motivation practical. Parents can quickly see which goals are close, which child may need support, and whether the current rewards still fit the family routine."
        plannerReadiness="Two active rewards in progress"
        attentionNote="The design direction assumes rewards support encouragement, not overstimulation or pressure."
      />
      <RewardOverviewCard rewards={parentDashboardData.rewardHighlights} />
      <section className="grid gap-4 lg:grid-cols-2">
        {parentDashboardData.children.map((child) => (
          <div key={child.id} className="rounded-[var(--radius-card)] border border-white/10 bg-[var(--parent-surface)] p-5 shadow-[var(--shadow-soft)]">
            <p className="text-sm text-[var(--parent-muted)]">{child.name}</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">{child.rewardName}</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--parent-muted)]">Current target: {child.rewardTokens}/{child.rewardGoal} tokens. The reward is visible enough to motivate, but calm enough to preserve trust.</p>
          </div>
        ))}
      </section>
    </main>
  );
}
