import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import type { AnalysisResult } from "@/lib/analyze.functions";
import { getLocaleCopy, normalizeLocale, type Locale } from "@/lib/i18n";
import { ResultsPanel } from "./ResultsPanel";

const LOCALE_STORAGE_KEY = "careerfit.locale";
const ANALYSIS_STORAGE_KEY = "careerfit.analysisResult";

export function CareerFitAnalysisPage() {
  const [locale, setLocale] = useState<Locale>("vi");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const copy = getLocaleCopy(locale);
  const navigate = useNavigate();

  useEffect(() => {
    setLocale(normalizeLocale(window.localStorage.getItem(LOCALE_STORAGE_KEY)));
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    const raw = window.sessionStorage.getItem(ANALYSIS_STORAGE_KEY);
    if (!raw) return;
    try {
      setResult(JSON.parse(raw) as AnalysisResult);
    } catch {
      setResult(null);
    }
  }, [locale]);

  const clearAndBack = () => {
    window.sessionStorage.removeItem(ANALYSIS_STORAGE_KEY);
    void navigate({ to: "/" });
  };

  return (
    <div className="relative min-h-screen bg-background">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px]"
        style={{ background: "var(--gradient-hero)" }}
      />

      <Toaster richColors position="top-center" />

      <div className="relative mx-auto max-w-7xl px-4 pb-24 pt-12 sm:px-6 lg:px-8">
        <header className="mx-auto max-w-4xl text-center">
          <div className="mb-6 flex items-center justify-center">
            <div className="inline-flex rounded-full border border-border bg-card/80 p-1 text-xs font-medium text-muted-foreground backdrop-blur">
              <button
                type="button"
                onClick={() => setLocale("vi")}
                className={`rounded-full px-3 py-1 transition-colors ${
                  locale === "vi" ? "bg-primary text-primary-foreground" : "hover:text-foreground"
                }`}
              >
                VI
              </button>
              <button
                type="button"
                onClick={() => setLocale("en")}
                className={`rounded-full px-3 py-1 transition-colors ${
                  locale === "en" ? "bg-primary text-primary-foreground" : "hover:text-foreground"
                }`}
              >
                EN
              </button>
            </div>
          </div>

          <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            {copy.app.brand}
          </div>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            {locale === "en" ? "Analysis Report" : "Báo cáo phân tích"}
          </h1>
          <p className="mt-3 text-base text-muted-foreground sm:text-lg">
            {locale === "en"
              ? "Compare your CV and JD side by side in a dedicated report."
              : "Đối chiếu CV và JD theo từng cột trong một trang báo cáo riêng."}
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Button variant="outline" onClick={clearAndBack}>
              {locale === "en" ? "Back to form" : "Quay lại form"}
            </Button>
          </div>
        </header>

        <main className="mt-10">
          {result ? (
            <ResultsPanel
              result={result}
              isLoading={false}
              error={null}
              locale={locale}
              copy={copy}
            />
          ) : (
            <div className="mx-auto max-w-2xl rounded-2xl border border-border/60 bg-card p-8 text-center">
              <h2 className="text-xl font-semibold text-foreground">
                {locale === "en" ? "No analysis found" : "Chưa có kết quả phân tích"}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {locale === "en"
                  ? "Run an analysis from the home page first."
                  : "Hãy phân tích từ trang chủ trước."}
              </p>
              <div className="mt-6">
                <Button onClick={clearAndBack}>
                  {locale === "en" ? "Go to home" : "Đi tới trang chủ"}
                </Button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
