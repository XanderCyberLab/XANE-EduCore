import { SubjectArea } from "@/generated/prisma/client";
import { createOpenAIPlannerGenerationProvider } from "@/lib/planner-generation-openai";

export type PlannerGenerationContext = {
  learningGoals: string;
  pacingNotes: string;
  supportNotes: string;
};

export type PlannerGenerationRequest = {
  childNickname: string;
  childAgeBand: string | null | undefined;
  context: PlannerGenerationContext;
  scopeItemCount: number;
  subjects: SubjectArea[];
};

export type PlannerGenerationResult = {
  source: string;
  summary: string;
  linesBySubject: Partial<Record<SubjectArea, string[]>>;
};

export interface PlannerGenerationProvider {
  id: string;
  generateStarterDraft(input: PlannerGenerationRequest): Promise<PlannerGenerationResult>;
}

function ageBandLabel(ageBand: string | null | undefined) {
  switch (ageBand) {
    case "EARLY_YEARS":
      return "early years";
    case "UPPER_ELEMENTARY":
      return "upper elementary";
    default:
      return "lower elementary";
  }
}

function defaultPlanLines(subject: SubjectArea, ageBand: string | null | undefined) {
  const band = ageBandLabel(ageBand);

  switch (subject) {
    case SubjectArea.READING:
      return [
        `Warm up with a short ${band} reading moment`,
        "Read together and retell the story",
        "Light phonics or word play review",
        "Printable reading practice and confidence check",
        "Favorite book reread and calm wrap-up",
      ];
    case SubjectArea.MATH:
      return [
        "Hands-on counting or number warm-up",
        "Short guided math practice",
        "Keep math tactile and low-pressure",
        "Printable or table-top math review",
        "Shape or pattern hunt to finish the week",
      ];
    case SubjectArea.CRITICAL_THINKING:
      return [
        "Pattern or sorting prompt",
        "Question-of-the-day thinking block",
        "Light puzzle or comparison activity",
        "Shared observation walk or family challenge",
        "Reflect on the week and notice progress",
      ];
  }
}

function buildGeneratedPlanLines(subject: SubjectArea, baseLines: string[], context: PlannerGenerationContext) {
  return baseLines.map((line) => {
    if (context.learningGoals) {
      if (subject === SubjectArea.READING) return `${line} for ${context.learningGoals.toLowerCase()}`;
      if (subject === SubjectArea.MATH) return `${line} around ${context.learningGoals.toLowerCase()}`;
      return `${line} tied to ${context.learningGoals.toLowerCase()}`;
    }

    if (context.pacingNotes && subject === SubjectArea.MATH) return `${line} with ${context.pacingNotes.toLowerCase()}`;
    if (context.supportNotes && subject === SubjectArea.CRITICAL_THINKING) return `${line} with ${context.supportNotes.toLowerCase()}`;
    return line;
  });
}

function buildGeneratedSummary(childNickname: string, context: PlannerGenerationContext) {
  const summaryParts = [
    context.learningGoals ? `Focus on ${context.learningGoals.toLowerCase()}` : `A calm starter week for ${childNickname}`,
    context.pacingNotes ? `keep the rhythm ${context.pacingNotes.toLowerCase()}` : "keep the rhythm manageable",
    context.supportNotes ? `and remember ${context.supportNotes.toLowerCase()}` : "and leave room for parent review before use",
  ];

  const summary = `${summaryParts[0]}, ${summaryParts[1]}, ${summaryParts[2]}.`;
  return summary.charAt(0).toUpperCase() + summary.slice(1);
}

class StarterTemplatePlannerGenerationProvider implements PlannerGenerationProvider {
  id = "starter-template";

  async generateStarterDraft(input: PlannerGenerationRequest): Promise<PlannerGenerationResult> {
    const linesBySubject = Object.fromEntries(
      input.subjects.map((subject) => [
        subject,
        buildGeneratedPlanLines(subject, defaultPlanLines(subject, input.childAgeBand), input.context).slice(0, input.scopeItemCount),
      ]),
    ) as Partial<Record<SubjectArea, string[]>>;

    return {
      source: this.id,
      summary: buildGeneratedSummary(input.childNickname, input.context),
      linesBySubject,
    };
  }
}

const starterTemplateProvider = new StarterTemplatePlannerGenerationProvider();

const configuredPlannerGenerationProvider = (() => {
  const apiKey = process.env.OPENAI_API_KEY?.trim();
  if (!apiKey) return starterTemplateProvider;

  return createOpenAIPlannerGenerationProvider({
    apiKey,
    baseUrl: process.env.OPENAI_BASE_URL?.trim(),
    model: process.env.OPENAI_MODEL?.trim(),
    fallback: starterTemplateProvider,
  });
})();

export function getPlannerGenerationProvider(): PlannerGenerationProvider {
  return configuredPlannerGenerationProvider;
}
