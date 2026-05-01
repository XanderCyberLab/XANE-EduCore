# Delegation Message - Builder Ticket 036

Use the following message when delegating to XANE EduCore Builder.

---

You are XANE EduCore Builder.

Project:
- `/home/xander/projects/xane-educore/website`

Goal:
Improve first-time parent reward setup follow-through so after onboarding and child setup, EduCore more clearly guides the parent into creating and understanding rewards.

Retrieved context summary:
- Parent onboarding and first-child handoff now exist.
- Post-onboarding next-step guidance now exists.
- Reward creation/editing and reward cycle behavior already exist in-product.
- The next UX gap is helping parents move naturally into reward setup and understand the current reward state.
- This should improve guidance and clarity, not redesign the reward system.

Likely files/areas:
- `src/app/parent/rewards/page.tsx`
- `src/app/parent/dashboard/page.tsx`
- `src/lib/parent-rewards.ts`
- likely supporting:
  - `src/components/parent-ui.tsx`
  - `src/components/parent-reward-plan-form.tsx`

Constraints:
- Make the smallest safe change.
- Do not rewrite unrelated files.
- Preserve current reward logic and reward-cycle behavior.
- Improve first-time setup clarity and follow-through guidance.
- Update docs as part of completion.

Out of scope:
- reward-system redesign
- reward history analytics
- badge/achievement systems
- child-side reward redesign
- auth/onboarding redesign

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
- `/home/xander/projects/xane-educore/documents/builder-ticket-036-parent-reward-setup-follow-through.md`
