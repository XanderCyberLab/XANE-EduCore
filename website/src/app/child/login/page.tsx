import { ChildLoginForm } from "@/components/child-login-form";
import { ChildPageIntro } from "@/components/shells";
import { listLoginChildren } from "@/lib/child-dashboard";

export default async function ChildLoginPage() {
  const profiles = await listLoginChildren();
  return (
    <main className="space-y-6">
      <section className="overflow-hidden rounded-[calc(var(--radius-card)+0.75rem)] border border-white/70 bg-[linear-gradient(135deg,rgba(255,253,248,0.98),rgba(241,246,255,0.93))] p-6 shadow-[var(--shadow-soft)] md:p-8">
        <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr] xl:items-start">
          <div className="space-y-5">
            <ChildPageIntro
              badge="Child login"
              title="Simple child sign-in"
              description="Children keep a lighter flow than parents: username plus PIN, parent-managed, and designed for fast daily starts."
            />
            <div className="grid gap-4 sm:grid-cols-3">
              {profiles.map((profile, index) => (
                <div key={profile.id} className="rounded-[2rem] border border-white/70 bg-white/88 p-4 text-left shadow-sm">
                  <div className="flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-white text-2xl font-semibold text-[var(--child-text)] shadow-sm">
                    {profile.nickname.slice(0, 1).toUpperCase() || `${index + 1}`}
                  </div>
                  <h2 className="mt-4 text-2xl font-semibold text-[var(--child-text)]">{profile.nickname}</h2>
                  <p className="mt-1 text-sm font-medium text-[var(--child-muted)]">@{profile.username}</p>
                  <p className="mt-3 text-sm text-[var(--child-muted)]">Tap the right name, then enter the child code.</p>
                </div>
              ))}
            </div>
          </div>

          <section className="rounded-[2rem] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(244,248,255,0.88))] p-5 shadow-[var(--shadow-soft)] md:p-6">
            <ChildLoginForm />
            <div className="mt-5 rounded-[1.5rem] bg-[var(--child-surface-soft)] p-4 text-sm leading-6 text-[var(--child-muted)]">
              Parent note: child names and codes are chosen in the parent-controlled setup flow. A keypad-style child login can layer on later without changing the auth foundation.
            </div>
            {profiles.length === 0 ? (
              <div className="mt-4 rounded-[1.5rem] border border-dashed border-slate-300 bg-white/70 p-4 text-sm leading-6 text-[var(--child-muted)]">
                No child sign-ins are ready yet. Add a child profile with a username and PIN first.
              </div>
            ) : null}
          </section>
        </div>
      </section>
    </main>
  );
}
