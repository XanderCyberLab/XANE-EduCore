import { SubjectArea } from "@/generated/prisma/client";
import type { PlannerGenerationProvider, PlannerGenerationRequest, PlannerGenerationResult } from "@/lib/planner-generation";

type OpenAIMessage = {
  role: "system" | "user";
  content: string;
};

type OpenAIContent = string | Array<{ type?: string; text?: string }>;

type OpenAIChoice = {
  message?: {
    content?: OpenAIContent;
  };
};

type OpenAIChatResponse = {
  choices?: OpenAIChoice[];
};

type ProviderOutput = {
  summary?: string;
  linesBySubject?: Partial<Record<SubjectArea, string[]>>;
};

function extractTextContent(content: OpenAIContent | undefined) {
  if (typeof content === "string") return content;
  if (Array.isArray(content)) return content.map((part) => part.text ?? "").join("\n");
  return "";
}

function cleanLine(value: string) {
  return value.replace(/^[-*\d.)\s]+/, "").replace(/\s+/g, " ").trim().slice(0, 90);
}

function normalizeLines(lines: string[] | undefined, scopeItemCount: number) {
  return (lines ?? []).map(cleanLine).filter(Boolean).slice(0, scopeItemCount);
}

function buildMessages(input: PlannerGenerationRequest): OpenAIMessage[] {
  const payload = {
    childNickname: input.childNickname,
    childAgeBand: input.childAgeBand ?? "LOWER_ELEMENTARY",
    scopeItemCount: input.scopeItemCount,
    subjects: input.subjects,
    context: input.context,
  };

  return [
    {
      role: "system",
      content:
        "You generate calm weekly homeschool planner drafts for EduCore. Return valid JSON only with shape { summary: string, linesBySubject: { READING?: string[], MATH?: string[], CRITICAL_THINKING?: string[] } }. Keep each line short, parent-reviewable, and under 90 characters. Do not mention AI, policy, or uncertainty. Do not create more than the requested number of lines per subject.",
    },
    {
      role: "user",
      content: `Create a starter weekly planner draft from this input: ${JSON.stringify(payload)}. Include only the requested subjects. Keep the summary under 280 characters. Make the tone calm, practical, and family-friendly.`,
    },
  ];
}

export class OpenAIPlannerGenerationProvider implements PlannerGenerationProvider {
  id: string;

  constructor(
    private readonly options: {
      apiKey: string;
      baseUrl: string;
      model: string;
      fallback: PlannerGenerationProvider;
    },
  ) {
    this.id = `openai:${options.model}`;
  }

  async generateStarterDraft(input: PlannerGenerationRequest): Promise<PlannerGenerationResult> {
    try {
      const response = await fetch(`${this.options.baseUrl}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.options.apiKey}`,
        },
        body: JSON.stringify({
          model: this.options.model,
          temperature: 0.7,
          response_format: { type: "json_object" },
          messages: buildMessages(input),
        }),
      });

      if (!response.ok) {
        throw new Error(`Planner generation provider request failed with status ${response.status}`);
      }

      const data = (await response.json()) as OpenAIChatResponse;
      const rawContent = extractTextContent(data.choices?.[0]?.message?.content);
      const parsed = JSON.parse(rawContent || "{}") as ProviderOutput;

      const linesBySubject = Object.fromEntries(
        input.subjects.map((subject) => [subject, normalizeLines(parsed.linesBySubject?.[subject], input.scopeItemCount)]),
      ) as Partial<Record<SubjectArea, string[]>>;

      const hasAnyGeneratedLines = Object.values(linesBySubject).some((lines) => (lines?.length ?? 0) > 0);
      if (!hasAnyGeneratedLines) {
        throw new Error("Planner generation provider returned no usable lines");
      }

      return {
        source: this.id,
        summary: (parsed.summary ?? "").trim().slice(0, 280) || `A calm starter week for ${input.childNickname}.`,
        linesBySubject,
      };
    } catch {
      const fallbackResult = await this.options.fallback.generateStarterDraft(input);
      return {
        ...fallbackResult,
        source: `${this.id}:fallback:${fallbackResult.source}`,
      };
    }
  }
}

export function createOpenAIPlannerGenerationProvider(input: {
  apiKey: string;
  baseUrl?: string;
  model?: string;
  fallback: PlannerGenerationProvider;
}) {
  return new OpenAIPlannerGenerationProvider({
    apiKey: input.apiKey,
    baseUrl: (input.baseUrl ?? "https://api.openai.com/v1").replace(/\/$/, ""),
    model: input.model ?? "gpt-4o-mini",
    fallback: input.fallback,
  });
}
