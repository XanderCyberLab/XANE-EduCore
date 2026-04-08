import { ChildManagementCard, ParentHero } from "@/components/parent-ui";
import { parentDashboardData } from "@/lib/mock-parent";

export default function ParentChildrenPage() {
  return (
    <main className="space-y-6 pb-8">
      <ParentHero
        title="Child profiles feel calm, clear, and parent-led"
        description="This mock children space treats profile setup as a lightweight family workflow. Parents can quickly understand identity, login basics, learning needs, and reward momentum without drifting into school-admin energy."
        plannerReadiness="2 child profiles are ready for planning"
        attentionNote="EduCore keeps child setup nickname-first, parent-managed, and intentionally minimal so future login, planning, and rewards stay simple."
      />

      <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[var(--radius-card)] border border-white/10 bg-[var(--parent-surface)] p-6 shadow-[var(--shadow-soft)]">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--parent-muted)]">Privacy-first setup</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Only the child details a family actually needs</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--parent-muted)]">
            Profiles center on nickname, age band, simple login readiness, reward direction, and learning notes. Real names, extra identifiers, and heavy forms stay out of the way unless a future need proves otherwise.
          </p>
        </div>

        <div className="rounded-[var(--radius-card)] border border-white/10 bg-[linear-gradient(135deg,rgba(242,201,76,0.12),rgba(36,49,71,0.78),rgba(27,36,53,1))] p-6 shadow-[var(--shadow-soft)]">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--parent-muted)]">Planned parent actions</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              "Add child",
              "Edit profile",
              "Adjust login",
              "Review reward setup",
              "Review learning profile",
            ].map((action) => (
              <button
                key={action}
                type="button"
                className="rounded-full border border-white/15 bg-white/5 px-4 py-3 text-left text-sm font-medium text-white transition hover:bg-white/10"
              >
                {action}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-6">
        {parentDashboardData.children.map((child) => (
          <ChildManagementCard key={child.id} child={child} />
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        <div className="rounded-[var(--radius-card)] border border-white/10 bg-[var(--parent-surface)] p-6 shadow-[var(--shadow-soft)] xl:col-span-2">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--parent-muted)]">Why this direction matters</p>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-[var(--parent-surface-soft)] p-4">
              <p className="text-lg font-semibold text-white">Login can stay simple</p>
              <p className="mt-2 text-sm leading-6 text-[var(--parent-muted)]">Username and parent-managed PIN cues are already visible, so a future child login flow has a clear foundation.</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-[var(--parent-surface-soft)] p-4">
              <p className="text-lg font-semibold text-white">Planning can stay personal</p>
              <p className="mt-2 text-sm leading-6 text-[var(--parent-muted)]">Pacing notes, strengths, and support areas create enough signal for later planner generation without over-collecting data.</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-[var(--parent-surface-soft)] p-4">
              <p className="text-lg font-semibold text-white">Rewards stay connected</p>
              <p className="mt-2 text-sm leading-6 text-[var(--parent-muted)]">Each profile shows how motivation, daily rhythm, and family goals fit together in one calm surface.</p>
            </div>
          </div>
        </div>

        <div className="rounded-[var(--radius-card)] border border-white/10 bg-[var(--parent-surface)] p-6 shadow-[var(--shadow-soft)]">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--parent-muted)]">Mock surface note</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Safe to review before backend work</h2>
          <p className="mt-3 text-sm leading-7 text-[var(--parent-muted)]">
            All actions are placeholders. This route is meant to validate product shape and parent confidence before auth, persistence, and planning logic are implemented.
          </p>
        </div>
      </section>
    </main>
  );
}
