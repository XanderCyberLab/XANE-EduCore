# Builder Ticket 049 - First AI Provider Integration

## Owner
XANE EduCore, project lead

## Implementation agent
XANE EduCore Builder

## Project
- `/home/xander/projects/xane-educore/website`

## Goal
Add the first real AI provider integration behind the planner generation adapter boundary while preserving the draft-first, parent-review-first workflow.

## Retrieved context summary
- EduCore now has planner prep inputs, draft storage, draft review/apply flow, and a provider boundary.
- Product direction includes local/self-hosted AI support later.
- The next safe step is first-provider integration behind the adapter layer, not direct planner-to-model coupling.
- Live planner mutation must still happen only after parent approval.

## Likely files/areas
- `src/lib/planner-generation.ts`
- likely new provider/config modules
- `src/app/parent/planner/actions.ts`
- environment/config docs if needed

## Constraints
- Make the smallest safe change.
- Do not rewrite unrelated files.
- Preserve draft-first and parent-approval-first behavior.
- Integrate the first provider behind the adapter boundary only.
- Do not allow direct live planner writes from provider output.
- Update docs as part of completion.

## Out of scope
- autonomous planner actions
- child-facing AI integration
- broad AI orchestration platform work
- non-draft live planner mutation

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
