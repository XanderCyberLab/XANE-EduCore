# Builder Ticket 002 - Child Home and Today Flow (Mock UI)

## Owner
XANE EduCore, project lead

## Implementation agent
XANE EduCore Builder

## Target repository
`/home/xander/projects/xane-educore`

## Working application path
`/home/xander/projects/xane-educore/website`

## Goal
Design and implement the mocked child-facing home and today flow for EduCore.

This ticket should turn the existing child shell into a meaningful V1-style experience with mock data only. The output should help validate whether EduCore feels calm, clear, child-friendly, and subtly AI-forward.

## Why this ticket exists
The child experience is the heart of EduCore.

Before implementing backend systems, auth, or AI logic, we need to validate the shape of the daily child loop:
- child logs in
- child sees today's learning clearly
- child can understand the 3-task structure
- child sees subject areas
- child sees token/reward progress
- overall experience feels warm, calm, and future-facing without overstimulation

## Scope

### In scope
- improve `/child/home`
- improve `/child/today`
- create mocked child dashboard content using static/mock data
- add a visible token jar or reward-progress placeholder
- add today's 3-task presentation
- add subject lane or subject-card presentation for Reading, Math, and Thinking
- improve visual hierarchy for young children
- introduce subtle AI-forward / futuristic design cues in a calm way
- keep everything responsive with tablet-first quality

### Out of scope
- backend integration
- database work
- authentication changes
- task completion persistence
- real reward logic
- real AI generation
- drag and drop
- animations beyond very minimal tasteful effects if any
- voice features

## Target routes
- `/child/home`
- `/child/today`

Supportive consistency may also be added to:
- `/child/rewards`
- `/child/subject/reading`
- `/child/subject/math`
- `/child/subject/thinking`

But the primary focus must remain home and today.

## Product constraints

This work must respect EduCore's product direction:
- child experience must be calm, not noisy
- low reading burden
- large touch-friendly elements
- tablet-friendly first
- visually warm and welcoming
- subtly futuristic / AI-native feel is encouraged
- no overstimulating sci-fi energy
- no arcade-like gamification
- preserve parent-controlled product direction

## Design guidance

### Emotional target
The child interface should feel like:
- safe
- exciting in a gentle way
- clear
- encouraging
- modern and a little futuristic
- built for children, not adults pretending to design for children

### Visual target
Aim for a blend of:
- soft rounded surfaces
- clear cards and sections
- strong but friendly subject colors
- subtle depth, glow, or futuristic UI hints
- clean spacing
- low clutter

The child area should feel like a calm future learning space.

### Interaction target
The child should quickly understand:
- what to do now
- what today's 3 tasks are
- how progress/rewards are going
- where reading, math, and thinking live

## Required UI elements

### On `/child/home`
Include:
- welcoming hero/header area
- today's focus summary
- token jar or progress-reward visual
- Reading / Math / Thinking subject entry points
- clear primary path toward today's tasks

### On `/child/today`
Include:
- 3 mocked daily tasks
- each task should be easy to scan visually
- simple difficulty or task-type cues if helpful
- gentle progress framing
- calm visual flow from first task to third task

## Mock content guidance

Use believable mock content for a 4-year-old to 6-year-old audience.

Examples of task styles:
- letter matching
- count the objects
- find the pattern
- sound-it-out reading task
- simple critical thinking mini challenge

Avoid content that feels like generic school worksheets pasted into cards.

## Expected output

Builder should deliver:
- improved `/child/home`
- improved `/child/today`
- mock data-driven child UI sections
- token jar/reward placeholder UI
- subject presentation that fits EduCore's visual direction
- a short summary of design choices and assumptions

## Review criteria

The work will be considered successful if:
- the child home feels substantially more like a real product
- today's 3-task structure is obvious
- subject areas are easy to understand
- token/reward progress is visible and motivating without being noisy
- visual direction feels calm and subtly futuristic
- UI remains usable for young children on tablet-sized screens
- implementation stays mock-data only and does not overreach scope

## Notes for Builder

This ticket is not asking for final polish.
It is asking for a strong product-shape prototype of the child daily experience.

Please favor clarity and emotional fit over cleverness.
If choosing between flashy and calm, choose calm.
If choosing between dense and obvious, choose obvious.

## Suggested next ticket after completion
Likely next directions:
- parent dashboard mock experience
- or task-completion interaction prototype
depending on what review shows after this child flow is in place.
