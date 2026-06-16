import React from "react";

function KpiCard({ label, value, subtext, accent }) {
  return (
    <div className="rounded-[28px] border border-slate-800 bg-slate-900 px-6 py-5 shadow-xl shadow-slate-950/20 transition hover:border-sky-400/40">
      <p className="text-sm font-medium uppercase tracking-[0.28em] text-slate-400">
        {label}
      </p>
      <p className="mt-4 text-3xl font-semibold text-white">{value}</p>
      <p className="mt-3 text-sm text-slate-400">{subtext}</p>
      {accent && <div className="mt-4 h-1 rounded-full bg-sky-400/60" />}
    </div>
  );
}

function KpiGrid({ summary, healthScore }) {
  return (
    <div className="grid gap-6 lg:grid-cols-4">
      <KpiCard
        label="Total Income"
        value={`₹${summary.total_income.toLocaleString()}`}
        subtext="All credit transactions"
        accent
      />
      <KpiCard
        label="Total Spending"
        value={`₹${summary.total_spending.toLocaleString()}`}
        subtext="All debit transactions"
      />
      <KpiCard
        label="Net Savings"
        value={`₹${summary.net_savings.toLocaleString()}`}
        subtext="Income minus spending"
      />
      <KpiCard
        label="Health Score"
        value={`${healthScore.toFixed(1)}%`}
        subtext="Financial wellbeing indicator"
      />
    </div>
  );
}

export default KpiGrid;
