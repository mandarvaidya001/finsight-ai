import { useMemo, useState } from "react";
import AdvisorForm from "../components/AdvisorForm";
import AdvisorReport from "../components/AdvisorReport";
import ExpenseDonutChart from "../components/ExpenseDonutChart";
import HealthGauge from "../components/HealthGauge";
import SavingsBarChart from "../components/SavingsBarChart";
import MoneyLeakAnalysis from "../components/MoneyLeakAnalysis";
import AnnualProjection from "../components/AnnualProjection";
import FinancialStory from "../components/FinancialStory";
import UploadTransactions from "../components/UploadTransactions";
import ErrorMessage from "../components/ErrorMessage";
import {
  categories as advisorCategories,
  getAdvisorOverview,
  getExpenseDistribution,
  getLeakAnalysis,
  getAnnualProjection,
  buildFinancialStory,
  getRecommendations,
} from "../utils/advisorUtils";

const defaultAdvisorValues = {
  income: "",
  food: "",
  shopping: "",
  transport: "",
  utilities: "",
  entertainment: "",
  healthcare: "",
  other: "",
};

function Advisor({ api }) {
  const [advisorValues, setAdvisorValues] = useState(defaultAdvisorValues);
  const [advisorReport, setAdvisorReport] = useState(null);
  const [activeTab, setActiveTab] = useState("manual");
  const [error, setError] = useState(null);

  const advisorOverview = useMemo(
    () => getAdvisorOverview(advisorValues),
    [advisorValues]
  );

  const advisorDistribution = useMemo(
    () => getExpenseDistribution(advisorValues),
    [advisorValues]
  );

  const advisorLeaks = useMemo(
    () => getLeakAnalysis(advisorValues),
    [advisorValues]
  );

  const advisorProjection = useMemo(
    () => getAnnualProjection(advisorValues),
    [advisorValues]
  );

  const advisorStory = useMemo(
    () => buildFinancialStory(advisorValues),
    [advisorValues]
  );

  const advisorRecommendations = useMemo(
    () => getRecommendations(advisorValues),
    [advisorValues]
  );

  const handleAdvisorChange = (event) => {
    const { name, value } = event.target;
    setAdvisorValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAdvisorSubmit = (event) => {
    event.preventDefault();
    setAdvisorReport({
      overview: advisorOverview,
      distribution: advisorDistribution,
      leaks: advisorLeaks,
      projection: advisorProjection,
      story: advisorStory,
      recommendations: advisorRecommendations,
    });
    setError(null);
  };

  const handleUploadSuccess = () => {
    setError(null);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-[32px] border border-slate-800 bg-slate-900 p-6 shadow-xl shadow-slate-950/20">
        <h2 className="text-lg font-semibold text-white">Personal Finance Advisor</h2>
        <p className="mt-2 text-sm text-slate-400">
          Analyze your finances with manual entry or by uploading transaction data.
        </p>
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setActiveTab("manual")}
          className={`rounded-3xl px-4 py-2 text-sm font-semibold transition ${
            activeTab === "manual"
              ? "bg-sky-500 text-slate-950 shadow-lg shadow-sky-500/20"
              : "border border-slate-700 bg-slate-950 text-slate-300 hover:border-slate-600 hover:text-white"
          }`}
        >
          Manual Entry
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("upload")}
          className={`rounded-3xl px-4 py-2 text-sm font-semibold transition ${
            activeTab === "upload"
              ? "bg-sky-500 text-slate-950 shadow-lg shadow-sky-500/20"
              : "border border-slate-700 bg-slate-950 text-slate-300 hover:border-slate-600 hover:text-white"
          }`}
        >
          CSV Upload
        </button>
      </div>

      {activeTab === "manual" && (
        <>
          <AdvisorForm
            values={advisorValues}
            onChange={handleAdvisorChange}
            onSubmit={handleAdvisorSubmit}
            categories={advisorCategories}
          />

          {advisorReport ? (
            <div className="space-y-6">
              <div className="grid gap-6 xl:grid-cols-[1.3fr_1fr]">
                <ExpenseDonutChart data={advisorReport.distribution} />
                <div className="space-y-6">
                  <HealthGauge score={advisorReport.overview.healthScore} />
                  <SavingsBarChart
                    income={advisorReport.overview.income}
                    expenses={advisorReport.overview.totalExpenses}
                    savings={advisorReport.overview.netSavings}
                  />
                </div>
              </div>
              <MoneyLeakAnalysis leaks={advisorReport.leaks} />
              <AnnualProjection projection={advisorReport.projection} />
              <FinancialStory story={advisorReport.story} />
              <AdvisorReport
                report={advisorReport}
                recommendations={advisorReport.recommendations}
              />
            </div>
          ) : (
            <div className="rounded-[32px] border border-slate-800 bg-slate-900 p-8 text-slate-300 shadow-xl shadow-slate-950/20">
              <p className="text-lg font-semibold text-white">Ready to analyze</p>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                Enter your monthly financials above and click "Generate Report" to see a comprehensive analysis with projections, leak detection, and personalized recommendations.
              </p>
            </div>
          )}
        </>
      )}

      {activeTab === "upload" && (
        <UploadTransactions apiClient={api} onUploadSuccess={handleUploadSuccess} />
      )}

      {error && <ErrorMessage message={error} />}
    </div>
  );
}

export default Advisor;
