import type { AnalysisResult } from "./types";
import { FIT_SCORE_WEIGHTS } from "./types";

export function parseAnalysisJson(args: string, locale: "vi" | "en"): AnalysisResult {
  try {
    const cleaned = args
      .trim()
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/i, "");
    return JSON.parse(cleaned) as AnalysisResult;
  } catch {
    throw new Error(
      locale === "en"
        ? "AI returned malformed analysis JSON."
        : "AI trả về JSON phân tích không hợp lệ.",
    );
  }
}

export function applyWeightedScore(result: AnalysisResult): AnalysisResult {
  if (!result.scoreBreakdown) {
    throw new Error("AI response is missing the required score breakdown.");
  }

  const b = result.scoreBreakdown;
  const weightedScore = Math.floor(
    (b.skillsMatch ?? 0) * FIT_SCORE_WEIGHTS.skillsMatch +
      (b.experienceMatch ?? 0) * FIT_SCORE_WEIGHTS.experienceMatch +
      (b.educationMatch ?? 0) * FIT_SCORE_WEIGHTS.educationMatch +
      (b.certificates ?? 0) * FIT_SCORE_WEIGHTS.certificates +
      (b.languageMatch ?? 0) * FIT_SCORE_WEIGHTS.languageMatch +
      (b.locationMatch ?? 0) * FIT_SCORE_WEIGHTS.locationMatch +
      (b.industryMatch ?? 0) * FIT_SCORE_WEIGHTS.industryMatch +
      (b.achievements ?? 0) * FIT_SCORE_WEIGHTS.achievements,
  );
  result.fitScore = Math.max(0, Math.min(100, weightedScore));

  const s = result.fitScore;
  result.recommendation =
    s >= 80 ? "Apply Now" : s >= 60 ? "Apply After Improvement" : "Learn First";
  return result;
}
