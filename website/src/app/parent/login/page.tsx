import { ParentPageIntro, PlaceholderList } from "@/components/shells";

export default function ParentLoginPage() {
  return (
    <main className="space-y-6 rounded-[var(--radius-card)] border border-white/10 bg-[var(--parent-surface)] p-6 md:p-8">
      <ParentPageIntro
        eyebrow="Parent login"
        title="Secure sign-in placeholder"
        description="This route is reserved for the parent email and password flow. The shell is intentionally simple so auth work can be added cleanly in a later ticket."
      />
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-[var(--parent-surface-soft)] p-5">
          <p className="text-sm font-semibold text-[var(--parent-text)]">Planned inputs</p>
          <PlaceholderList items={["Email field", "Password field", "Primary sign-in action"]} />
        </div>
        <div className="rounded-3xl border border-white/10 bg-[var(--parent-surface-soft)] p-5 text-sm leading-7 text-[var(--parent-muted)]">
          Parent auth is intentionally out of scope for this ticket. This page exists to anchor route protection and login UX work later.
        </div>
      </div>
    </main>
  );
}
