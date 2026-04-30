# Builder Ticket 031 - Parent Planner Authoring Controls Refinement

## Owner
XANE EduCore, project lead

## Implementation agent
XANE EduCore Builder

## Project
- `/home/xander/projects/xane-educore/website`

## Goal
Improve parent-side planner authoring controls so weekly plan creation and management feel more practical, readable, and trustworthy without redesigning the planner system.

## Retrieved context summary
- EduCore now has working parent auth, child auth, child creation, reward flow, task completion, and multi-parent signup.
- Weekly planning already exists and safe overwrite protection is in place.
- The next practical V1 need is stronger planner authoring controls before deeper AI-assisted planning work.
- This should stay focused on practical parent authoring improvements, not full planner redesign.

## Likely files/areas
- `src/app/parent/planner/page.tsx`
- `src/app/parent/planner/actions.ts`
- `src/components/parent-planner-create-form.tsx`
- `src/lib/planner-data.ts`
- likely supporting:
  - `src/components/parent-ui.tsx`

## Constraints
- Make the smallest safe change.
- Do not rewrite unrelated files.
- Preserve current planner persistence behavior.
- Preserve safe overwrite/regeneration protections.
- Improve practical parent authoring controls, not system breadth.
- Update docs as part of completion.

## Out of scope
- AI planner redesign
- curriculum engine redesign
- drag/drop planner UI
- full version-history system
- advanced diff/merge tooling
- child-side task redesign

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

---

## Completion notes

### Files changed
- `website/src/app/parent/planner/page.tsx`
- `website/src/app/parent/planner/actions.ts`
- `website/src/components/parent-planner-create-form.tsx`
- `website/src/components/parent-ui.tsx`
- `website/src/lib/planner-data.ts`
- `documents/builder-ticket-031-parent-planner-authoring-controls-refinement.md`

### What changed
- Tightened weekly plan authoring validation so the selected week must be an explicit Monday and subject entries cannot silently exceed five saved weekday lines.
- Added clearer authoring guidance in the parent planner form, including practical save rules, current child coverage, and stronger explanation of what save/generate actions do.
- Added a small saved-week management panel on the planner page so parents can quickly see which child plans already exist, how many blocks they contain, whether completions are already linked, and how much printable support is stored.
- Preserved existing persistence, starter generation, and completion-protection behavior while making the planner feel more readable and trustworthy.

### How to test
- Start the website app normally.
- Visit `/parent/planner` as a signed-in parent.
- Verify the create/generate form now shows practical authoring rules, current week child coverage, and save-behavior guidance.
- Try choosing a non-Monday date and confirm the form rejects it with a clear validation message.
- Enter more than five non-empty lines in a subject field and confirm the form rejects it instead of silently truncating lines.
- Save a valid weekly plan and verify the planner still updates normally, child-facing plan flow remains connected, and the new saved-week management panel reflects the stored week.
- If a saved week already has linked completions, verify overwrite protection messaging still blocks unsafe replacement.
- Run: `npx eslint src/app/parent/planner/page.tsx src/app/parent/planner/actions.ts src/components/parent-planner-create-form.tsx src/components/parent-ui.tsx src/lib/planner-data.ts`

### Assumptions made
- Enforcing explicit Monday selection is safer than silently normalizing another date to Monday, because it better matches the parent-facing instructions.
- Rejecting more than five non-empty lines is more trustworthy than silently trimming extra lines.
- A compact saved-week status panel is the smallest safe management improvement without introducing full planner editing history or diff tooling.

### Docs updated
- `documents/builder-ticket-031-parent-planner-authoring-controls-refinement.md`
