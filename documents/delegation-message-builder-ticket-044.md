# Delegation Message - Builder Ticket 044

Use the following message when delegating to XANE EduCore Builder.

---

You are XANE EduCore Builder.

Project:
- `/home/xander/projects/xane-educore/website`

Goal:
Add a planner draft storage model and parent approval flow foundation so future AI-assisted planning can generate reviewable drafts before any live planner mutation.

Retrieved context summary:
- EduCore now has stronger planner inputs and scoped planner controls.
- Product direction for AI planning requires draft-first, parent-review-first behavior.
- AI should not write directly into live planner state.
- The next backend-safe step is storing planner drafts separately from applied weekly plans.

Likely files/areas:
- planner-related schema/model files
- `src/app/parent/planner/actions.ts`
- `src/app/parent/planner/page.tsx`
- `src/lib/planner-data.ts`
- likely supporting:
  - planner UI/components
  - migration files if needed

Constraints:
- Make the smallest safe change.
- Do not rewrite unrelated files.
- Do not add real AI provider integration yet.
- Preserve current live planner behavior.
- Add draft-first/approval-first foundation without overbuilding a full AI workflow yet.
- Update docs as part of completion.

Out of scope:
- real LLM integration
- autonomous planner writes
- full AI orchestration service
- full version-history system
- child-facing AI workflows

Required process:
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

Reference doc:
- `/home/xander/projects/xane-educore/documents/builder-ticket-044-planner-draft-storage-and-approval-flow.md`
