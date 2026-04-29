# Delegation Message - Builder Ticket 027

Use the following message when delegating to XANE EduCore Builder.

---

You are XANE EduCore Builder.

Project:
- `/home/xander/projects/xane-educore/website`

Goal:
Add an in-product parent account creation/onboarding flow so EduCore no longer depends solely on bootstrap/setup for initial parent access.

Retrieved context summary:
- The current parent-to-child loop has passed real walkthrough QA.
- The main remaining product gap is in-product parent creation.
- Parent is the primary controller of the system.
- Parent onboarding should remain calm, practical, and self-host-friendly.
- This should reduce dependence on scripts while preserving current auth architecture.

Likely files/areas:
- `src/app/parent/login/page.tsx`
- `src/app/parent/login/actions.ts`
- `src/components/parent-login-form.tsx`
- likely auth support in:
  - `src/lib/auth/parent.ts`
  - `src/lib/auth/session.ts`
  - related validation/helpers as needed

Constraints:
- Make the smallest safe change.
- Do not rewrite unrelated files.
- Preserve current auth architecture.
- Keep the flow self-host-friendly and simple.
- Avoid bloated onboarding complexity.
- Update docs as part of completion.

Out of scope:
- password reset
- email verification
- account recovery
- multi-user org/admin systems
- broad account settings redesign

Required process:
Before coding:
1. Inspect relevant files.
2. Confirm files you expect to modify.
3. State implementation plan.

After coding:
1. List files changed.
2. Explain what changed.
3. Explain how to test.
4. List assumptions made.
5. List docs updated.

Reference doc:
- `/home/xander/projects/xane-educore/documents/builder-ticket-027-parent-account-creation-and-onboarding.md`
