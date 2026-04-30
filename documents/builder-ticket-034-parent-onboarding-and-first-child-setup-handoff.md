# Builder Ticket 034 - Parent Onboarding and First-Child Setup Handoff

## Owner
XANE EduCore, project lead

## Implementation agent
XANE EduCore Builder

## Project
- `/home/xander/projects/xane-educore/website`

## Goal
Add a lightweight parent onboarding and first-child setup handoff so a newly created parent account flows naturally into family setup without introducing a large wizard system.

## Retrieved context summary
- Parent account creation now works in-product.
- Multi-parent signup works.
- Child creation already exists in-product.
- The next meaningful UX gap is what happens immediately after a new parent creates an account.
- The desired direction is a lightweight onboarding handoff, not a heavy multi-step wizard yet.

## Likely files/areas
- `src/app/parent/login/page.tsx`
- `src/app/parent/login/actions.ts`
- `src/app/parent/dashboard/page.tsx`
- `src/app/parent/children/page.tsx`
- likely supporting:
  - `src/lib/auth/session.ts`
  - `src/lib/parent-dashboard.ts`
  - small new onboarding surface/route if needed

## Constraints
- Make the smallest safe change.
- Do not rewrite unrelated files.
- Preserve current auth/session behavior.
- Preserve current child creation behavior.
- Focus on onboarding handoff, not full wizard complexity.
- Update docs as part of completion.

## Out of scope
- deep onboarding wizard
- AI-guided onboarding
- curriculum personalization at signup
- parent username work
- broad dashboard redesign

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

## Implementation notes
- New parent account creation now redirects to a lightweight `/parent/onboarding` handoff.
- The onboarding surface reuses the existing child creation flow instead of introducing a multi-step wizard.
- Parents can skip directly to the dashboard, and the dashboard now keeps a visible first-child CTA when no child profiles exist yet.
- Creating the first child from onboarding redirects back into the dashboard with a small completion-state handoff.
