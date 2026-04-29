# Delegation Message - Builder Ticket 025

Use the following message when delegating to XANE EduCore Builder.

---

You are XANE EduCore Builder.

Project:
- `/home/xander/projects/xane-educore/website`

Goal:
Improve parent-side reward plan creation and editing so parents can better manage reward text and token goals in-product.

Retrieved context summary:
- Reward accumulation is real and cumulative.
- Reward reset/redeem flow exists.
- Parent is the authority over reward meaning.
- Rewards should remain calm, practical, and real-world oriented.
- The next gap is smoother in-product reward authoring/editing.

Likely files/areas:
- `src/app/parent/rewards/page.tsx`
- `src/app/parent/rewards/actions.ts`
- `src/lib/parent-rewards.ts`
- likely supporting:
  - `src/components/parent-reward-cycle-form.tsx`
  - `src/components/parent-ui.tsx`

Constraints:
- Make the smallest safe change.
- Do not rewrite unrelated files.
- Preserve the current cumulative reward-cycle model.
- Keep reward meaning parent-defined.
- Avoid broad reward-system redesign.
- Report docs that may need updating.

Out of scope:
- child celebration redesign
- reward history analytics
- advanced reward scheduling
- badges/achievements
- broad motivation-system changes

Required process:
Before coding:
1. Inspect relevant files.
2. Confirm files you expect to modify.
3. State implementation plan.

After coding:
1. List files changed.
2. Explain what changed.
3. Explain how to test.
4. List assumptions and docs to update.

Reference doc:
- `/home/xander/projects/xane-educore/documents/builder-ticket-025-parent-reward-plan-creation-and-editing.md`
