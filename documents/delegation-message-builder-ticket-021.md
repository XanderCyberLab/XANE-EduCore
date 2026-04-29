# Delegation Message - Builder Ticket 021

Use the following message when delegating to XANE EduCore Builder.

---

You are XANE EduCore Builder.

Target repository:
`/home/xander/projects/xane-educore`

Working application path:
`/home/xander/projects/xane-educore/website`

Task goal:
Refine the existing shared child daily task card UI so today’s tasks are easier for young children to scan, understand, and act on, while preserving the current persisted task/completion flow.

Retrieved product constraints:
- child experience must stay calm, visual, low-text, and touch-friendly
- child home should orient the child to today, progress, subjects, and reward jar state
- daily tasks are the main child-facing execution unit of the weekly plan
- tasks should be visually scannable and understandable quickly
- completion behavior should remain simple, calm, dependable, and not noisy

Codebase fit:
This work primarily fits in:
- `src/components/child-ui.tsx`
- `src/app/child/home/page.tsx`
- `src/app/child/today/page.tsx`

Likely supporting context:
- `src/lib/child-dashboard.ts`
- `src/components/task-complete-button.tsx`
- `src/app/child/actions.ts`

Existing components involved:
- `TodayTaskList`
- `TokenJarCard`
- `SubjectCardGrid`

In scope:
- refine the existing `TodayTaskList` card presentation
- improve hierarchy for title, subject cue, completion state, and next action
- improve consistency between compact and full task rendering
- preserve existing task completion action flow
- preserve existing persisted task/completion logic
- keep the UI tablet-friendly and child-readable

Out of scope:
- schema changes
- auth changes
- planner changes
- reward logic changes
- new task model behavior
- AI generation
- major route redesign

Expected output:
- improved shared child task card UI in existing component structure
- home and today task surfaces remain wired to current real data
- better young-child readability and scanability
- brief summary of design choices and assumptions

Success criteria:
- task cards are clearer and easier to scan for ages 4 to 6
- compact and full task views feel intentionally related
- completion state remains calm and obvious
- no unnecessary changes are made to the underlying task system

Required reporting format:
Before coding:
1. Confirm the files you intend to edit
2. Confirm that the task stays within the scoped UI-refinement boundary

After completion, report back with:
- what was changed
- files changed
- assumptions made
- anything needing project-lead review

Reference docs:
- `/home/xander/projects/xane-educore/documents/builder-ticket-021-child-daily-task-card-ui-refinement.md`
- `/mnt/hq/xane_core/knowledge/educore/canon/PROJECT_VISION.md`
- `/mnt/hq/xane_core/knowledge/educore/child-experience/CHILD_HOME_SCREEN.md`
- `/mnt/hq/xane_core/knowledge/educore/child-experience/TASK_FLOW.md`
- `/mnt/hq/xane_core/knowledge/educore/curriculum/DAILY_TASK_MODEL.md`
