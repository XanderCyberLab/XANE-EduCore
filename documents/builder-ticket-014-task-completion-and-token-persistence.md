# Builder Ticket 014 - Task Completion and Token Persistence

## Owner
XANE EduCore, project lead

## Implementation agent
XANE EduCore Builder

## Target repository
`/home/xander/projects/xane-educore`

## Working application path
`/home/xander/projects/xane-educore/website`

## Goal
Implement task completion persistence and token accumulation for EduCore.

This ticket should make the child daily loop meaningfully interactive by allowing task completion to be stored durably and token progress to update from persisted completion data.

## Why this ticket exists
EduCore now has:
- real persistence foundation
- parent auth
- child auth
- persisted weekly plan loading

The next key step is making child task completion real.

This should establish:
- stored task completion state
- durable token accumulation
- child progress updating from persistence
- parent/child surfaces moving closer to a live product loop

## Scope

### In scope
- implement persistence for task completion against current plan items
- update token accumulation based on persisted completions
- reflect stored completion state in child task/daily views
- keep reward progress aligned with cumulative token behavior
- maintain calm UX behavior when tasks are completed
- keep the solution disciplined and V1-appropriate

### Out of scope
- AI generation
- full reward redemption workflow
- advanced progress analytics
- planner editing
- badge systems
- animations-heavy feedback systems
- multi-attempt/history beyond the current one-completion-record model unless minimally required

## Product constraints

This work must respect EduCore's product direction:
- reward/token behavior should be cumulative across the active reward cycle, not just today's tasks
- completion flow should stay simple and clear for children
- avoid turning the child experience into a noisy gamification loop
- preserve parent-controlled reward meaning
- keep child daily interaction understandable and calm
- maintain privacy-first and family-first assumptions

## Technical expectations

Builder should:
- build on the current Prisma/task completion model
- use persisted `TaskCompletion` records sensibly
- keep token accumulation logic readable and maintainable
- preserve route/session assumptions already established
- avoid introducing unsafe config or public-repo issues

## Expected output

Builder should deliver:
- functioning task completion persistence
- token accumulation updated from persisted completions
- child daily/task UI reflecting stored completion state
- any necessary supporting server actions or data utilities
- a short explanation of what was implemented and any assumptions made

## Review criteria

The work will be considered successful if:
- child task completion now persists meaningfully
- token totals reflect stored cumulative progress
- child daily flow feels more like a real product loop
- implementation remains restrained and understandable
- system is better positioned for later reward configuration and richer progress features
- public-repo safety is preserved

## Notes for Builder

This ticket is about making the core loop real, not about polishing every surrounding feature.

Favor:
- dependable completion handling
- calm child feedback
- cumulative reward logic
- maintainable persistence behavior
- minimalism over feature sprawl
