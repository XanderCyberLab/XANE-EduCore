# Builder Ticket 044 - Planner Draft Storage and Approval Flow

## Owner
XANE EduCore, project lead

## Implementation agent
XANE EduCore Builder

## Project
- `/home/xander/projects/xane-educore/website`

## Goal
Add a planner draft storage model and parent approval flow foundation so future AI-assisted planning can generate reviewable drafts before any live planner mutation.

## Retrieved context summary
- EduCore now has stronger planner inputs and scoped planner controls.
- Product direction for AI planning requires draft-first, parent-review-first behavior.
- AI should not write directly into live planner state.
- The next backend-safe step is storing planner drafts separately from applied weekly plans.

## Likely files/areas
- planner-related schema/model files
- `src/app/parent/planner/actions.ts`
- `src/app/parent/planner/page.tsx`
- `src/lib/planner-data.ts`
- likely supporting:
  - planner UI/components
  - migration files if needed

## Constraints
- Make the smallest safe change.
- Do not rewrite unrelated files.
- Do not add real AI provider integration yet.
- Preserve current live planner behavior.
- Add draft-first/approval-first foundation without overbuilding a full AI workflow yet.
- Update docs as part of completion.

## Out of scope
- real LLM integration
- autonomous planner writes
- full AI orchestration service
- full version-history system
- child-facing AI workflows

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

## Builder completion notes

Implemented foundation:
- added separate `PlannerDraft` and `PlannerDraftItem` Prisma models
- added migration `20260501164000_add_planner_drafts`
- changed planner generation to save a reviewable draft instead of writing directly to `WeeklyPlan`
- added parent approval action to apply a stored draft into the live weekly plan
- kept completion-protection checks when applying a draft into live planner state
- surfaced draft status and approval action in the parent planner UI

Validation run:
- `pnpm prisma generate`
- `pnpm exec tsc --noEmit`
- `pnpm exec eslint src/app/parent/planner/actions.ts src/lib/planner-data.ts src/components/parent-ui.tsx src/components/parent-planner-create-form.tsx`
