import { ParentLoginForm } from "@/components/parent-login-form";
import { ParentPageIntro, PlaceholderList } from "@/components/shells";
import { hasParentAccount } from "@/lib/auth/parent";

export default async function ParentLoginPage() {
  const hasExistingParentAccount = await hasParentAccount();

  return (
    <main className="space-y-6 rounded-[var(--radius-card)] border border-white/10 bg-[var(--parent-surface)] p-6 md:p-8">
      <ParentPageIntro
        eyebrow={hasExistingParentAccount ? "Parent login" : "Parent setup"}
        title={hasExistingParentAccount ? "Welcome back" : "Create the first parent account"}
        description={
          hasExistingParentAccount
            ? "Sign in with the parent email and password for this EduCore install."
            : "Start EduCore from inside the product with one parent email and password, then continue into the dashboard without relying on bootstrap scripts."
        }
      />
      <div className="grid gap-4 md:grid-cols-2">
        <ParentLoginForm hasExistingParentAccount={hasExistingParentAccount} />
        <div className="space-y-4 rounded-3xl border border-white/10 bg-[var(--parent-surface-soft)] p-5 text-sm leading-7 text-[var(--parent-muted)]">
          <p>
            This flow stays intentionally lean: one parent account, one signed session cookie, and a calm handoff into the dashboard so self-hosted setup stays practical.
          </p>
          <div>
            <p className="text-sm font-semibold text-[var(--parent-text)]">Included here</p>
            <PlaceholderList
              items={[
                "Create the first in-product parent account",
                "Sign in with the same parent auth foundation",
                "Leave recovery and broader account tools for later tickets",
              ]}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
