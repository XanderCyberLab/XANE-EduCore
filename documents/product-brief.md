# X.A.N.E EduCore - Product Brief

## Product summary

X.A.N.E EduCore is a family-first, privacy-first, AI-assisted homeschool platform designed to help parents guide calm, joyful, practical daily learning for young children.

EduCore is being built first for Xander's family, with the initial product centered on real daily use by a 4-year-old and 6-year-old. It is intended to grow into a broader family platform over time, but V1 should optimize for usefulness, simplicity, and trust rather than speculative scale.

## Product vision

EduCore should feel like a living homeschool companion, not a generic learning management system.

It should support both the parent and the child as part of one shared learning system:
- the parent stays in control
- the child experiences a calm, game-like daily learning flow
- AI assists with planning and activity generation without replacing the parent

## Primary goal for V1

Build a polished, simple homeschool platform that a 4-year-old and 6-year-old can use daily with parent guidance.

V1 should prove that EduCore can support a real family routine, not just a demo.

## Core users

### Parent user
The parent needs to:
- create an account
- add a child using nickname-based identity
- define real-world rewards
- review progress by subject
- manage or regenerate weekly plans
- trust the system without feeling overwhelmed

### Child user
The child needs to:
- log in simply with username and PIN
- understand what to do today
- complete a small number of guided tasks
- feel encouraged but not overstimulated
- see progress and reward momentum visually

## Product principles

- family-first before public-scale thinking
- parent-controlled by default
- privacy-first and minimal-data by default
- calm, simple, low-friction experiences
- visual and tablet-friendly child interface
- neurodivergent-aware and autism-friendly design
- AI as helper, not replacement
- daily usefulness over feature breadth
- AI-forward long-term direction with careful child safety boundaries

## What EduCore is

EduCore is:
- a homeschool operating system for family use
- an AI-assisted weekly and daily planning companion
- a child-friendly task and reward experience
- a bridge between on-screen activities and offline printable work

## What EduCore is not

EduCore is not:
- a generic LMS
- a worksheet dump
- an institutional school platform
- a noisy gamified app built around overstimulation
- a scale-first SaaS product in V1

## V1 core experience

### Parent experience
Parents should be able to:
- sign in securely
- create and manage child profiles
- define token goals and real-life rewards
- view weekly progress and subject completion
- review generated plans
- regenerate or refresh plans when needed

The parent area should feel practical, clear, and lightweight.

### Child experience
Children should be able to:
- sign in with username and PIN
- see a clear home screen
- view 3 daily tasks
- complete simple interactive activities
- earn tokens from task completion
- watch a reward jar fill visually
- access printable activities when appropriate

The child area should feel calm, welcoming, visual, and easy to understand.

## Core V1 subjects

- Reading
- Math
- Critical Thinking

## UX and design requirements

### Parent UI
- clean and readable
- minimal clutter
- dark theme is acceptable if it remains soft and legible
- clear progress summaries
- easy child switching if multiple profiles appear later

### Child UI
- large touch targets
- low reading burden
- strong visual hierarchy
- one primary action focus per screen
- consistent subject color coding
- minimal animation
- no noisy reward effects
- calm game-like feel rather than arcade feel

## Privacy requirements

- no child real names required
- nickname-based child identity
- no location collection
- minimal personally identifying data
- parent account data kept limited and practical
- self-hosted compatibility from the start

## AI role in the product

AI is a central part of EduCore's long-term identity.

The project should help Xander's children grow up comfortable with AI as a helpful, guided part of learning. EduCore should not hide AI in the background only. Over time, it should present AI as a familiar, useful, parent-bounded part of the learning environment.

At the same time, child-facing AI access should be limited, intentional, and age-appropriate. Parent control and safety boundaries must remain stronger than novelty.

AI should support three layers over time:

### 1. Weekly Plan Generator
Generate weekly subject plans and daily task structure.

### 2. Activity Builder
Generate age-appropriate activities and printable materials.

### 3. Adaptive Engine
Adjust pacing and difficulty over time based on performance and parent guidance.

### 4. Guided Child AI Access
Allow carefully limited child interaction with AI in safe, parent-controlled ways as children get older.

For V1, AI should be introduced carefully. The system does not need full adaptive sophistication on day one to deliver value, but the architecture and product direction should preserve a strong AI-first future path.

## Recommended V1 scope boundaries

### Must-have for V1
- parent authentication
- child profile creation
- child username + PIN login
- child home screen
- daily task presentation
- task completion flow
- token jar / reward progress visualization
- parent progress view
- subject structure for Reading, Math, Critical Thinking
- printable support for at least some activities

### Nice-to-have if time allows
- parent planner regeneration controls
- simple difficulty selection
- richer printable variety
- more polished reward configuration

### Not V1
- avatar systems
- heavy animation systems
- voice interaction
- coding puzzles
- deep adaptive difficulty
- public multi-family SaaS concerns
- local LLM hosting complexity unless it directly supports immediate family use

## V1 success definition

V1 is successful when:
- a parent can create and manage a child profile
- a child can log in and understand what to do today
- the child can complete 3 daily tasks
- progress and token rewards update reliably
- the parent can review subject progress
- the product feels calm, usable, and genuinely helpful in a daily homeschool rhythm

## Technical direction

Current preferred stack:
- Next.js
- TypeScript
- TailwindCSS
- Prisma
- PostgreSQL
- Docker Compose deployment
- self-hosted capable infrastructure under Xander's control

AI hosting direction:
- begin with models hosted locally on Xander's PC or homelab hardware
- preserve flexibility for future local-first or hybrid AI deployment
- design interfaces so self-hosted models can power planning and child-safe AI features over time

This stack is appropriate if implementation remains pragmatic and does not overcomplicate V1.

## Key risks

- scope blur
- overbuilding AI too early
- making the child interface too busy or stimulating
- designing for future scale at the expense of current family usefulness
- treating the product like a conventional dashboard app instead of a family learning tool

## Visual direction

EduCore should combine calm family-friendly design with a subtle AI-forward, futuristic identity.

That means:
- clean, modern visual structure
- polished and slightly futuristic styling
- calm use of glow, depth, or advanced UI cues where appropriate
- never letting futuristic styling become noisy, overstimulating, or hard for children to use

The product should feel like a thoughtful future-facing homeschool system, not a sterile corporate dashboard or a chaotic sci-fi toy.

## Product decision filter

When making decisions, prefer the option that best supports:
1. real daily success for Xander's family
2. parent trust and control
3. calm child experience
4. privacy and simplicity
5. strong AI-forward long-term extensibility without premature complexity
