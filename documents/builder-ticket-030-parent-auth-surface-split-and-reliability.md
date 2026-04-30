# Builder Ticket 030 - Parent Auth Surface Split and Reliability

## Owner
XANE EduCore, project lead

## Implementation agent
XANE EduCore Builder

## Project
- `/home/xander/projects/xane-educore/website`

## Goal
Replace the fragile parent sign-in/create-account mode experience with a clearer and more reliable auth entry surface so returning parents can sign in and new parents can create accounts repeatedly without mode confusion after sign-out.

## Retrieved context summary
- EduCore V1 now supports open multi-parent signup.
- Real testing found that the current shared toggle-based auth form remains unreliable or confusing after sign-out.
- The desired product behavior is a standard platform-style parent auth entry point:
  - existing parents choose sign in
  - new parents choose create account
  - multiple parent accounts persist in the database
  - additional parent accounts can be created later from the website
- A later onboarding flow may ask child setup questions, but that is not the current task.

## Likely files/areas
- `src/app/parent/login/page.tsx`
- `src/components/parent-login-form.tsx`
- likely supporting:
  - `src/app/parent/login/actions.ts`
  - `src/components/auth-submit-button.tsx`
  - auth helper files only if absolutely needed

## Constraints
- Make the smallest safe change that fixes reliability.
- Do not rewrite unrelated files.
- Preserve current multi-parent database behavior.
- Preserve current sign-in/session behavior.
- Prefer clearer separated auth paths over subtle toggle behavior if that is the safer fix.
- Update docs as part of completion.

## Out of scope
- auth backend redesign
- password reset
- account recovery
- email verification
- parent invite system
- full onboarding wizard with child setup

## Required process
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

## Required test coverage
Builder must verify or describe exact steps for:
1. Open `/parent/login`.
2. Confirm sign-in and create-account paths are clearly separate.
3. Create parent account with email A.
4. Confirm redirect to dashboard.
5. Sign out.
6. Return to `/parent/login`.
7. Choose create-account path again.
8. Create parent account with email B.
9. Confirm redirect to dashboard.
10. Sign out.
11. Confirm email A can sign in.
12. Sign out.
13. Confirm email B can sign in.
14. Try creating email A again.
15. Confirm duplicate-email rejection appears clearly.

## Builder completion notes
- Replaced the shared toggle-based auth form with two separate forms rendered side by side on `/parent/login`.
- Kept the existing server actions intact for sign-in and account creation, preserving current session and multi-parent behavior.
- Added distinct labels, copy, and input ids for each path so sign-in and create-account flows remain available after sign-out without mode switching.
- Updated the page intro copy to reflect the split auth entry surface.

## Verification
- `npm run lint -- src/components/parent-login-form.tsx src/app/parent/login/page.tsx`
- Manual browser verification is still needed for the full create/sign-out/recreate/sign-in sequence against a live local database.
