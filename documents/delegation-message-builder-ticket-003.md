# Delegation Message - Builder Ticket 003

Use the following message when delegating to XANE EduCore Builder.

---

You are XANE EduCore Builder.

Target repository:
`/home/xander/projects/xane-educore`

Working application path:
`/home/xander/projects/xane-educore/website`

Task goal:
Design and implement the mocked parent-facing dashboard experience for EduCore.

This task should turn the current parent shell into a meaningful V1-style control surface using mock data only. The result should help validate whether the parent side feels practical, calm, trustworthy, and aligned with the family-first mission.

In scope:
- improve `/parent/dashboard`
- improve parent-facing mock dashboard sections using static/mock data
- add child overview cards
- add weekly progress summary
- add subject progress visibility
- add reward status visibility
- add a simple planner preview
- create a calm, modern, AI-forward parent control surface
- keep everything mock-data only

Out of scope:
- backend integration
- database work
- auth/session changes
- real planner logic
- editing or mutation flows
- AI generation logic
- advanced analytics
- settings systems
- final production polish

Primary target route:
- `/parent/dashboard`

Supportive consistency may also be added to:
- `/parent/children`
- `/parent/planner`
- `/parent/rewards`

Relevant constraints:
- parent experience must feel calm, practical, and trustworthy
- it should not feel like a generic corporate analytics dashboard
- it should support clear control without overwhelming detail
- it should remain family-first, not institution-first
- it should feel modern and subtly AI-forward
- it should preserve privacy-first assumptions
- it should stay lightweight and understandable at a glance

Emotional target:
- calm
- competent
- clear
- supportive
- modern
- trustworthy
- future-facing without being flashy

Required UI elements:
- welcome/header area
- at-a-glance family summary
- today or this week progress snapshot
- child overview cards
- weekly planner preview
- reward visibility
- readable Reading / Math / Thinking progress summary

Mock content guidance:
Use believable family homeschool data.
Examples:
- one or two child profiles
- weekly completion summaries
- reward progress
- subject status like on track, needs attention, completed today

Avoid enterprise-style metrics overload.

Expected output:
- improved `/parent/dashboard`
- mock-data-driven dashboard sections
- child overview cards
- planner preview area
- reward and subject progress summaries

Please return:
- summary of what was created
- files changed
- assumptions made
- anything needing project-lead review before the next ticket

Success criteria:
- parent dashboard feels substantially more like a real product
- parent can quickly understand child status and weekly progress
- reward and subject progress are visible without clutter
- visual direction feels calm, trustworthy, and subtly futuristic
- UI supports a family-first workflow rather than a generic admin workflow
- implementation stays within mock-data scope

Reference docs:
- `/home/xander/projects/xane-educore/documents/product-brief.md`
- `/home/xander/projects/xane-educore/documents/v1-implementation-roadmap.md`
- `/home/xander/projects/xane-educore/documents/builder-ticket-003-parent-dashboard-mock-ui.md`
