# Builder Ticket 047 - Structured Child Profile Context

## Owner
XANE EduCore, project lead

## Implementation agent
XANE EduCore Builder

## Project
- `/home/xander/projects/xane-educore/website`

## Goal
Add a small amount of richer structured parent-authored child context beyond one freeform note, so parents can store more useful planning-relevant information while keeping child profiles calm and simple.

## Retrieved context summary
- EduCore already supports a freeform `parentNotes` field.
- A likely next profile improvement is richer structured context for planning support.
- This should help parent planning without turning child profiles into a heavy settings system.
- The child profile should stay family-first, practical, and lightweight.

## Likely files/areas
- `src/app/parent/children/page.tsx`
- `src/app/parent/children/actions.ts`
- `src/components/parent-child-create-form.tsx`
- `src/components/parent-child-edit-form.tsx`
- likely supporting:
  - schema/model files if needed
  - `src/components/parent-ui.tsx`
  - `src/lib/parent-dashboard.ts`

## Constraints
- Make the smallest safe change.
- Do not rewrite unrelated files.
- Preserve current child creation/editing behavior.
- Keep structured context light and practical.
- Avoid turning profiles into a complex settings system.
- Update docs as part of completion.

## Out of scope
- teacher assessment systems
- AI-generated profiling
- broad settings redesign
- child-side visibility redesign

## Required process
Before coding:
1. Inspect relevant files.
2. Confirm files you expect to modify.
3. State implementation plan.

After coding:
1. List files changed.
2. Explain what changed.
3. Explain how to test.
4. List assumptions made.
5. List docs updated.

## Builder completion notes
Implemented a lightweight structured child context expansion alongside the existing freeform `parentNotes` field.

Added optional parent-only fields:
- `learningStrengths`
- `supportNotes`
- `motivators`

Design intent:
- preserve calm child profiles
- keep fields short and optional
- improve planning relevance without adding a heavy settings system
