import { ParentLoginForm } from "@/components/parent-login-form";
import { ParentPageIntro, PlaceholderList } from "@/components/shells";
import { hasParentAccount } from "@/lib/auth/parent";

export default async function ParentLoginPage() {
  const hasExistingParentAccount = await hasParentAccount();

  return (
    <main className="space-y-6 rounded-[var(--radius-card)] border border-white/10 bg-[var(--parent-surface)] p-6 md:p-8">
      <ParentPageIntro
        eyebrow={hasExistingParentAccount ? "Parent login" : "Parent setup"}
        title={hasExistingParentAccount ? "Welcome back" : "Create a parent account"}
        description={
          hasExistingParentAccount
            ? "Sign in with an existing parent account, or create a new one from this screen."
            : "Start EduCore from inside the product by creating a parent account, then continue into the dashboard without relying on bootstrap scripts."
        }
      />
      <div className="grid gap-4 md:grid-cols-2">
        <ParentLoginForm hasExistingParentAccount={hasExistingParentAccount} />
        <div className="space-y-4 rounded-3xl border border-white/10 bg-[var(--parent-surface-soft)] p-5 text-sm leading-7 text-[var(--parent-muted)]">
          <p>
            This flow stays intentionally lean: parent accounts are created directly from the login surface, each uses the same signed session foundation, and the handoff into the dashboard stays calm for self-hosted setup.
          </p>
          <div>
            <p className="text-sm font-semibold text-[var(--parent-text)]">Included here</p>
            <PlaceholderList
              items={[
                "Create parent accounts directly inside the product",
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
