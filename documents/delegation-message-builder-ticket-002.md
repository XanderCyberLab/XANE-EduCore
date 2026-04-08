# Delegation Message - Builder Ticket 002

Use the following message when delegating to XANE EduCore Builder.

---

You are XANE EduCore Builder.

Target repository:
`/home/xander/projects/xane-educore`

Working application path:
`/home/xander/projects/xane-educore/website`

Task goal:
Design and implement the mocked child-facing home and today flow for EduCore.

This task should turn the existing child shell into a meaningful V1-style experience using mock data only. The goal is to validate whether EduCore feels calm, clear, child-friendly, and subtly AI-forward.

In scope:
- improve `/child/home`
- improve `/child/today`
- create mocked child dashboard content using static/mock data
- add a visible token jar or reward-progress placeholder
- add today's 3-task presentation
- add subject lane or subject-card presentation for Reading, Math, and Thinking
- improve visual hierarchy for young children
- introduce subtle AI-forward / futuristic design cues in a calm way
- keep everything responsive with tablet-first quality

Out of scope:
- backend integration
- database work
- authentication changes
- task completion persistence
- real reward logic
- real AI generation
- drag and drop
- voice features
- heavy animation

Primary target routes:
- `/child/home`
- `/child/today`

Supportive consistency may also be added to:
- `/child/rewards`
- `/child/subject/reading`
- `/child/subject/math`
- `/child/subject/thinking`

Relevant constraints:
- child experience must be calm, not noisy
- low reading burden
- large touch-friendly elements
- tablet-friendly first
- visually warm and welcoming
- subtly futuristic / AI-native feel is encouraged
- no overstimulating sci-fi energy
- no arcade-like gamification
- preserve parent-controlled product direction

Emotional target:
- safe
- gently exciting
- clear
- encouraging
- modern and a little futuristic

Required UI elements on `/child/home`:
- welcoming hero/header area
- today's focus summary
- token jar or progress-reward visual
- Reading / Math / Thinking subject entry points
- clear primary path toward today's tasks

Required UI elements on `/child/today`:
- 3 mocked daily tasks
- visually scannable task cards
- simple cues for task type or difficulty if helpful
- gentle progress framing
- calm visual flow from first task to third task

Mock content guidance:
Use believable tasks for roughly ages 4 to 6.
Examples:
- letter matching
- count the objects
- find the pattern
- sound-it-out reading task
- simple critical thinking mini challenge

Avoid generic worksheet-in-a-card feeling.

Expected output:
- improved `/child/home`
- improved `/child/today`
- mock-data-driven child UI sections
- token jar / reward placeholder UI
- subject presentation aligned with EduCore direction

Please return:
- summary of what was created
- files changed
- assumptions made
- anything needing project-lead review before the next ticket

Success criteria:
- child home feels substantially more like a real product
- today's 3-task structure is obvious
- subject areas are easy to understand
- token/reward progress is visible and motivating without being noisy
- visual direction feels calm and subtly futuristic
- UI is usable for young children on tablet-sized screens
- implementation stays within mock-data scope

Reference docs:
- `/home/xander/projects/xane-educore/documents/product-brief.md`
- `/home/xander/projects/xane-educore/documents/v1-implementation-roadmap.md`
- `/home/xander/projects/xane-educore/documents/builder-ticket-002-child-home-and-today-flow.md`
