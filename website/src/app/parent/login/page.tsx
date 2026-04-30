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
            ? "Choose the path you need: sign in with an existing parent account, or create another one without switching a shared form mode."
            : "Start EduCore by creating a parent account, while keeping a separate sign-in path available for any existing parent account."
        }
      />
      <div className="grid gap-4">
        <ParentLoginForm hasExistingParentAccount={hasExistingParentAccount} />
        <div className="space-y-4 rounded-3xl border border-white/10 bg-[var(--parent-surface-soft)] p-5 text-sm leading-7 text-[var(--parent-muted)]">
          <p>
            This flow stays intentionally lean: parent accounts are created directly from the login surface, each uses the same signed session foundation, and new families get a light first-child setup handoff instead of a heavy onboarding wizard.
          </p>
          <div>
            <p className="text-sm font-semibold text-[var(--parent-text)]">Included here</p>
            <PlaceholderList
              items={[
                "Keep sign-in and create-account actions visibly separate",
                "Create parent accounts directly inside the product",
                "Leave recovery and broader account tools for later tickets",
              ]}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
