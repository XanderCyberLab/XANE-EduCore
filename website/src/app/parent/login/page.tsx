import { ParentLoginForm } from "@/components/parent-login-form";
import { ParentPageIntro, PlaceholderList } from "@/components/shells";

export default function ParentLoginPage() {
  return (
    <main className="space-y-6 rounded-[var(--radius-card)] border border-white/10 bg-[var(--parent-surface)] p-6 md:p-8">
      <ParentPageIntro
        eyebrow="Parent login"
        title="Parent auth groundwork is ready"
        description="This foundation supports a real parent email and password session without overbuilding the final UX yet."
      />
      <div className="grid gap-4 md:grid-cols-2">
        <ParentLoginForm />
        <div className="space-y-4 rounded-3xl border border-white/10 bg-[var(--parent-surface-soft)] p-5 text-sm leading-7 text-[var(--parent-muted)]">
          <p>
            This ticket keeps the parent flow intentionally lean: credentials, signed session cookie, route protection, and room for stronger recovery and account UX later.
          </p>
          <div>
            <p className="text-sm font-semibold text-[var(--parent-text)]">Groundwork included</p>
            <PlaceholderList items={["Parent session cookie", "Route guard coverage", "Future-ready session invalidation"]} />
          </div>
        </div>
      </div>
    </main>
  );
}
