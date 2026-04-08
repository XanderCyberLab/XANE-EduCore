# Builder Ticket 007 - Reward Configuration Mock UI

## Owner
XANE EduCore, project lead

## Implementation agent
XANE EduCore Builder

## Target repository
`/home/xander/projects/xane-educore`

## Working application path
`/home/xander/projects/xane-educore/website`

## Goal
Design and implement the mocked parent-facing reward configuration experience for EduCore.

This ticket should expand the current rewards area into a meaningful family-first reward management surface using mock data only. The result should help validate how parents define rewards, view progress, and shape motivation in a way that feels calm, real-world, and supportive instead of noisy or over-gamified.

## Why this ticket exists
The reward system is part of EduCore's core V1 loop.

It connects:
- child task completion
- token progress
- parent motivation choices
- real-life rewards
- family rhythm and reinforcement

Before implementing real persistence or token logic, we need to validate what the reward-management experience should feel like for a parent.

## Scope

### In scope
- improve `/parent/rewards`
- create a stronger reward management mock experience using static/mock data
- show existing reward targets for children
- show reward progress clearly
- include placeholder affordances for adjusting reward goals and reward text
- reflect real-life reward philosophy rather than digital-only gamification
- keep the interface calm, family-first, and subtly AI-forward
- keep everything mock-data only

### Out of scope
- backend integration
- database work
- real token persistence
- redemption logic
- auth/session changes
- real settings save behavior
- animation-heavy reward systems
- child reward UI redesign
- final production polish

## Primary target route
- `/parent/rewards`

Supportive consistency may also be added to:
- `/parent/dashboard`
- `/parent/children`
- `/child/rewards`

But the primary focus must remain the parent reward-management experience.

## Product constraints

This work must respect EduCore's product direction:
- rewards should support parent-guided real-world motivation
- the system should not feel like shallow gamification
- the parent should remain in control of what rewards mean
- reward setup should feel practical and light, not admin-heavy
- the surface should feel warm, readable, and trustworthy
- subtle futuristic polish is welcome, but not noisy visual effects

## Design guidance

### Emotional target
The reward area should feel:
- encouraging
- practical
- calm
- clear
- family-centered
- motivating without manipulation

### Visual target
Aim for:
- visible reward progress
- easy-to-understand reward setup cues
- a gentle motivational tone
- real-world reward framing
- clean, modern, lightly futuristic styling

## Required UI elements

### Reward overview
Include:
- current reward targets by child
- progress toward each reward
- token-goal visibility
- lightweight summary of how rewards are functioning

### Parent control cues
Include placeholder actions or affordances for:
- edit reward text
- adjust token goal
- review child reward status
- possibly add or swap a reward

These should remain non-functional placeholders.

### Philosophy cues
The interface should communicate that:
- rewards are parent-defined
- rewards connect to real life
- rewards are part of a calm learning rhythm, not a casino-style loop

### Cross-child readability
If multiple children are shown, it should remain easy to understand each reward setup separately.

## Mock content guidance

Use believable family reward examples.

Examples:
- choose the movie night pick
- story basket choice
- zoo afternoon
- Lego helper set
- baking helper time

Avoid rewards that make the system feel hyper-commercial or manipulative.

## Expected output

Builder should deliver:
- improved `/parent/rewards`
- clearer reward management mock UI
- child-by-child reward overview and progress
- placeholder parent actions for reward adjustments
- a short summary of design choices and assumptions

## Review criteria

The work will be considered successful if:
- the reward area feels substantially more like a real product surface
- parents can quickly understand reward setup and progress
- the interface reinforces real-world, parent-controlled motivation
- the visual direction feels calm and supportive rather than over-gamified
- implementation stays mock-data only and avoids scope creep

## Notes for Builder

This ticket is not asking for working reward logic.
It is asking for a strong product-shape prototype for how parents manage motivation and reward configuration inside EduCore.

Favor:
- warmth over gimmicks
- clarity over visual noise
- real-life reward framing over digital reward excess
- parent control over system cleverness

## Suggested next ticket after completion
Likely next directions:
- child reward screen refinement
- parent reward redemption flow
- or first real persistence/data-model ticket
depending on review results.
