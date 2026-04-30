# Delegation Message - Builder Ticket 035

Use the following message when delegating to XANE EduCore Builder.

---

You are XANE EduCore Builder.

Project:
- `/home/xander/projects/xane-educore/website`

Goal:
Improve the post-onboarding parent flow so after account creation and first-child setup, EduCore more clearly guides the parent into the next useful operational steps like planning and rewards.

Retrieved context summary:
- Parent onboarding and first-child setup handoff now exist.
- Child creation, planner, and rewards already exist in-product.
- The next UX gap is what happens after onboarding or after first child creation.
- The product should preserve setup momentum by making the next best steps visible.

Likely files/areas:
- `src/app/parent/dashboard/page.tsx`
- `src/app/parent/children/page.tsx`
- `src/app/parent/onboarding/page.tsx`
- likely supporting:
  - `src/lib/parent-dashboard.ts`
  - `src/components/parent-ui.tsx`

Constraints:
- Make the smallest safe change.
- Do not rewrite unrelated files.
- Preserve current auth, onboarding, and child-creation behavior.
- Improve guidance and handoff clarity, not full dashboard redesign.
- Update docs as part of completion.

Out of scope:
- onboarding wizard expansion
- AI onboarding
- planner redesign
- reward-system redesign
- username auth work

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
- `/home/xander/projects/xane-educore/documents/builder-ticket-035-parent-onboarding-follow-through-and-next-step-guidance.md`
