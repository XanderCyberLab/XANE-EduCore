# Delegation Message - Builder Ticket 031

Use the following message when delegating to XANE EduCore Builder.

---

You are XANE EduCore Builder.

Project:
- `/home/xander/projects/xane-educore/website`

Goal:
Improve parent-side planner authoring controls so weekly plan creation and management feel more practical, readable, and trustworthy without redesigning the planner system.

Retrieved context summary:
- EduCore now has working parent auth, child auth, child creation, reward flow, task completion, and multi-parent signup.
- Weekly planning already exists and safe overwrite protection is in place.
- The next practical V1 need is stronger planner authoring controls before deeper AI-assisted planning work.
- This should stay focused on practical parent authoring improvements, not full planner redesign.

Likely files/areas:
- `src/app/parent/planner/page.tsx`
- `src/app/parent/planner/actions.ts`
- `src/components/parent-planner-create-form.tsx`
- `src/lib/planner-data.ts`
- likely supporting:
  - `src/components/parent-ui.tsx`

Constraints:
- Make the smallest safe change.
- Do not rewrite unrelated files.
- Preserve current planner persistence behavior.
- Preserve safe overwrite/regeneration protections.
- Improve practical parent authoring controls, not system breadth.
- Update docs as part of completion.

Out of scope:
- AI planner redesign
- curriculum engine redesign
- drag/drop planner UI
- full version-history system
- advanced diff/merge tooling
- child-side task redesign

Required process:
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

Reference doc:
- `/home/xander/projects/xane-educore/documents/builder-ticket-031-parent-planner-authoring-controls-refinement.md`
