# Builder Ticket 026 - Parent Surface Coherence Pass

## Owner
XANE EduCore, project lead

## Implementation agent
XANE EduCore Builder

## Project
- `/home/xander/projects/xane-educore/website`

## Goal
Improve parent-side coherence across dashboard, planner, rewards, and child-management surfaces so state summaries feel more consistent and trustworthy.

## Retrieved context summary
- Parent is the primary controller.
- Parent UX should stay calm, practical, and readable.
- Reward progress is cumulative.
- Reward creation/editing now exists in-product.
- Planner and child state are real and persisted.
- Parent surfaces should feel like one coherent operating surface, not separate partial tools.

## Likely files/areas
- `src/app/parent/dashboard/page.tsx`
- `src/app/parent/planner/page.tsx`
- `src/app/parent/rewards/page.tsx`
- `src/app/parent/children/page.tsx`
- likely supporting:
  - `src/lib/parent-dashboard.ts`
  - `src/lib/parent-rewards.ts`
  - `src/lib/planner-data.ts`
  - `src/components/parent-ui.tsx`

## Constraints
- Make the smallest safe change.
- Do not rewrite unrelated files.
- Preserve current planner/reward/child-management behavior.
- Improve consistency, not breadth.
- Keep parent UX calm and family-first.
- Update docs as part of completion.

## Out of scope
- big dashboard redesign
- analytics expansion
- new auth work
- curriculum engine changes
- child-side redesign
- AI generation changes

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
- `src/components/parent-ui.tsx`
- `src/app/parent/dashboard/page.tsx`
- `src/app/parent/planner/page.tsx`
- `src/app/parent/rewards/page.tsx`
- `src/app/parent/children/page.tsx`
- `src/lib/planner-data.ts`
- `src/lib/parent-rewards.ts`
- `documents/builder-ticket-026-parent-surface-coherence-pass.md`

### What changed
- Added a small shared `ParentSurfaceSummary` component so parent pages can present top-level state in the same card pattern.
- Swapped the dashboard summary cards to use that shared component instead of a one-off grid.
- Added persisted planner summary data in `getParentPlannerData()` so the planner now opens with the same kind of compact trust-building state strip.
- Added persisted reward summary data in `getParentRewardPageData()` so rewards uses the same summary pattern without changing reward behavior.
- Added a matching child-management summary strip using existing saved child/profile/reward state so children, planner, rewards, and dashboard feel like one connected parent surface.

### How to test
- Start the website app normally.
- Visit `/parent/dashboard` and verify the top summary strip still shows three cards with the existing weekly family state.
- Visit `/parent/planner` and verify a three-card summary strip appears above the planner board, reflecting saved plan coverage, days with saved blocks, and printable support count.
- Visit `/parent/rewards` and verify a three-card summary strip appears above the reward plans, reflecting active plans, current cycle totals, and decision pressure.
- Visit `/parent/children` and verify a three-card summary strip appears above child management, reflecting plan connection, PIN readiness, and reward connection.
- Confirm no reward editing, reward redemption, planner creation, or child profile behavior changed.
- Run: `npx eslint src/app/parent/dashboard/page.tsx src/app/parent/planner/page.tsx src/app/parent/rewards/page.tsx src/app/parent/children/page.tsx src/components/parent-ui.tsx src/lib/planner-data.ts src/lib/parent-rewards.ts`

### Assumptions made
- A shared summary strip is the smallest safe way to improve cross-surface coherence without redesigning the parent UI.
- Parent trust improves more from consistent presentation of persisted state than from adding new features or metrics.
- For rewards, one decision-oriented summary card is enough, rather than preserving separate ready/close cards.

### Docs updated
- `documents/builder-ticket-026-parent-surface-coherence-pass.md`
