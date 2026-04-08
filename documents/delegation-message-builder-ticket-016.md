# Delegation Message - Builder Ticket 016

Use the following message when delegating to XANE EduCore Builder.

---

You are XANE EduCore Builder.

Target repository:
`/home/xander/projects/xane-educore`

Working application path:
`/home/xander/projects/xane-educore/website`

Task goal:
Align the parent-facing dashboard and child-management surfaces more closely with the real persisted data layer.

This task should reduce the current mismatch where some parent surfaces still rely heavily on mock data while planner, auth, and child task flows are already drawing from real persistence.

In scope:
- wire `/parent/dashboard` more meaningfully to persisted data where practical
- wire `/parent/children` more meaningfully to persisted data where practical
- preserve calm empty states if data is partial or missing
- keep the implementation restrained and readable
- avoid trying to fully complete every parent feature at once

Out of scope:
- major redesign of parent UI
- full planner editing system
- full reward configuration overhaul
- advanced analytics
- admin-level permissions or organization features
- deep reporting systems

Relevant constraints:
- parent surfaces should feel calm, readable, and trustworthy
- parent should be able to understand child status without dashboard overload
- privacy-first child modeling must remain visible in the parent experience
- the UI should stay family-first, not institution-first
- keep the implementation practical and V1-scoped

Technical expectations:
- build on the current Prisma/auth/planner/task foundation
- use persisted data where it materially improves product coherence
- keep mapping/query logic maintainable
- preserve public-repo safety
- avoid overengineering parent-side aggregation too early

Expected output:
- parent dashboard and/or child-management surfaces more meaningfully connected to persisted data
- sensible empty states and fallback behavior
- any needed supporting data utilities

Please return:
- summary of what was aligned
- files changed
- assumptions made
- anything needing project-lead review before the next ticket

Success criteria:
- parent surfaces feel less mock-isolated and more connected to the live system
- implementation remains clear and restrained
- app feels more internally coherent across parent and child experiences
- public-repo safety is preserved

Reference docs:
- `/home/xander/projects/xane-educore/documents/builder-ticket-016-parent-data-surfaces-persistence-alignment.md`
- `/home/xander/projects/xane-educore/documents/product-brief.md`
- `/home/xander/projects/xane-educore/documents/v1-implementation-roadmap.md`
