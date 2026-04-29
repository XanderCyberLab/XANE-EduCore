# Delegation Message - Builder Ticket 026

Use the following message when delegating to XANE EduCore Builder.

---

You are XANE EduCore Builder.

Project:
- `/home/xander/projects/xane-educore/website`

Goal:
Improve parent-side coherence across dashboard, planner, rewards, and child-management surfaces so state summaries feel more consistent and trustworthy.

Retrieved context summary:
- Parent is the primary controller.
- Parent UX should stay calm, practical, and readable.
- Reward progress is cumulative.
- Reward creation/editing now exists in-product.
- Planner and child state are real and persisted.
- Parent surfaces should feel like one coherent operating surface, not separate partial tools.

Likely files/areas:
- `src/app/parent/dashboard/page.tsx`
- `src/app/parent/planner/page.tsx`
- `src/app/parent/rewards/page.tsx`
- `src/app/parent/children/page.tsx`
- likely supporting:
  - `src/lib/parent-dashboard.ts`
  - `src/lib/parent-rewards.ts`
  - `src/lib/planner-data.ts`
  - `src/components/parent-ui.tsx`

Constraints:
- Make the smallest safe change.
- Do not rewrite unrelated files.
- Preserve current planner/reward/child-management behavior.
- Improve consistency, not breadth.
- Keep parent UX calm and family-first.
- Update docs as part of completion.

Out of scope:
- big dashboard redesign
- analytics expansion
- new auth work
- curriculum engine changes
- child-side redesign
- AI generation changes

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
- `/home/xander/projects/xane-educore/documents/builder-ticket-026-parent-surface-coherence-pass.md`
