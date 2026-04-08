# Delegation Message - Builder Ticket 007

Use the following message when delegating to XANE EduCore Builder.

---

You are XANE EduCore Builder.

Target repository:
`/home/xander/projects/xane-educore`

Working application path:
`/home/xander/projects/xane-educore/website`

Task goal:
Design and implement the mocked parent-facing reward configuration experience for EduCore.

This task should expand the current rewards area into a meaningful family-first reward management surface using mock data only. The result should help validate how parents define rewards, view progress, and shape motivation in a way that feels calm, real-world, and supportive instead of noisy or over-gamified.

In scope:
- improve `/parent/rewards`
- create a stronger reward management mock experience using static/mock data
- show existing reward targets for children
- show reward progress clearly
- include placeholder affordances for adjusting reward goals and reward text
- reflect real-life reward philosophy rather than digital-only gamification
- keep the interface calm, family-first, and subtly AI-forward
- keep everything mock-data only

Out of scope:
- backend integration
- database work
- real token persistence
- redemption logic
- auth/session changes
- real settings save behavior
- animation-heavy reward systems
- child reward UI redesign
- final production polish

Primary target route:
- `/parent/rewards`

Relevant constraints:
- rewards should support parent-guided real-world motivation
- the system should not feel like shallow gamification
- the parent should remain in control of what rewards mean
- reward setup should feel practical and light, not admin-heavy
- the surface should feel warm, readable, and trustworthy
- subtle futuristic polish is welcome, but not noisy visual effects

Emotional target:
- encouraging
- practical
- calm
- clear
- family-centered
- motivating without manipulation

Required UI elements:
- current reward targets by child
- progress toward each reward
- token-goal visibility
- lightweight summary of how rewards are functioning
- placeholder actions for edit reward text, adjust token goal, review child reward status, and add/swap reward
- cues that rewards are parent-defined and real-life based

Mock content guidance:
Use believable family reward examples.
Examples:
- choose the movie night pick
- story basket choice
- zoo afternoon
- Lego helper set
- baking helper time

Avoid hyper-commercial reward tone.

Expected output:
- improved `/parent/rewards`
- clearer reward management mock UI
- child-by-child reward overview and progress
- placeholder parent actions for reward adjustments

Please return:
- summary of what was created
- files changed
- assumptions made
- anything needing project-lead review before the next ticket

Success criteria:
- reward area feels substantially more like a real product surface
- parents can quickly understand reward setup and progress
- interface reinforces real-world, parent-controlled motivation
- visual direction feels calm and supportive rather than over-gamified
- implementation stays within mock-data scope

Reference docs:
- `/home/xander/projects/xane-educore/documents/product-brief.md`
- `/home/xander/projects/xane-educore/documents/v1-implementation-roadmap.md`
- `/home/xander/projects/xane-educore/documents/builder-ticket-007-reward-configuration-mock-ui.md`
