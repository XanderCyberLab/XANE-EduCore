import { ParentChildCreateForm } from "@/components/parent-child-create-form";
import { ChildManagementCard, ParentHero, ParentSurfaceSummary } from "@/components/parent-ui";
import { requireParentSession } from "@/lib/auth/guards";
import { getParentDashboardData } from "@/lib/parent-dashboard";

export default async function ParentChildrenPage() {
  const session = await requireParentSession();
  const data = await getParentDashboardData(session.parentUserId, session.email);

  const childrenReadyForPlans = data.children.filter((child) => child.setupState === "Connected to saved plans").length;
  const childrenWithPins = data.children.filter((child) => child.pinStatus === "Parent-managed PIN active").length;
  const rewardLinkedChildren = data.children.filter((child) => child.rewardName !== "Reward still open").length;

  return (
    <main className="space-y-6 pb-8">
      <ParentHero
        title="Child profiles stay calm, clear, and connected"
        description="This children space now reads from saved profiles, login readiness, rewards, and weekly plan activity where available, while still keeping setup lightweight and family-first."
        plannerReadiness={data.familySummary.plannerReadiness}
        attentionNote="EduCore keeps child setup nickname-first, parent-managed, and intentionally minimal so planning, login, and rewards can stay trustworthy without school-admin overhead."
      />

      <ParentSurfaceSummary
        items={[
          {
            label: "Saved-plan connection",
            value: `${childrenReadyForPlans}/${data.children.length}`,
            note: data.children.length > 0 ? "Children already tied to persisted weekly planning." : "Profiles can stay light until you are ready to plan.",
          },
          {
            label: "Login readiness",
            value: `${childrenWithPins}/${data.children.length}`,
            note: data.children.length > 0 ? "Profiles with parent-managed PIN setup in place." : "PIN readiness appears here once profiles exist.",
          },
          {
            label: "Reward connection",
            value: `${rewardLinkedChildren}/${data.children.length}`,
            note: data.children.length > 0 ? "Profiles already connected to an active reward path." : "Reward setup can be added later without extra profile overhead.",
          },
        ]}
      />

      <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[var(--radius-card)] border border-white/10 bg-[var(--parent-surface)] p-6 shadow-[var(--shadow-soft)]">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--parent-muted)]">Privacy-first setup</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Only the child details a family actually needs</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--parent-muted)]">
            Profiles center on nickname, age band, simple login readiness, and reward direction. Real names, extra identifiers, and heavy forms stay out of the way unless a future need proves otherwise.
          </p>
        </div>

        <div className="rounded-[var(--radius-card)] border border-white/10 bg-[linear-gradient(135deg,rgba(242,201,76,0.12),rgba(36,49,71,0.78),rgba(27,36,53,1))] p-6 shadow-[var(--shadow-soft)]">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--parent-muted)]">What parents can do now</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              "Create child profile",
              "Edit nickname + age band",
              "Update username",
              "Rotate child PIN",
              "Review reward setup",
            ].map((action) => (
              <div
                key={action}
                className="rounded-full border border-white/15 bg-white/5 px-4 py-3 text-left text-sm font-medium text-white"
              >
                {action}
              </div>
            ))}
          </div>
        </div>
      </section>

      <ParentChildCreateForm />

      <section className="space-y-6">
        {data.children.length > 0 ? (
          data.children.map((child) => <ChildManagementCard key={child.id} child={child} />)
        ) : (
          <section className="rounded-[var(--radius-card)] border border-dashed border-white/10 bg-[var(--parent-surface)] p-6 shadow-[var(--shadow-soft)]">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--parent-muted)]">No child profiles yet</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">The family space is ready when you are</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--parent-muted)]">Once a child profile is added, this page will show nickname-first identity, login readiness, reward direction, and saved learning activity in one calm place.</p>
          </section>
        )}
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
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--parent-muted)]">Current scope note</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Parents can now manage child basics in-product</h2>
          <p className="mt-3 text-sm leading-7 text-[var(--parent-muted)]">
            Child profiles can now be updated here with lightweight server-side handling for nickname, age band, username, and PIN rotation, while keeping the experience calm and privacy-first.
          </p>
        </div>
      </section>
    </main>
  );
}
