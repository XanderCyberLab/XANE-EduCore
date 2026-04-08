import { PlannerDetailBoard } from "@/components/parent-ui";
import { parentDashboardData } from "@/lib/mock-parent";

export default function ParentPlannerPage() {
  const planner = parentDashboardData.plannerDetail;

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
