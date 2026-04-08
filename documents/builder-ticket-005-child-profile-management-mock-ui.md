# Builder Ticket 005 - Child Profile Management Mock UI

## Owner
XANE EduCore, project lead

## Implementation agent
XANE EduCore Builder

## Target repository
`/home/xander/projects/xane-educore`

## Working application path
`/home/xander/projects/xane-educore/website`

## Goal
Design and implement the mocked parent-facing child profile management experience for EduCore.

This ticket should expand the current child management area into a meaningful family-first setup and profile-management surface using mock data only. The result should help validate how parents create, view, and manage child profiles while preserving EduCore's privacy-first and calm-control principles.

## Why this ticket exists
Child setup is one of the most important structural flows in EduCore.

It affects:
- privacy model
- parent control
- child login design
- reward configuration
- planner generation
- future data architecture

Before implementing real auth flows and persistence, we need to validate what the parent-facing child profile experience should actually feel like.

## Scope

### In scope
- improve `/parent/children`
- create a stronger mock child management experience using static/mock data
- show existing child profiles clearly
- include mock profile details relevant to EduCore
- include placeholder affordances for adding a child, editing a child, and managing child login basics
- reflect privacy-first child identity design
- reflect reward and learning-profile relevance where appropriate
- preserve a calm, trustworthy, subtly AI-forward parent experience
- keep everything mock-data only

### Out of scope
- backend integration
- database work
- real forms or save behavior
- auth implementation
- PIN generation logic
- planner generation logic
- AI generation logic
- final production polish

## Primary target route
- `/parent/children`

Supportive consistency may also be added to:
- `/parent/dashboard`
- `/parent/rewards`
- `/parent/planner`

But the main focus must remain the child management experience.

## Product constraints

This work must respect EduCore's product direction:
- child profiles should use nickname-first identity assumptions
- the interface should reinforce parent control clearly
- the flow should feel simple and safe, not bureaucratic
- it should avoid over-collecting information
- it should preserve privacy-first design choices
- it should feel modern and gently AI-forward without becoming flashy
- it should remain family-oriented, not institution-oriented

## Design guidance

### Emotional target
The child management area should feel:
- calm
- trustworthy
- clear
- lightweight
- protective
- practical
- future-ready without feeling technical

### Visual target
Aim for:
- readable profile cards or profile panels
- obvious structure for child identity, login setup, rewards, and learning info
- clean actions for future add/edit flows
- low clutter
- subtle polish and futuristic cues

## Required UI elements

### Child profile list / overview
Include:
- visible child profile cards or sections
- nickname / child identity display
- age or age-range display if useful
- quick status summary
- simple login-status cues (for example username/PIN prepared)

### Privacy-first profile framing
Include signs that EduCore is intentionally lightweight about child data.
Examples:
- nickname-based identity
- limited info collection
- parent-managed access

### Parent actions
Include placeholder actions or affordances for:
- add child
- edit child
- adjust child login
- review reward setup
- review learning profile or subject focus

These should remain non-functional placeholders for now.

### Learning and reward relevance
Show enough profile information to suggest how each child profile connects to:
- rewards
- subject focus
- pacing or learning style
- future plan generation

## Mock content guidance

Use believable child profile data for a homeschool family.

Examples:
- nickname only
- age or age band
- username prepared
- PIN managed by parent
- current reward target
- subject strengths / gentle attention areas
- short pacing note

Avoid making this feel like a school SIS or administrative enrollment form.

## Expected output

Builder should deliver:
- improved `/parent/children`
- mock child profile management UI
- privacy-first framing elements
- placeholder action affordances
- clear connection between child profiles, learning, and rewards
- a short summary of design choices and assumptions

## Review criteria

The work will be considered successful if:
- child management feels substantially more like a real product surface
- a parent can quickly understand each child profile
- privacy-first design is visible in the interface direction
- the flow feels lightweight and family-first
- it clearly supports later auth, planning, and reward features
- implementation stays mock-data only and avoids scope creep

## Notes for Builder

This ticket is not asking for a real form workflow yet.
It is asking for a strong product-shape prototype for how parents manage children inside EduCore.

Favor:
- simplicity over form heaviness
- privacy over data appetite
- parent confidence over administrative detail
- family warmth over dashboard sterility

## Suggested next ticket after completion
Likely next directions:
- reward configuration mock flow
- child login flow mock UI
- or first persistence/data-model ticket
depending on review results.
