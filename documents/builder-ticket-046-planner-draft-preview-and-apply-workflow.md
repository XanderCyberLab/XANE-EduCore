# Builder Ticket 046 - Planner Draft Preview and Apply Workflow

## Owner
XANE EduCore, project lead

## Implementation agent
XANE EduCore Builder

## Project
- `/home/xander/projects/xane-educore/website`

## Goal
Improve the planner draft preview/apply workflow so parents can more clearly understand what a stored draft would change before approving it.

## Retrieved context summary
- EduCore now has planner draft storage and a provider boundary.
- Drafts are separate from live weekly plans.
- Parent approval is already required before draft apply.
- The next practical refinement is making draft review and apply behavior clearer before future AI-backed generation expands.

## Likely files/areas
- `src/app/parent/planner/page.tsx`
- `src/app/parent/planner/actions.ts`
- `src/lib/planner-data.ts`
- `src/components/parent-ui.tsx`
- likely supporting:
  - planner form/components

## Constraints
- Make the smallest safe change.
- Do not rewrite unrelated files.
- Preserve current draft-first and completion-protection behavior.
- Improve preview/apply clarity, not full planner redesign.
- Update docs as part of completion.

## Out of scope
- live model integration
- planner version-history system
- major planner redesign
- child-side planner changes

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
