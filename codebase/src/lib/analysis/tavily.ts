export async function fetchJobFromUrl(url: string, locale: "vi" | "en"): Promise<string> {
  const key = process.env.TAVILY_API_KEY;
  if (!key) {
    throw new Error(locale === "en" ? "TAVILY_API_KEY is not configured" : "Chưa cấu hình TAVILY_API_KEY");
  }

  const res = await fetch("https://api.tavily.com/extract", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      urls: [url],
      extract_depth: "advanced",
      format: "text",
      include_favicon: false,
      include_images: false,
    }),
  });

  if (!res.ok) {
    const details = await res.text();
    throw new Error(`Tavily extract failed (${res.status}). ${details.slice(0, 300)}`.trim());
  }

  const data = (await res.json()) as {
    results?: { url?: string; raw_content?: string; content?: string }[];
    failed_results?: { url?: string; error?: string }[];
  };
  const first = data.results?.[0];
  const content = first?.raw_content || first?.content || "";

  if (!content || content.length < 50) {
    const failed = data.failed_results?.[0];
    const suffix = failed?.error ? ` (${failed.error})` : "";
    throw new Error(`Could not extract job description from URL${suffix}`.trim());
  }

  return content.slice(0, 20000);
}
