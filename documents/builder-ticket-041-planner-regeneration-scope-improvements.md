# Builder Ticket 041 - Planner Regeneration Scope Improvements

## Owner
XANE EduCore, project lead

## Implementation agent
XANE EduCore Builder

## Project
- `/home/xander/projects/xane-educore/website`

## Goal
Improve planner regeneration/editing scope so parents can make safer smaller changes, especially at single-day or partial-week scope, without forcing unnecessary full-week replacement pressure.

## Retrieved context summary
- EduCore already has persisted weekly planning and safe overwrite protection.
- Current planner authoring is stronger, but regeneration/editing is still coarse.
- Product direction favors parent-controlled practical planning changes.
- The next meaningful planner improvement is safer smaller-scope regeneration or editing behavior.

## Likely files/areas
- `src/app/parent/planner/page.tsx`
- `src/app/parent/planner/actions.ts`
- `src/components/parent-planner-create-form.tsx`
- `src/lib/planner-data.ts`
- likely supporting:
  - `src/components/parent-ui.tsx`

## Constraints
- Make the smallest safe change.
- Do not rewrite unrelated files.
- Preserve current planner persistence behavior.
- Preserve completion-linked protections.
- Improve scope control without turning this into a full planner redesign.
- Update docs as part of completion.

## Out of scope
- full planner rewrite
- drag/drop scheduling
- AI planner redesign
- full version-history system
- broad curriculum engine changes

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
Completed with a small-scope planner editing update:
- added parent-facing scope controls for full week, single day, or day range
- changed planner saving so only the targeted day and subject slice is replaced
- preserved existing items outside the selected scope
- kept completion-linked overwrite protection, but narrowed it to the targeted scope instead of blocking unrelated edits
