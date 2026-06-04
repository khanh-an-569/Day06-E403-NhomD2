import { createFileRoute } from "@tanstack/react-router";
import { CareerFitAnalysisPage } from "@/components/careerfit/CareerFitAnalysisPage";

export const Route = createFileRoute("/analysis")({
  head: () => ({
    meta: [
      { title: "CareerFit AI - Analysis Report" },
      {
        name: "description",
        content:
          "Compare CV and JD side by side in a dedicated analysis report.",
      },
      { property: "og:title", content: "CareerFit AI - Analysis Report" },
      {
        property: "og:description",
        content:
          "Compare CV and JD side by side in a dedicated analysis report.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: AnalysisPage,
});

function AnalysisPage() {
  return <CareerFitAnalysisPage />;
}
