# Builder Ticket 003 - Parent Dashboard Mock UI

## Owner
XANE EduCore, project lead

## Implementation agent
XANE EduCore Builder

## Target repository
`/home/xander/projects/xane-educore`

## Working application path
`/home/xander/projects/xane-educore/website`

## Goal
Design and implement the mocked parent-facing dashboard experience for EduCore.

This ticket should turn the current parent shell into a meaningful V1-style control surface using mock data only. The result should help validate whether the parent side feels practical, calm, trustworthy, and aligned with the family-first mission.

## Why this ticket exists
The parent side is where trust, control, and planning live.

Before implementing backend logic, auth, or real planning, we need to validate whether the parent dashboard gives a parent a clear sense of:
- how each child is doing
- what is planned for the week
- how rewards are progressing
- what needs attention today
- how EduCore supports family learning without becoming a cluttered admin tool

## Scope

### In scope
- improve `/parent/dashboard`
- improve parent-facing mock dashboard sections using static/mock data
- add child overview cards
- add weekly progress summary
- add subject progress visibility
- add reward status visibility
- add a simple planner preview
- create a calm, modern, AI-forward parent control surface
- keep everything mock-data only

### Out of scope
- backend integration
- database work
- auth/session changes
- real planner logic
- editing or mutation flows
- AI generation logic
- advanced analytics
- settings systems
- final production polish

## Primary target route
- `/parent/dashboard`

Supportive consistency may also be added to:
- `/parent/children`
- `/parent/planner`
- `/parent/rewards`

But the primary focus must remain the dashboard.

## Product constraints

This work must respect EduCore's product direction:
- parent experience must feel calm, practical, and trustworthy
- it should not feel like a generic corporate analytics dashboard
- it should support clear control without overwhelming detail
- it should remain family-first, not institution-first
- it should feel modern and subtly AI-forward
- it should preserve privacy-first assumptions
- it should stay lightweight and understandable at a glance

## Design guidance

### Emotional target
The parent dashboard should feel:
- calm
- competent
- clear
- supportive
- modern
- trustworthy
- future-facing without being flashy

### Visual target
Aim for:
- clean layout and clear hierarchy
- soft dark-mode or dark-surface design if it stays readable
- restrained futuristic cues like subtle glow, depth, or polished panel styling
- clear summaries over dense tables
- enough warmth to feel family-oriented, not enterprise

## Required UI elements

### Dashboard overview
Include:
- welcome/header area
- at-a-glance family summary
- today's or this week's progress snapshot

### Child overview cards
Each child card should help the parent quickly see:
- child name or nickname
- progress status
- token/reward status
- subject progress snapshot
- next step or focus

### Weekly planner preview
Include a simple preview of the week's plan, enough to show product direction without implementing real planner features.

### Reward visibility
Include a clear but lightweight view of how reward progress is going.

### Subject progress
Include a readable summary of Reading, Math, and Thinking progress.

## Mock content guidance

Use believable mock parent-facing data that reflects a real homeschool family rhythm.

Examples:
- one or two child profiles
- simple weekly completion summaries
- reward jar progress
- subject status like on track / needs attention / completed today

Avoid enterprise-style metrics overload.

## Expected output

Builder should deliver:
- improved `/parent/dashboard`
- mock-data-driven dashboard sections
- child overview cards
- planner preview area
- reward and subject progress summaries
- a short summary of design choices and assumptions

## Review criteria

The work will be considered successful if:
- the parent dashboard feels substantially more like a real product
- the parent can quickly understand child status and weekly progress
- reward and subject progress are visible without clutter
- the visual direction feels calm, trustworthy, and subtly futuristic
- the UI supports a family-first workflow rather than a generic admin workflow
- implementation stays mock-data only and avoids scope creep

## Notes for Builder

This ticket is not asking for final data architecture or form behavior.
It is asking for a product-shape prototype of the parent control experience.

Favor:
- clarity over density
- trust over cleverness
- warmth over sterile dashboard energy
- practical summaries over excessive metrics

## Suggested next ticket after completion
Likely next directions:
- parent children management mock flow
- planner detail mock flow
- or first persistence/data-model ticket
depending on what review shows after the dashboard is in place.
