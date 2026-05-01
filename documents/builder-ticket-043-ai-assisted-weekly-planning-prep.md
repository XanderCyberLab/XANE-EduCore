# Builder Ticket 043 - AI-Assisted Weekly Planning Prep

## Owner
XANE EduCore, project lead

## Implementation agent
XANE EduCore Builder

## Project
- `/home/xander/projects/xane-educore/website`

## Goal
Prepare the weekly planner for future AI-assisted generation by improving planner generation inputs, clarifying structured output expectations, and reinforcing parent-review-first generation boundaries, without adding real AI integration yet.

## Retrieved context summary
- EduCore now has stronger planner authoring and scoped regeneration.
- Product direction includes later AI-assisted weekly planning.
- Jumping straight to AI generation would be risky without cleaner planner inputs and stricter output expectations.
- The next safe step is prep work, not full AI integration.

## Likely files/areas
- `src/app/parent/planner/page.tsx`
- `src/app/parent/planner/actions.ts`
- `src/components/parent-planner-create-form.tsx`
- `src/lib/planner-data.ts`
- likely supporting:
  - `src/components/parent-ui.tsx`
  - related planner docs/copy

## Constraints
- Make the smallest safe change.
- Do not rewrite unrelated files.
- Do not add real LLM/provider integration yet.
- Preserve current planner persistence and scoped editing behavior.
- Improve planner readiness for later AI assistance.
- Keep parent-review-first behavior clear.
- Update docs as part of completion.

## Out of scope
- real AI model integration
- local model runtime integration
- autonomous planner behavior
- child-facing AI experiences
- curriculum engine redesign

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

## Completion notes
Implemented a small planner-prep pass without adding real AI integration.

Changes made:
- added parent-authored planner prep inputs for learning focus, pacing preference, and support notes
- normalized plan lines into short title-style entries for cleaner future generation inputs
- added validation to keep subject lines concise and reviewable
- updated starter generation copy to frame output as a parent-reviewed draft, not autonomous planning
- refreshed planner guidance text so parent-review-first boundaries are explicit

Still intentionally not included:
- model/provider calls
- background generation jobs
- autonomous planner publishing
- schema changes or persistence redesign for AI metadata
