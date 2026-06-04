import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { analyzeCareerFit } from "@/lib/analyze.functions";
import { getLocaleCopy, normalizeLocale, type Locale } from "@/lib/i18n";
import { InputPanel } from "./InputPanel";
import { Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

const LOCALE_STORAGE_KEY = "careerfit.locale";
const ANALYSIS_STORAGE_KEY = "careerfit.analysisResult";

export function CareerFitApp() {
  const [locale, setLocale] = useState<Locale>("vi");
  const copy = getLocaleCopy(locale);
  const analyzeFn = useServerFn(analyzeCareerFit);
  const navigate = useNavigate();

  useEffect(() => {
    setLocale(normalizeLocale(window.localStorage.getItem(LOCALE_STORAGE_KEY)));
  }, []);

  useEffect(() => {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    document.documentElement.lang = locale;
  }, [locale]);

  const mutation = useMutation({
    mutationFn: async (input: {
      cvText: string;
      jobDescription?: string;
      jobUrl?: string;
      locale: Locale;
    }) => analyzeFn({ data: input }),
    onSuccess: (data) => {
      window.sessionStorage.setItem(ANALYSIS_STORAGE_KEY, JSON.stringify(data));
      toast.success(copy.app.analysisComplete);
      void navigate({ to: "/analysis" });
    },
    onError: (err: Error) => {
      toast.error(err.message || (locale === "en" ? "Something went wrong" : "Đã có lỗi xảy ra"));
    },
  });

  return (
    <div className="relative min-h-screen bg-background">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px]"
        style={{ background: "var(--gradient-hero)" }}
      />

      <Toaster richColors position="top-center" />

      <div className="relative mx-auto max-w-5xl px-4 pb-24 pt-12 sm:px-6 lg:px-8">
        <header className="mx-auto max-w-3xl text-center">
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
          <h1 className="bg-clip-text text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            {copy.app.title}
          </h1>
          <p className="mt-3 text-base text-muted-foreground sm:text-lg">
            {copy.app.subtitle}
          </p>
        </header>

        <main className="mt-10">
          <InputPanel
            isAnalyzing={mutation.isPending}
            locale={locale}
            copy={copy}
            onAnalyze={(input) => mutation.mutate({ ...input, locale })}
          />
        </main>

        <footer className="mt-16 text-center text-xs text-muted-foreground">
          {copy.app.footer}
        </footer>
      </div>
    </div>
  );
}
