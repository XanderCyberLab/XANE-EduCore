# Delegation Message - Builder Ticket 020

Use the following message when delegating to XANE EduCore Builder.

---

You are XANE EduCore Builder.

Target repository:
`/home/xander/projects/xane-educore`

Working application path:
`/home/xander/projects/xane-educore/website`

Task goal:
Implement a parent-facing flow for creating or generating weekly learning plans in-product.

This task should move EduCore beyond bootstrap-only plan creation and toward a real parent-controlled weekly planning capability inside the app.

In scope:
- implement a parent-facing plan creation or generation flow in-product
- allow a parent to create a weekly plan for a child inside the app
- support creating plan items in a V1-practical way
- keep the experience calm, readable, and parent-controlled
- preserve the current weekly planner direction rather than turning it into a heavy scheduling system

Out of scope:
- advanced AI generation
- full natural-language planning UI
- complicated drag-and-drop scheduling
- large curriculum engine behavior
- institutional-grade scheduler features
- deep printable generation logic beyond current visibility cues

Relevant constraints:
- planning remains parent-controlled
- the flow should feel supportive, not burdensome
- the planner should stay family-first, not school-admin-like
- the experience should remain calm and practical
- implementation should stay V1-scoped and understandable
- this should prepare for future AI assistance without requiring it yet

Technical expectations:
- build on the current planner/persistence foundations
- use the existing weekly plan models sensibly
- preserve public-repo safety
- keep implementation maintainable and readable
- avoid overengineering the generation layer this early

Expected output:
- in-product parent flow for creating or generating a weekly plan
- persisted weekly plan creation behavior
- practical handling of plan items for a child
- planner UI updated as needed to support the flow

Please return:
- summary of what was implemented
- files changed
- assumptions made
- anything needing project-lead review before the next ticket

Success criteria:
- a signed-in parent can create a weekly plan inside the app
- resulting plans connect cleanly to the existing planner and child flows
- the experience feels calm, practical, and V1-appropriate
- the system is materially closer to later AI-assisted planning
- public-repo safety is preserved

Reference docs:
- `/home/xander/projects/xane-educore/documents/builder-ticket-020-parent-side-plan-creation-and-generation-flow.md`
- `/home/xander/projects/xane-educore/documents/product-brief.md`
- `/home/xander/projects/xane-educore/documents/v1-implementation-roadmap.md`
