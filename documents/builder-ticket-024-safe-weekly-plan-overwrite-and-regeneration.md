# Builder Ticket 024 - Safe Weekly Plan Overwrite and Regeneration

## Owner
XANE EduCore, project lead

## Implementation agent
XANE EduCore Builder

## Project
- `/home/xander/projects/xane-educore/website`

## Goal
Add safe weekly plan overwrite/regeneration behavior so parent changes to an existing week do not silently break linked completion state, while preserving the current planner flow.

## Retrieved context summary
- EduCore already uses persisted weekly plans and plan items.
- Child daily task flow depends on active weekly plans.
- Current overwrite behavior is known to be risky when completions exist.
- Safer weekly plan editing/regeneration is already a recognized near-term priority.

## Likely files/areas
- `src/app/parent/planner/actions.ts`
- `src/app/parent/planner/page.tsx`
- `src/lib/planner-data.ts`
- likely supporting:
  - `src/components/parent-ui.tsx`
  - `src/lib/child-dashboard.ts`

## Constraints
- Make the smallest safe change.
- Do not rewrite unrelated files.
- Preserve the current calm parent planner UX.
- Do not silently destroy completion-linked meaning.
- Avoid full planner-system redesign.
- Report docs that may need updating.

## Out of scope
- full planner redesign
- AI generation redesign
- drag/drop scheduling
- deep curriculum engine changes
- reward logic changes
- full version-history system
- advanced diff/merge planner tooling

## Required process
Before coding:
1. Inspect relevant files.
2. Confirm files you expect to modify.
3. State implementation plan.

After coding:
1. List files changed.
2. Explain what changed.
3. Explain how to test.
4. List assumptions and docs to update.
