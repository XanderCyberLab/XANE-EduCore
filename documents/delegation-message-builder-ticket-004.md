# Delegation Message - Builder Ticket 004

Use the following message when delegating to XANE EduCore Builder.

---

You are XANE EduCore Builder.

Target repository:
`/home/xander/projects/xane-educore`

Working application path:
`/home/xander/projects/xane-educore/website`

Task goal:
Design and implement a stronger mocked parent planner detail experience for EduCore.

This task should expand the current planner area into a more meaningful family-first planning surface using mock data only. The result should help validate how EduCore presents weekly learning plans, daily structure, printable visibility, and parent control cues without becoming a heavy scheduling tool.

In scope:
- improve `/parent/planner`
- expand the mock planner into a fuller weekly planning surface
- create a day-by-day week view
- show child assignments or learning blocks by day
- add simple planner summary cues
- add placeholder controls for regenerate / refresh / adjust plan
- add printable activity visibility where appropriate
- preserve a calm, trustworthy, subtly AI-forward parent experience
- keep everything mock-data only

Out of scope:
- backend integration
- database work
- real planner edits or save behavior
- AI generation logic
- regeneration implementation
- printable generation implementation
- auth or session changes
- heavy calendar complexity
- drag-and-drop scheduling
- final production polish

Primary target route:
- `/parent/planner`

Relevant constraints:
- planner should feel calm and readable
- it should not feel like a complex school admin scheduler
- it should support family rhythm, not institutional timetable logic
- it should feel parent-controlled and trustworthy
- it should suggest AI assistance without making the parent feel replaced
- it should preserve a subtle futuristic / AI-forward identity
- it should support printable and offline learning as first-class parts of the experience

Emotional target:
- steady
- reassuring
- practical
- light enough to use regularly
- modern and future-facing
- clearly helpful, not overwhelming

Required UI elements:
- week overview header
- short weekly summary
- optional AI-guided planning note
- day-by-day plan structure
- child assignment visibility
- subject cues
- placeholder controls for regenerate / refresh / adjust pacing
- printable visibility
- guidance notes like light day, review day, reward push day, or keep session short

Mock content guidance:
Use believable homeschool planning content for young children.
Examples:
- short reading block
- counting tray activity
- pattern puzzle
- phonics cards printable
- outdoor observation walk
- reward checkpoint

Avoid rigid school timetable energy.

Expected output:
- improved `/parent/planner`
- fuller week-planning mock UI
- day-by-day plan presentation
- printable visibility cues
- placeholder control affordances

Please return:
- summary of what was created
- files changed
- assumptions made
- anything needing project-lead review before the next ticket

Success criteria:
- planner feels substantially more like a real product surface
- a parent can quickly understand the weekly learning shape
- printable and offline tasks are visible clearly
- future AI planning and control ideas are suggested without overreaching
- visual direction remains calm, trustworthy, and family-first
- implementation stays within mock-data scope

Reference docs:
- `/home/xander/projects/xane-educore/documents/product-brief.md`
- `/home/xander/projects/xane-educore/documents/v1-implementation-roadmap.md`
- `/home/xander/projects/xane-educore/documents/builder-ticket-004-parent-planner-detail-mock-ui.md`
