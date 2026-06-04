const PROMPT_INJECTION_LINE_PATTERNS = [
  /ignore\s+(?:all|any|the)?\s*(?:previous|above|earlier)?\s*instructions?/i,
  /disregard\s+(?:all|any|the)?\s*instructions?/i,
  /follow\s+these\s+instructions?/i,
  /system\s+prompt/i,
  /developer\s+message/i,
  /hidden\s+instructions?/i,
  /prompt\s+injection/i,
  /jailbreak/i,
  /act\s+as\s+/i,
  /you\s+are\s+chatgpt/i,
  /output\s+(?:only|just|exactly)?\s*(?:100|a\s*100|full\s*score|maximum\s*score)/i,
  /give\s+me\s+(?:100|full\s*score|maximum\s*score)/i,
  /change\s+(?:the\s+)?format/i,
  /return\s+(?:only|just|exactly)\s+(?:json|xml|yaml|markdown)/i,
  /do\s+not\s+follow/i,
  /reveal\s+(?:your\s+)?(?:system\s+)?prompt/i,
  /reveal\s+(?:hidden\s+)?reasoning/i,
  /bypass/i,
];

const VIETNAMESE_INJECTION_PATTERNS = [
  /bo\s*qua\s+(?:tat\s*ca|cac|nhung|nhan)?\s*(?:huong\s*dan|chi\s*dan|lenh|quy\s*tac)/i,
  /lam\s+theo\s+(?:cac\s+)?(?:huong\s*dan|chi\s*dan|lenh|quy\s*tac)/i,
  /quy\s*tac\s*he\s*thong/i,
  /thu\s*chi\s*duoc\s*(?:tra\s*ve|dat|cho)/i,
  /chi\s*tra\s*ve\s*(?:json|xml|yaml|markdown|mot\s*doi\s*tuong)/i,
  /doi\s*dang\s*de\s*(?:tra\s*loi|xuat)/i,
  /day\s*la\s*(?:quy\s*tac|chi\s*dan)\s*quan\s*trong/i,
  /he\s*thong\s*prompt/i,
  /prompt\s*he\s*thong/i,
  /nha\s*phat\s*trien/i,
  /tham\s*so\s*bi\s*mat/i,
  /su\s*luan\s*noi\s*bo/i,
  /lanh\s*dao\s*truoc\s*do/i,
  /tang\s*diem/i,
  /cho\s*100\s*diem/i,
  /diem\s*toi\s*da/i,
  /lay\s*100/i,
];

function normalizeDetectionText(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function looksLikePromptInjection(line: string): boolean {
  const normalizedLine = normalizeDetectionText(line);
  return (
    PROMPT_INJECTION_LINE_PATTERNS.some((pattern) => pattern.test(normalizedLine)) ||
    VIETNAMESE_INJECTION_PATTERNS.some((pattern) => pattern.test(normalizedLine))
  );
}

export function sanitizeAnalysisText(text: string): string {
  const cleanedLines: string[] = [];

  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line) {
      if (cleanedLines.at(-1) !== "") cleanedLines.push("");
      continue;
    }

    if (looksLikePromptInjection(line)) continue;
    cleanedLines.push(line);
  }

  return cleanedLines.join("\n").replace(/\n{3,}/g, "\n\n").trim();
}

export function buildSafeAnalysisContext(cvText: string, jobDescription: string) {
  return {
    cvText: sanitizeAnalysisText(cvText),
    jobDescription: sanitizeAnalysisText(jobDescription),
  };
}

export function sanitizeAnalysisSubmission(input: {
  cvText: string;
  jobDescription?: string;
  jobUrl?: string;
}) {
  return {
    cvText: sanitizeAnalysisText(input.cvText),
    jobDescription: input.jobDescription ? sanitizeAnalysisText(input.jobDescription) : undefined,
    jobUrl: input.jobUrl?.trim() || undefined,
  };
}
