import { useEffect, useState } from "react";
import KpiGrid from "../components/KpiGrid";
import CategoryPie from "../components/CategoryPie";
import TrendLineChart from "../components/TrendLineChart";
import InsightsPanel from "../components/InsightsPanel";
import ErrorMessage from "../components/ErrorMessage";

function Home({ api, theme }) {
  const [summary, setSummary] = useState(null);
  const [categories, setCategories] = useState(null);
  const [monthlyTrend, setMonthlyTrend] = useState(null);
  const [healthScore, setHealthScore] = useState(null);
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [summaryRes, categoriesRes, trendRes, healthRes, insightsRes] =
          await Promise.all([
            api.get("/summary"),
            api.get("/categories"),
            api.get("/monthly-trend"),
            api.get("/health-score"),
            api.get("/insights"),
          ]);

        setSummary(summaryRes.data);
        setCategories(categoriesRes.data.categories);
        setMonthlyTrend(trendRes.data.monthly_trend);
        setHealthScore(healthRes.data.health_score);
        setInsights(insightsRes.data.insights);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.detail || "Unable to load analytics data.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [api]);

  if (loading) {
    return (
      <div className="rounded-[32px] border border-slate-800 bg-slate-900 p-8 text-center text-slate-300 shadow-xl shadow-slate-950/20">
        <p>Loading analytics...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {summary && <KpiGrid summary={summary} healthScore={healthScore} />}
      <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <CategoryPie categories={categories} />
        <TrendLineChart monthlyTrend={monthlyTrend} />
      </div>
      <InsightsPanel insights={insights} />
      {error && <ErrorMessage message={error} />}
    </div>
  );
}

export default Home;
