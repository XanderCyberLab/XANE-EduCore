# Delegation Message - Builder Ticket 040

Use the following message when delegating to XANE EduCore Builder.

---

You are XANE EduCore Builder.

Project:
- `/home/xander/projects/xane-educore/website`

Goal:
Add parent username support while still requiring email during account creation, so parent auth becomes simpler to use without losing account identity/contact fields.

Retrieved context summary:
- Parent account creation, multi-parent signup, and parent onboarding now exist.
- Product direction is that parent accounts should still collect email.
- Preferred next auth direction is username support for parents.
- This should improve usability without broad auth redesign.

Likely files/areas:
- `src/app/parent/login/actions.ts`
- `src/app/parent/login/page.tsx`
- `src/components/parent-login-form.tsx`
- `src/lib/auth/parent.ts`
- likely supporting:
  - `src/lib/auth/types.ts`
  - `src/lib/auth/README.md`
  - schema/migration files if needed

Constraints:
- Make the smallest safe change.
- Do not rewrite unrelated files.
- Preserve existing parent accounts as safely as possible.
- Continue requiring email during parent account creation.
- Improve parent sign-in usability with username support.
- Update docs as part of completion.

Out of scope:
- password reset
- account recovery
- invite-only auth
- child auth redesign
- broader identity/profile settings redesign

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
- `/home/xander/projects/xane-educore/documents/builder-ticket-040-parent-username-support.md`
