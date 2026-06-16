import React from "react";

function AdvisorReport({ report }) {
  if (!report) {
    return null;
  }

  const overview = report.overview || report;
  const totalExpenses = overview.totalExpenses || 0;
  const netSavings = overview.netSavings || 0;
  const savingsRate = overview.savingsRate || 0;
  const healthScore = overview.healthScore || 0;
  const largestCategory = overview.largestCategory || "N/A";

  const rows = [
    { label: "Total expenses", value: `₹${totalExpenses.toLocaleString()}` },
    { label: "Net savings", value: `₹${netSavings.toLocaleString()}` },
    { label: "Savings rate", value: `${savingsRate.toFixed(1)}%` },
    { label: "Health score", value: `${healthScore.toFixed(1)}%` },
    { label: "Largest category", value: largestCategory },
  ];

  return (
    <section className="rounded-[32px] border border-slate-800 bg-slate-900 p-6 shadow-xl shadow-slate-950/20">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-white">Financial report</h2>
        <p className="text-sm text-slate-400">Personalized recommendations based on your monthly plan.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {rows.map((row) => (
          <div key={row.label} className="rounded-3xl border border-slate-800 bg-slate-950 p-5">
            <p className="text-sm text-slate-400">{row.label}</p>
            <p className="mt-2 text-xl font-semibold text-white">{row.value}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-800 bg-slate-950 p-5">
          <h3 className="text-sm font-semibold text-white">Savings recommendations</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-300">
            {report.recommendations.map((rec, idx) => (
              <li key={idx} className="list-disc pl-5 leading-6">
                {rec}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl border border-slate-800 bg-slate-950 p-5">
          <h3 className="text-sm font-semibold text-white">Money leak detection</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-300">
            {(report.leaks || []).map((leak, idx) => (
              <li key={idx} className="list-disc pl-5 leading-6">
                {leak.name ? `${leak.name}: ${leak.risk} risk` : JSON.stringify(leak)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default AdvisorReport;
