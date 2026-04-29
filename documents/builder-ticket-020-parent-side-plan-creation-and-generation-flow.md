# Builder Ticket 020 - Parent-Side Plan Creation and Generation Flow

## Owner
XANE EduCore, project lead

## Implementation agent
XANE EduCore Builder

## Target repository
`/home/xander/projects/xane-educore`

## Working application path
`/home/xander/projects/xane-educore/website`

## Goal
Implement a parent-facing flow for creating or generating weekly learning plans in-product.

This ticket should move EduCore beyond bootstrap-only plan creation and toward a real parent-controlled weekly planning capability inside the app.

## Why this ticket exists
EduCore now has:
- real parent auth
- real child auth
- persisted planner data
- task completion and cumulative reward loops
- parent-controlled child setup and editing
- reward redemption/reset flow

The next major capability is allowing the parent to create or generate weekly plans in-product.

This is a key bridge toward later AI-assisted plan generation.

## Scope

### In scope
- implement a parent-facing plan creation or generation flow in-product
- allow a parent to create a weekly plan for a child inside the app
- support creating plan items in a V1-practical way
- keep the experience calm, readable, and parent-controlled
- preserve the current weekly planner direction rather than turning it into a heavy scheduling system

### Out of scope
- advanced AI generation
- full natural-language planning UI
- complicated drag-and-drop scheduling
- large curriculum engine behavior
- institutional-grade scheduler features
- deep printable generation logic beyond current visibility cues

## Product constraints

This work must respect EduCore's product direction:
- planning remains parent-controlled
- the flow should feel supportive, not burdensome
- the planner should stay family-first, not school-admin-like
- the experience should remain calm and practical
- implementation should stay V1-scoped and understandable
- this should prepare for future AI assistance without requiring it yet

## Technical expectations

Builder should:
- build on the current planner/persistence foundations
- use the existing weekly plan models sensibly
- preserve public-repo safety
- keep implementation maintainable and readable
- avoid overengineering the generation layer this early

## Expected output

Builder should deliver:
- in-product parent flow for creating or generating a weekly plan
- persisted weekly plan creation behavior
- practical handling of plan items for a child
- planner UI updated as needed to support the flow
- a short explanation of what was implemented and any assumptions made

## Review criteria

The work will be considered successful if:
- a signed-in parent can create a weekly plan inside the app
- resulting plans connect cleanly to the existing planner and child flows
- the experience feels calm, practical, and V1-appropriate
- the system is materially closer to later AI-assisted planning
- public-repo safety is preserved

## Notes for Builder

This is a real product capability ticket, but it should remain disciplined.

Favor:
- simple parent-controlled plan creation
- calm planning UX
- maintainable persistence logic
- minimalism over overbuilt planning tools
