# Builder Ticket 006 - Child Login Flow Mock UI

## Owner
XANE EduCore, project lead

## Implementation agent
XANE EduCore Builder

## Target repository
`/home/xander/projects/xane-educore`

## Working application path
`/home/xander/projects/xane-educore/website`

## Goal
Design and implement the mocked child login flow for EduCore.

This ticket should turn the current child login route into a meaningful V1-style login experience for young children using mock data only. The result should help validate whether login feels simple, safe, low-friction, parent-approved, and appropriate for daily use by children around ages 4 to 6.

## Why this ticket exists
Child login is one of the highest-risk UX surfaces in EduCore.

If login is confusing, noisy, or too text-heavy, daily use breaks down immediately.

Before implementing real authentication or PIN behavior, we need to validate:
- how a child chooses their profile
- how username and PIN concepts are presented
- how much text is tolerable
- how touch-friendly and calm the login flow feels
- how the experience can feel slightly futuristic and AI-native without becoming overstimulating

## Scope

### In scope
- improve `/child/login`
- create a mock child login flow using static/mock data only
- show profile selection or equivalent child entry pattern if helpful
- show username/PIN-style login guidance in a child-friendly way
- create a large-touch, low-text login surface
- preserve calm, welcoming, subtly futuristic EduCore feel
- reflect parent-managed simplicity in the flow

### Out of scope
- backend auth
- real username validation
- real PIN validation
- persistence
- session management
- actual security implementation
- parent login flows
- final production polish

## Primary target route
- `/child/login`

Supportive consistency may also be added to:
- `/child/home`
- `/parent/children`

But the primary focus must remain the child login experience.

## Product constraints

This work must respect EduCore's product direction:
- child login must feel simple and calm
- low reading burden is critical
- large touch targets are required
- child should not face a dense form-like experience
- parent-managed simplicity should be implied clearly
- visual direction can be subtly futuristic / AI-forward
- no overstimulating effects
- no complicated account-selection mechanics unless they clearly help

## Design guidance

### Emotional target
The child login flow should feel:
- safe
- welcoming
- easy
- clear
- low-pressure
- a little magical or futuristic in a calm way

### Visual target
Aim for:
- large friendly surfaces
- minimal text
- clear primary action path
- simple profile identity cues
- PIN-friendly layout direction
- subtle glow/depth/futuristic polish without noisy motion

## Required UI elements

### Child entry experience
Include a clear way for a child to begin login, such as:
- selecting their profile card
- or a similarly intuitive entry step

### Login guidance
Show child-friendly cues for:
- username or profile identity
- PIN entry concept
- what to do next

This should feel understandable for a young child with parent setup already handled.

### Touch-first layout
Include:
- large buttons
- large profile targets
- easy spacing
- obvious focus path

### Parent-managed framing
Include subtle cues that:
- setup came from a parent
- login stays simple because parent already prepared the account

## Mock content guidance

Use mock child accounts only.

Examples:
- safe nickname/profile cards
- mock username display or profile badge
- placeholder PIN dots or keypad-like layout
- friendly copy such as “pick your name” or “enter your code” if it stays low-text

Avoid making the login feel like a generic web form.

## Expected output

Builder should deliver:
- improved `/child/login`
- mock child profile selection or equivalent entry pattern
- child-friendly PIN/login UI direction
- calm futuristic visual fit with the rest of the child experience
- a short summary of design choices and assumptions

## Review criteria

The work will be considered successful if:
- the login flow feels substantially more like a real child product surface
- a young child could plausibly understand how to begin
- the interface is low-text and touch-friendly
- the visual direction stays calm, welcoming, and future-facing
- the flow suggests parent-managed simplicity without needing real auth logic yet
- implementation stays mock-data only and avoids scope creep

## Notes for Builder

This ticket is not asking for actual authentication.
It is asking for a strong product-shape prototype for how child login should feel inside EduCore.

Favor:
- obviousness over cleverness
- calm over flashy
- confidence over complexity
- child usability over web-app convention

## Suggested next ticket after completion
Likely next directions:
- reward configuration mock flow
- parent reward setup flow
- or first real data/auth groundwork
depending on review results.
