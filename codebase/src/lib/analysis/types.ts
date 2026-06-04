export type AnalysisResult = {
  persona?: {
    role?: string;
    level?: "intern" | "junior" | "mid" | "senior" | "unknown";
    domain?: string;
    mustHave: string[];
    bonus: string[];
  };
  jdAnalysis?: {
    highlights: string[];
    mandatory: string[];
    bonus: string[];
    dealBreakers: string[];
  };
  cvAnalysis?: {
    summary: string;
    facts: string[];
    skills: string[];
    experience: string[];
    education: string[];
    certificates: string[];
    languages: string[];
    location?: string;
    industry?: string;
    projects: string[];
    metrics: string[];
  };
  criteria?: {
    name: string;
    score: number;
    status: "met" | "partial" | "missing";
    jdRequirement: string[];
    cvEvidence: string[];
    gap: string[];
    improvement: string[];
    note?: string;
  }[];
  fitScore: number;
  recommendation: "Apply Now" | "Apply After Improvement" | "Learn First";
  scoreBreakdown?: {
    skillsMatch?: number;
    experienceMatch?: number;
    educationMatch?: number;
    certificates?: number;
    languageMatch?: number;
    locationMatch?: number;
    industryMatch?: number;
    achievements?: number;
  };
  matchedSkills: string[];
  missingSkills: string[];
  weakEvidence: string[];
  learningRoadmap: {
    phase: string;
    title: string;
    type: "technical" | "review" | "portfolio" | "interview" | "project";
    courseUrl?: string;
  }[];
  cvSuggestions: string[];
  jobTitle?: string;
};

export const FIT_SCORE_WEIGHTS = {
  skillsMatch: 0.35,
  experienceMatch: 0.25,
  educationMatch: 0.1,
  certificates: 0.07,
  languageMatch: 0.08,
  locationMatch: 0.05,
  industryMatch: 0.05,
  achievements: 0.05,
} as const;
