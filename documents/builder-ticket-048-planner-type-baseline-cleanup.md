# Builder Ticket 048 - Planner Type Baseline Cleanup

## Owner
XANE EduCore, project lead

## Implementation agent
XANE EduCore Builder

## Project
- `/home/xander/projects/xane-educore/website`

## Goal
Fix the existing planner-related TypeScript baseline issue so current planner and AI-foundation work sits on a clean type-safe base.

## Retrieved context summary
- Recent child profile context work passed Prisma generation but exposed an existing unrelated TypeScript issue.
- Reported area: `src/lib/planner-data.ts` around `draftImpact.previewItems.changeType`.
- Before deeper AI backend work, it is better to restore a clean type baseline.
- This is a technical cleanup task, not a product-surface redesign.

## Likely files/areas
- `src/lib/planner-data.ts`
- likely supporting:
  - related planner types in nearby planner files if needed

## Constraints
- Make the smallest safe change.
- Do not rewrite unrelated files.
- Preserve current planner behavior.
- Restore a clean TypeScript baseline.
- Update docs as part of completion.

## Out of scope
- planner redesign
- AI integration changes
- schema redesign
- unrelated lint/style cleanup

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

## Required verification
Builder should explicitly verify:
1. `npx tsc --noEmit`
2. relevant planner lint if applicable

## Implementation notes
- Resolved the planner TypeScript baseline issue by explicitly typing the draft preview item shape in `src/lib/planner-data.ts`.
- This keeps `draftImpact.previewItems.changeType` narrowed to `"add" | "replace" | "unchanged"` during array construction.
- Planner behavior was preserved, with no product-surface changes.
- Verification completed with `npx tsc --noEmit` and `npx eslint src/lib/planner-data.ts src/components/parent-ui.tsx`.
