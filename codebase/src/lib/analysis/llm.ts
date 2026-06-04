import type { Locale } from "../i18n";

const LLM_ENDPOINT =
  process.env.OPENROUTER_BASE_URL ??
  process.env.LLM_ENDPOINT ??
  "https://opencode.ai/zen/go/v1";
const LLM_API_KEY = process.env.OPENROUTER_API_KEY ?? process.env.API_KEY;
const LLM_MODEL = process.env.OPENROUTER_MODEL ?? process.env.MODEL ?? "openai/gpt-4.1";
const LLM_SITE_URL = process.env.OPENROUTER_SITE_URL ?? process.env.HTTP_REFERER;
const LLM_SITE_NAME = process.env.OPENROUTER_SITE_NAME ?? process.env.OPENROUTER_TITLE;

function getChatCompletionsUrl(endpoint: string) {
  const trimmed = endpoint.replace(/\/+$/, "");
  return trimmed.endsWith("/chat/completions")
    ? trimmed
    : `${trimmed}/chat/completions`;
}

export function ensureLlmApiKey(locale: Locale) {
  if (!LLM_API_KEY) {
    throw new Error(
      locale === "en"
        ? "OPENROUTER_API_KEY is not configured"
        : "Chưa cấu hình OPENROUTER_API_KEY",
    );
  }

  return LLM_API_KEY;
}

export async function requestCareerFitAnalysis(prompt: {
  system: string;
  user: string;
  locale: Locale;
}) {
  const apiKey = ensureLlmApiKey(prompt.locale);
  const headers: Record<string, string> = {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  };
  if (LLM_SITE_URL) headers["HTTP-Referer"] = LLM_SITE_URL;
  if (LLM_SITE_NAME) headers["X-OpenRouter-Title"] = LLM_SITE_NAME;

  const res = await fetch(getChatCompletionsUrl(LLM_ENDPOINT), {
    method: "POST",
    headers,
    body: JSON.stringify({
      model: LLM_MODEL,
      messages: [
        { role: "system", content: prompt.system },
        { role: "user", content: prompt.user },
      ],
      temperature: 0,
    }),
  });

  if (res.status === 429) {
    throw new Error(
      prompt.locale === "en"
        ? "Rate limit exceeded. Please try again in a moment."
        : "Đã vượt quá giới hạn yêu cầu. Vui lòng thử lại sau ít phút.",
    );
  }
  if (res.status === 402) {
    throw new Error(
      prompt.locale === "en"
        ? "AI credits exhausted. Please add credits in your workspace settings."
        : "Hết tín dụng AI. Vui lòng nạp thêm credits trong workspace settings.",
    );
  }
  if (!res.ok) {
    const t = await res.text();
    console.error("AI gateway error:", res.status, t);
    throw new Error(
      prompt.locale === "en"
        ? `AI analysis failed (${res.status}). ${t.slice(0, 300)}`
        : `Phân tích AI thất bại (${res.status}). ${t.slice(0, 300)}`,
    );
  }

  return res.json() as Promise<{
    choices?: {
      message?: {
        content?: string | null;
        tool_calls?: { function?: { arguments?: string } }[];
      };
    }[];
  }>;
}
