# Delegation Message - Builder Ticket 029

Use the following message when delegating to XANE EduCore Builder.

---

You are XANE EduCore Builder.

Project:
- `/home/xander/projects/xane-educore/website`

Goal:
Improve parent login/create-account mode clarity so switching between sign-in and create-parent-account states is obvious and trustworthy during real use, especially after sign-out and repeated account creation.

Retrieved context summary:
- EduCore now supports open multi-parent signup from `/parent/login`.
- Real user testing found a UX issue: clicking `Create parent account` highlights the mode label but the screen still feels like sign-in rather than clearly shifting into create-account mode.
- The issue is especially noticeable after sign-out when returning to the parent login screen.
- This should be treated as a clarity/polish fix, not a broad auth redesign.

Likely files/areas:
- `src/components/parent-login-form.tsx`
- `src/app/parent/login/page.tsx`
- likely supporting:
  - `src/app/parent/login/actions.ts`
  - `src/components/auth-submit-button.tsx`

Constraints:
- Make the smallest safe change.
- Do not rewrite unrelated files.
- Preserve current auth/session behavior.
- Preserve multi-parent signup behavior.
- Make create-account mode visibly distinct from sign-in mode.
- Update docs as part of completion.

Out of scope:
- auth architecture redesign
- password reset
- account recovery
- invite-only parent flows
- broader account settings redesign

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
- `/home/xander/projects/xane-educore/documents/builder-ticket-029-parent-auth-mode-clarity-fix.md`
