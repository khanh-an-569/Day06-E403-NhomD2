import type { Locale } from "../i18n";
import { sanitizeAnalysisText } from "./sanitize";
import { fetchJobFromUrl } from "./tavily";
import { requestCareerFitAnalysis } from "./llm";
import { parseAnalysisJson, applyWeightedScore } from "./score";
import { getCompareMessages, getParseJdMessages } from "./prompt";
import type { AnalysisResult } from "./types";

type ParsedJd = {
  role: string;
  level: "intern" | "junior" | "mid" | "senior" | "unknown";
  domain: string;
  highlights: string[];
  mandatory: string[];
  bonus: string[];
  dealBreakers: string[];
  summary: string;
};

function extractContent(payload: {
  choices?: {
    message?: {
      content?: string | null;
      tool_calls?: { function?: { arguments?: string } }[];
    };
  }[];
}, locale: Locale) {
  const message = payload.choices?.[0]?.message;
  const args =
    message?.tool_calls?.[0]?.function?.arguments ??
    (typeof message?.content === "string" ? message.content : undefined);
  if (!args) {
    throw new Error(
      locale === "en"
        ? "AI did not return a valid analysis."
        : "AI không trả về kết quả phân tích hợp lệ.",
    );
  }
  return args;
}

function normalizeJdProfile(value: unknown): ParsedJd {
  const v = value as Partial<ParsedJd>;
  return {
    role: typeof v.role === "string" ? v.role : "",
    level:
      v.level === "intern" ||
      v.level === "junior" ||
      v.level === "mid" ||
      v.level === "senior"
        ? v.level
        : "unknown",
    domain: typeof v.domain === "string" ? v.domain : "",
    highlights: Array.isArray(v.highlights) ? v.highlights.filter((item): item is string => typeof item === "string") : [],
    mandatory: Array.isArray(v.mandatory) ? v.mandatory.filter((item): item is string => typeof item === "string") : [],
    bonus: Array.isArray(v.bonus) ? v.bonus.filter((item): item is string => typeof item === "string") : [],
    dealBreakers: Array.isArray(v.dealBreakers) ? v.dealBreakers.filter((item): item is string => typeof item === "string") : [],
    summary: typeof v.summary === "string" ? v.summary : "",
  };
}

function normalizeLearningRoadmap(result: AnalysisResult): AnalysisResult {
  if (!Array.isArray(result.learningRoadmap)) {
    result.learningRoadmap = [];
    return result;
  }

  const allowedTypes = new Set(["technical", "review", "portfolio", "interview", "project"]);
  result.learningRoadmap = result.learningRoadmap
    .filter((item) => item && typeof item.phase === "string" && typeof item.title === "string")
    .map((item) => {
      const type = allowedTypes.has(item.type) ? item.type : "review";
      return {
        phase: item.phase,
        title: item.title,
        type,
        courseUrl: type === "technical" && typeof item.courseUrl === "string" ? item.courseUrl : undefined,
      };
    })
    .slice(0, 6);

  return result;
}

async function runStructuredPrompt<T>(
  prompt: { system: string; userPrefix: string },
  locale: Locale,
  body: string,
): Promise<T> {
  const payload = await requestCareerFitAnalysis({
    locale,
    system: prompt.system,
    user: `${prompt.userPrefix}\n\n${body}`,
  });
  const args = extractContent(payload, locale);
  return parseAnalysisJson(args, locale) as T;
}

export async function runCareerFitPipeline(input: {
  locale: Locale;
  cvText: string;
  jobDescription?: string;
  jobUrl?: string;
}) {
  const locale = input.locale;
  const safeCvText = sanitizeAnalysisText(input.cvText);
  const safeJobDescription = input.jobDescription ? sanitizeAnalysisText(input.jobDescription) : "";

  let jobDescription = safeJobDescription;
  if (!jobDescription && input.jobUrl) {
    jobDescription = sanitizeAnalysisText(await fetchJobFromUrl(input.jobUrl, locale));
  }

  if (!jobDescription || jobDescription.length < 20) {
    throw new Error(
      locale === "en"
        ? "Insufficient job information for accurate evaluation. Please provide a more detailed job description."
        : "Thông tin job chưa đủ để đánh giá chính xác. Vui lòng cung cấp mô tả công việc chi tiết hơn.",
    );
  }

  const parsedJd = normalizeJdProfile(
    await runStructuredPrompt<ParsedJd>(
      getParseJdMessages(locale),
      locale,
      `<job_description>\n${jobDescription}\n</job_description>`,
    ),
  );

  const comparison = await runStructuredPrompt<AnalysisResult>(
    getCompareMessages(locale),
    locale,
    JSON.stringify(
      {
        persona: {
          role: parsedJd.role,
          level: parsedJd.level,
          domain: parsedJd.domain,
          mustHave: parsedJd.mandatory,
          bonus: parsedJd.bonus,
        },
        jdAnalysis: {
          highlights: parsedJd.highlights,
          mandatory: parsedJd.mandatory,
          bonus: parsedJd.bonus,
          dealBreakers: parsedJd.dealBreakers,
          summary: parsedJd.summary,
        },
        cvText: safeCvText.slice(0, 25000),
        instructions:
          "First extract CV facts from the raw CV text, then compare them against the parsed JD. Do not invent facts. Use JD as the base.",
      },
      null,
      2,
    ),
  );

  const result = normalizeLearningRoadmap(applyWeightedScore(comparison));
  result.persona = {
    role: parsedJd.role,
    level: parsedJd.level,
    domain: parsedJd.domain,
    mustHave: parsedJd.mandatory,
    bonus: parsedJd.bonus,
  };
  result.jdAnalysis = {
    highlights: parsedJd.highlights,
    mandatory: parsedJd.mandatory,
    bonus: parsedJd.bonus,
    dealBreakers: parsedJd.dealBreakers,
  };
  if (!result.jobTitle) {
    result.jobTitle = parsedJd.role || undefined;
  }
  return result;
}
