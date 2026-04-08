# Builder Ticket 004 - Parent Planner Detail Mock UI

## Owner
XANE EduCore, project lead

## Implementation agent
XANE EduCore Builder

## Target repository
`/home/xander/projects/xane-educore`

## Working application path
`/home/xander/projects/xane-educore/website`

## Goal
Design and implement a stronger mocked parent planner detail experience for EduCore.

This ticket should expand the current planner area into a more meaningful family-first planning surface using mock data only. The result should help validate how EduCore presents weekly learning plans, daily structure, printable visibility, and parent control cues without becoming a heavy scheduling tool.

## Why this ticket exists
The planner is one of EduCore's core differentiators.

It is where parent guidance, AI-assisted planning, and real homeschool rhythm come together. Before implementing real planner logic, weekly generation, or persistence, we need to validate the shape of the planning experience itself.

The planner should help a parent understand:
- what the week looks like
- what each child is doing each day
- where printable or offline tasks fit
- where gentle intervention or regeneration controls may live later
- how planning can feel supportive rather than burdensome

## Scope

### In scope
- improve `/parent/planner`
- expand the mock planner into a fuller weekly planning surface
- create a day-by-day week view
- show child assignments or learning blocks by day
- add simple planner summary cues
- add placeholder controls for regenerate / refresh / adjust plan
- add printable activity visibility where appropriate
- preserve a calm, trustworthy, subtly AI-forward parent experience
- keep everything mock-data only

### Out of scope
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

## Primary target route
- `/parent/planner`

Supportive consistency may also be added to:
- `/parent/dashboard`
- `/parent/children`
- `/parent/rewards`

But the primary focus must remain the planner experience.

## Product constraints

This work must respect EduCore's product direction:
- planner should feel calm and readable
- it should not feel like a complex school admin scheduler
- it should support family rhythm, not institutional timetable logic
- it should feel parent-controlled and trustworthy
- it should suggest AI assistance without making the parent feel replaced
- it should preserve a subtle futuristic / AI-forward identity
- it should support printable and offline learning as first-class parts of the experience

## Design guidance

### Emotional target
The planner should feel:
- steady
- reassuring
- practical
- light enough to use regularly
- modern and future-facing
- clearly helpful, not overwhelming

### Visual target
Aim for:
- clear weekly structure
- calm cards or grouped day sections
- enough information to guide action without flooding the screen
- subtle polish and futuristic cues
- readable summaries and obvious next steps

## Required UI elements

### Planner header / summary
Include:
- week overview header
- short summary of how the week is going or what the current plan emphasizes
- placeholder AI-guided planning note if useful

### Weekly plan structure
Include a day-by-day or grouped weekly plan that shows:
- daily learning blocks or tasks
- which child each item belongs to if relevant
- subject cues
- simple daily rhythm

### Parent control cues
Include placeholder controls or UI affordances for future actions like:
- regenerate week
- refresh a day
- adjust pacing
- review printable items

These should remain non-functional placeholders for now.

### Printable visibility
Include clear signs when a planned task has printable or offline support.

### Parent guidance layer
Include small guidance notes that help the parent understand the intent of the plan, such as:
- light day
- review day
- reward push day
- keep session short

## Mock content guidance

Use believable homeschool planning content for young children.

Examples:
- short reading block
- counting tray activity
- pattern puzzle
- phonics cards printable
- outdoor observation walk
- reward checkpoint

Avoid making the planner feel like a rigid school timetable.

## Expected output

Builder should deliver:
- improved `/parent/planner`
- a fuller week-planning mock UI
- day-by-day plan presentation
- printable visibility cues
- placeholder control affordances
- a short summary of design choices and assumptions

## Review criteria

The work will be considered successful if:
- the planner feels substantially more like a real product surface
- a parent can quickly understand the weekly learning shape
- printable and offline tasks are visible clearly
- future AI planning and control ideas are suggested without overreaching
- visual direction remains calm, trustworthy, and family-first
- implementation stays mock-data only and avoids scope creep

## Notes for Builder

This ticket is not asking for a real scheduling engine.
It is asking for a strong planning-surface prototype that helps define how EduCore should feel when a parent looks at the week.

Favor:
- clarity over density
- support over control overload
- family rhythm over school bureaucracy
- readable planning over calendar complexity

## Suggested next ticket after completion
Likely next directions:
- reward configuration mock flow
- child management / profile flow
- or first real persistence/data-model ticket
depending on review results.
