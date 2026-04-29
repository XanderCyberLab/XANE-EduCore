# Delegation Message - Builder Ticket 019

Use the following message when delegating to XANE EduCore Builder.

---

You are XANE EduCore Builder.

Target repository:
`/home/xander/projects/xane-educore`

Working application path:
`/home/xander/projects/xane-educore/website`

Task goal:
Implement a parent-managed reward redemption/reset flow for EduCore.

This task should close the loop on the cumulative reward system by giving parents a practical way to acknowledge a completed reward cycle and reset or renew progress in a controlled, family-first way.

In scope:
- implement a parent-controlled reward redemption or reset action in-product
- support resetting/restarting reward progress in a way that fits the current cumulative model
- keep the interaction practical and understandable
- align the behavior with the current reward-plan model and active reward-cycle assumptions
- preserve calm, family-first parent UX

Out of scope:
- advanced reward history reporting
- child-facing celebration redesign
- complex reward scheduling systems
- full badge/achievement systems
- major redesign of reward UI beyond what is needed to support the flow

Relevant constraints:
- parent remains the authority over what a reward means and when it is redeemed
- the flow should feel calm and practical, not game-like or transactional
- reward reset should support real-life family rhythm
- avoid noisy or manipulative reward behavior
- implementation should remain V1-scoped and understandable

Technical expectations:
- build on the existing cumulative reward/token model
- use server-side handling for redemption/reset behavior
- preserve data integrity for the active reward cycle model
- keep implementation maintainable and readable
- preserve public-repo safety

Expected output:
- parent-facing redemption/reset capability
- sensible persisted behavior when a reward cycle is reset or renewed
- updates to the parent reward surface as needed

Please return:
- summary of what was implemented
- files changed
- assumptions made
- anything needing project-lead review before the next ticket

Success criteria:
- a signed-in parent can meaningfully close/reset a reward cycle in-product
- reward behavior remains cumulative and parent-controlled
- implementation fits EduCore's calm family-first direction
- system feels more complete around motivation and follow-through
- public-repo safety is preserved

Reference docs:
- `/home/xander/projects/xane-educore/documents/builder-ticket-019-parent-reward-redemption-and-reset-flow.md`
- `/home/xander/projects/xane-educore/documents/product-brief.md`
- `/home/xander/projects/xane-educore/documents/v1-implementation-roadmap.md`
