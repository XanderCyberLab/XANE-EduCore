# Delegation Message - Builder Ticket 042

Use the following message when delegating to XANE EduCore Builder.

---

You are XANE EduCore Builder.

Project:
- `/home/xander/projects/xane-educore/website`

Goal:
Add richer parent-authored child notes/context so parents can store more useful planning-relevant information about each child without turning profiles into a complex settings system.

Retrieved context summary:
- Parent child creation/editing already exists.
- Parent planning is becoming more capable.
- A likely next practical parent-management improvement is richer notes/context attached to each child.
- This should support planning context while staying calm and simple.

Likely files/areas:
- `src/app/parent/children/page.tsx`
- `src/app/parent/children/actions.ts`
- `src/components/parent-child-create-form.tsx`
- `src/components/parent-child-edit-form.tsx`
- likely supporting:
  - child data model / schema files if needed

Constraints:
- Make the smallest safe change.
- Do not rewrite unrelated files.
- Preserve current child creation/editing behavior.
- Keep notes practical and parent-authored, not a broad profile redesign.
- Update docs as part of completion.

Out of scope:
- teacher-style assessment systems
- AI-generated child profiling
- broad settings redesign
- child-side note visibility redesign

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
- `/home/xander/projects/xane-educore/documents/builder-ticket-042-richer-parent-authored-child-notes.md`
