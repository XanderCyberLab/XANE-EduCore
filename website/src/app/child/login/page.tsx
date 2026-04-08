import { ChildPageIntro } from "@/components/shells";

export default function ChildLoginPage() {
  return (
    <main className="rounded-[calc(var(--radius-card)+0.5rem)] border border-white/70 bg-[var(--child-surface)] p-6 shadow-[var(--shadow-soft)] md:p-8">
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <ChildPageIntro
          badge="Child login"
          title="Simple sign-in, built for little learners"
          description="This route is reserved for the child username and PIN flow. The design keeps the foundation bright, calm, and touch-friendly without adding auth logic yet."
        />
        <div className="rounded-[var(--radius-card)] bg-[var(--child-surface-soft)] p-5">
          <p className="text-sm font-semibold text-[var(--child-muted)]">Planned controls</p>
          <div className="mt-4 grid gap-3">
            <div className="rounded-2xl bg-white/80 px-4 py-4 text-lg font-semibold">Nickname</div>
            <div className="rounded-2xl bg-white/80 px-4 py-4 text-lg font-semibold">PIN buttons</div>
            <div className="rounded-2xl bg-[#ffd77a] px-4 py-4 text-center text-lg font-semibold text-[#172033]">Start learning</div>
          </div>
        </div>
      </div>
    </main>
  );
}
