# Delegation Message - Builder Ticket 043

Use the following message when delegating to XANE EduCore Builder.

---

You are XANE EduCore Builder.

Project:
- `/home/xander/projects/xane-educore/website`

Goal:
Prepare the weekly planner for future AI-assisted generation by improving planner generation inputs, clarifying structured output expectations, and reinforcing parent-review-first generation boundaries, without adding real AI integration yet.

Retrieved context summary:
- EduCore now has stronger planner authoring and scoped regeneration.
- Product direction includes later AI-assisted weekly planning.
- Jumping straight to AI generation would be risky without cleaner planner inputs and stricter output expectations.
- The next safe step is prep work, not full AI integration.

Likely files/areas:
- `src/app/parent/planner/page.tsx`
- `src/app/parent/planner/actions.ts`
- `src/components/parent-planner-create-form.tsx`
- `src/lib/planner-data.ts`
- likely supporting:
  - `src/components/parent-ui.tsx`
  - related planner docs/copy

Constraints:
- Make the smallest safe change.
- Do not rewrite unrelated files.
- Do not add real LLM/provider integration yet.
- Preserve current planner persistence and scoped editing behavior.
- Improve planner readiness for later AI assistance.
- Keep parent-review-first behavior clear.
- Update docs as part of completion.

Out of scope:
- real AI model integration
- local model runtime integration
- autonomous planner behavior
- child-facing AI experiences
- curriculum engine redesign

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
- `/home/xander/projects/xane-educore/documents/builder-ticket-043-ai-assisted-weekly-planning-prep.md`
