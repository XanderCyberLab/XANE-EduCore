import { PlannerDetailBoard } from "@/components/parent-ui";
import { requireParentSession } from "@/lib/auth/guards";
import { getParentPlannerData } from "@/lib/planner-data";

export default async function ParentPlannerPage() {
  const session = await requireParentSession();
  const planner = await getParentPlannerData(session.parentUserId);

  return (
    <main className="space-y-6 pb-8">
      <PlannerDetailBoard
        weekLabel={planner.weekLabel}
        title={planner.title}
        summary={planner.summary}
        aiNote={planner.aiNote}
        headerStats={planner.headerStats}
        controls={planner.controls}
        printables={planner.printables}
        days={planner.days}
      />
    </main>
  );
}
