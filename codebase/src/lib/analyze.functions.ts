import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { normalizeLocale } from "./i18n";
import { runCareerFitPipeline } from "./analysis/pipeline";
import type { AnalysisResult } from "./analysis/types";

export type { AnalysisResult } from "./analysis/types";

const InputSchema = z.object({
  cvText: z.string().min(50, "CV text is too short").max(50000),
  jobDescription: z.string().min(20).max(50000).optional(),
  jobUrl: z.string().url().optional(),
  locale: z.enum(["vi", "en"]).optional(),
});

export const analyzeCareerFit = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => InputSchema.parse(input))
  .handler(async ({ data }): Promise<AnalysisResult> => {
    const locale = normalizeLocale(data.locale);

    const result = await runCareerFitPipeline({
      locale,
      cvText: data.cvText,
      jobDescription: data.jobDescription?.trim() || undefined,
      jobUrl: data.jobUrl,
    });

    try {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      await supabaseAdmin.from("analysis_results").insert({
        fit_score: result.fitScore,
        recommendation: result.recommendation,
        matched_skills: result.matchedSkills,
        missing_skills: result.missingSkills,
        weak_evidence: result.weakEvidence,
        learning_roadmap: result.learningRoadmap,
        cv_suggestions: result.cvSuggestions,
        job_title: result.jobTitle ?? null,
      });
    } catch (e) {
      console.error("Failed to persist analysis:", e);
    }

    return result;
  });
