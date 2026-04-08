# Delegation Message - Builder Ticket 006

Use the following message when delegating to XANE EduCore Builder.

---

You are XANE EduCore Builder.

Target repository:
`/home/xander/projects/xane-educore`

Working application path:
`/home/xander/projects/xane-educore/website`

Task goal:
Design and implement the mocked child login flow for EduCore.

This task should turn the current child login route into a meaningful V1-style login experience for young children using mock data only. The result should help validate whether login feels simple, safe, low-friction, parent-approved, and appropriate for daily use by children around ages 4 to 6.

In scope:
- improve `/child/login`
- create a mock child login flow using static/mock data only
- show profile selection or equivalent child entry pattern if helpful
- show username/PIN-style login guidance in a child-friendly way
- create a large-touch, low-text login surface
- preserve calm, welcoming, subtly futuristic EduCore feel
- reflect parent-managed simplicity in the flow

Out of scope:
- backend auth
- real username validation
- real PIN validation
- persistence
- session management
- actual security implementation
- parent login flows
- final production polish

Primary target route:
- `/child/login`

Relevant constraints:
- child login must feel simple and calm
- low reading burden is critical
- large touch targets are required
- child should not face a dense form-like experience
- parent-managed simplicity should be implied clearly
- visual direction can be subtly futuristic / AI-forward
- no overstimulating effects
- no complicated account-selection mechanics unless they clearly help

Emotional target:
- safe
- welcoming
- easy
- clear
- low-pressure
- a little magical or futuristic in a calm way

Required UI elements:
- clear child entry experience
- profile selection or equivalent intuitive entry step
- child-friendly username or identity cues
- PIN entry concept
- clear next-step guidance
- large touch-first layout
- subtle parent-managed framing

Mock content guidance:
Use mock child accounts only.
Examples:
- safe nickname/profile cards
- mock username display or profile badge
- placeholder PIN dots or keypad-like layout
- friendly copy such as “pick your name” or “enter your code” when low-text

Avoid generic login-form energy.

Expected output:
- improved `/child/login`
- mock child profile selection or equivalent entry pattern
- child-friendly PIN/login UI direction
- calm futuristic visual fit with the rest of the child experience

Please return:
- summary of what was created
- files changed
- assumptions made
- anything needing project-lead review before the next ticket

Success criteria:
- login flow feels substantially more like a real child product surface
- a young child could plausibly understand how to begin
- the interface is low-text and touch-friendly
- visual direction stays calm, welcoming, and future-facing
- flow suggests parent-managed simplicity without needing real auth logic yet
- implementation stays within mock-data scope

Reference docs:
- `/home/xander/projects/xane-educore/documents/product-brief.md`
- `/home/xander/projects/xane-educore/documents/v1-implementation-roadmap.md`
- `/home/xander/projects/xane-educore/documents/builder-ticket-006-child-login-flow-mock-ui.md`
