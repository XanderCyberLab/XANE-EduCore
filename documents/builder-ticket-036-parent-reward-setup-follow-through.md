# Builder Ticket 036 - Parent Reward Setup Follow-Through

## Owner
XANE EduCore, project lead

## Implementation agent
XANE EduCore Builder

## Project
- `/home/xander/projects/xane-educore/website`

## Goal
Improve first-time parent reward setup follow-through so after onboarding and child setup, EduCore more clearly guides the parent into creating and understanding rewards.

## Retrieved context summary
- Parent onboarding and first-child handoff now exist.
- Post-onboarding next-step guidance now exists.
- Reward creation/editing and reward cycle behavior already exist in-product.
- The next UX gap is helping parents move naturally into reward setup and understand the current reward state.
- This should improve guidance and clarity, not redesign the reward system.

## Likely files/areas
- `src/app/parent/rewards/page.tsx`
- `src/app/parent/dashboard/page.tsx`
- `src/lib/parent-rewards.ts`
- likely supporting:
  - `src/components/parent-ui.tsx`
  - `src/components/parent-reward-plan-form.tsx`

## Constraints
- Make the smallest safe change.
- Do not rewrite unrelated files.
- Preserve current reward logic and reward-cycle behavior.
- Improve first-time setup clarity and follow-through guidance.
- Update docs as part of completion.

## Out of scope
- reward-system redesign
- reward history analytics
- badge/achievement systems
- child-side reward redesign
- auth/onboarding redesign

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

---

## Completion notes

### Files changed
- `src/app/parent/rewards/page.tsx`
- `src/app/parent/dashboard/page.tsx`
- `src/lib/parent-rewards.ts`
- `documents/builder-ticket-036-parent-reward-setup-follow-through.md`

### What changed
- Added reward setup summary data in `parent-rewards` so the rewards page can show follow-through status at a glance.
- Improved the parent rewards page with:
  - clearer hero copy when reward plans are still missing
  - a simple "How rewards work" explainer
  - a setup status panel showing how many children have reward paths and what the next reward action is
  - a stronger empty-state message for first-time reward setup
- Improved the parent dashboard reward guidance so after onboarding and child creation it more explicitly points parents toward setting the first reward path.

### How to test
- Start the website locally from `/home/xander/projects/xane-educore/website`.
- Visit `/parent/dashboard` with a parent account that has:
  - at least one child without a reward plan
  - at least one child with a reward plan, if available
- Verify on `/parent/dashboard`:
  - the onboarding next-step card says "Set the first reward"
  - the rewards quick-link copy changes when reward plans are missing
- Visit `/parent/rewards`.
- Verify on `/parent/rewards`:
  - the hero copy changes when children are missing reward plans
  - the new explainer and setup status panels appear
  - children without reward plans are clearly prompted with creation forms
  - existing reward plans still render, edit, and redeem as before
- Run lint:
  - `npm run lint -- src/app/parent/rewards/page.tsx src/app/parent/dashboard/page.tsx src/lib/parent-rewards.ts`

### Assumptions made
- A child without an active reward plan should be treated as the main first-time setup gap.
- Small guidance and copy changes are preferable to introducing a new reward onboarding flow.
- Existing reward logic and redemption behavior should remain unchanged.

### Docs updated
- `documents/builder-ticket-036-parent-reward-setup-follow-through.md`
