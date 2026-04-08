# Delegation Message - Builder Ticket 005

Use the following message when delegating to XANE EduCore Builder.

---

You are XANE EduCore Builder.

Target repository:
`/home/xander/projects/xane-educore`

Working application path:
`/home/xander/projects/xane-educore/website`

Task goal:
Design and implement the mocked parent-facing child profile management experience for EduCore.

This task should expand the current child management area into a meaningful family-first setup and profile-management surface using mock data only. The result should help validate how parents create, view, and manage child profiles while preserving EduCore's privacy-first and calm-control principles.

In scope:
- improve `/parent/children`
- create a stronger mock child management experience using static/mock data
- show existing child profiles clearly
- include mock profile details relevant to EduCore
- include placeholder affordances for adding a child, editing a child, and managing child login basics
- reflect privacy-first child identity design
- reflect reward and learning-profile relevance where appropriate
- preserve a calm, trustworthy, subtly AI-forward parent experience
- keep everything mock-data only

Out of scope:
- backend integration
- database work
- real forms or save behavior
- auth implementation
- PIN generation logic
- planner generation logic
- AI generation logic
- final production polish

Primary target route:
- `/parent/children`

Relevant constraints:
- child profiles should use nickname-first identity assumptions
- the interface should reinforce parent control clearly
- the flow should feel simple and safe, not bureaucratic
- it should avoid over-collecting information
- it should preserve privacy-first design choices
- it should feel modern and gently AI-forward without becoming flashy
- it should remain family-oriented, not institution-oriented

Emotional target:
- calm
- trustworthy
- clear
- lightweight
- protective
- practical
- future-ready without feeling technical

Required UI elements:
- visible child profile cards or sections
- nickname / child identity display
- age or age-range display if useful
- quick status summary
- simple login-status cues
- privacy-first framing
- placeholder actions for add child, edit child, adjust child login, review reward setup, and review learning profile / subject focus

Mock content guidance:
Use believable homeschool-family child profile data.
Examples:
- nickname only
- age or age band
- username prepared
- PIN managed by parent
- current reward target
- subject strengths and gentle attention areas
- short pacing note

Avoid school enrollment system energy.

Expected output:
- improved `/parent/children`
- mock child profile management UI
- privacy-first framing elements
- placeholder action affordances
- clear connection between child profiles, learning, and rewards

Please return:
- summary of what was created
- files changed
- assumptions made
- anything needing project-lead review before the next ticket

Success criteria:
- child management feels substantially more like a real product surface
- parent can quickly understand each child profile
- privacy-first design is visible in the interface direction
- flow feels lightweight and family-first
- it clearly supports later auth, planning, and reward features
- implementation stays within mock-data scope

Reference docs:
- `/home/xander/projects/xane-educore/documents/product-brief.md`
- `/home/xander/projects/xane-educore/documents/v1-implementation-roadmap.md`
- `/home/xander/projects/xane-educore/documents/builder-ticket-005-child-profile-management-mock-ui.md`
