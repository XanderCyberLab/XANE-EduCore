# Builder Ticket 019 - Parent Reward Redemption and Reset Flow

## Owner
XANE EduCore, project lead

## Implementation agent
XANE EduCore Builder

## Target repository
`/home/xander/projects/xane-educore`

## Working application path
`/home/xander/projects/xane-educore/website`

## Goal
Implement a parent-managed reward redemption/reset flow for EduCore.

This ticket should close the loop on the cumulative reward system by giving parents a practical way to acknowledge a completed reward cycle and reset or renew progress in a controlled, family-first way.

## Why this ticket exists
EduCore now has:
- persisted task completion
- cumulative token accumulation
- parent reward visibility
- parent-managed child setup and credential control

The next missing piece is allowing the parent to act when a reward has been earned.

## Scope

### In scope
- implement a parent-controlled reward redemption or reset action in-product
- support resetting/restarting reward progress in a way that fits the current cumulative model
- keep the interaction practical and understandable
- align the behavior with the current reward-plan model and active reward-cycle assumptions
- preserve calm, family-first parent UX

### Out of scope
- advanced reward history reporting
- child-facing celebration redesign
- complex reward scheduling systems
- full badge/achievement systems
- major redesign of reward UI beyond what is needed to support the flow

## Product constraints

This work must respect EduCore's product direction:
- parent remains the authority over what a reward means and when it is redeemed
- the flow should feel calm and practical, not game-like or transactional
- reward reset should support real-life family rhythm
- avoid noisy or manipulative reward behavior
- implementation should remain V1-scoped and understandable

## Technical expectations

Builder should:
- build on the existing cumulative reward/token model
- use server-side handling for redemption/reset behavior
- preserve data integrity for the active reward cycle model
- keep implementation maintainable and readable
- preserve public-repo safety

## Expected output

Builder should deliver:
- parent-facing redemption/reset capability
- sensible persisted behavior when a reward cycle is reset or renewed
- updates to the parent reward surface as needed
- a short explanation of what was implemented and any assumptions made

## Review criteria

The work will be considered successful if:
- a signed-in parent can meaningfully close/reset a reward cycle in-product
- reward behavior remains cumulative and parent-controlled
- implementation fits EduCore's calm family-first direction
- the system feels more complete around motivation and follow-through
- public-repo safety is preserved

## Notes for Builder

This is about completing the V1 reward loop, not inventing a large reward-management subsystem.

Favor:
- simple redemption/reset behavior
- calm parent control
- maintainable persistence logic
- minimalism over reward-system sprawl
