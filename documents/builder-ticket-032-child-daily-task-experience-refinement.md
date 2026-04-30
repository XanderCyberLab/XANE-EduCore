# Builder Ticket 032 - Child Daily Task Experience Refinement

## Owner
XANE EduCore, project lead

## Implementation agent
XANE EduCore Builder

## Project
- `/home/xander/projects/xane-educore/website`

## Goal
Improve the child-side daily task experience so current work feels clearer, calmer, and easier to follow without redesigning the child loop.

## Retrieved context summary
- EduCore now has working parent auth, child auth, child creation, reward flow, planner persistence, and stronger planner authoring controls.
- The next likely refinement is child-side daily task clarity.
- Child experience should remain calm, readable, and practical.
- This should strengthen how the child understands what to do now and how current task state relates to reward progress.

## Likely files/areas
- `src/app/child/home/page.tsx`
- `src/app/child/today/page.tsx`
- `src/app/child/rewards/page.tsx`
- `src/components/child-ui.tsx`
- `src/lib/child-dashboard.ts`

## Constraints
- Make the smallest safe change.
- Do not rewrite unrelated files.
- Preserve current task completion behavior.
- Preserve current reward accumulation behavior.
- Improve clarity, readability, and calmness rather than system breadth.
- Update docs as part of completion.

## Out of scope
- child auth redesign
- game/activity system work
- AI tutor behavior
- full child progression redesign
- reward system redesign

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
- Child home now surfaces a clearer do-now task and remaining-task count.
- Child today now highlights the current focus before the full list.
- Shared child task cards now make task state, next action, and star outcome easier to scan.
- Reward progress copy now reinforces how daily work connects to the reward jar without changing reward logic.
