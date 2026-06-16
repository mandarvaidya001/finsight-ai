import React from "react";

function AnnualProjection({ projection }) {
  if (!projection) return null;

  const items = [
    { label: "Annual income", value: `₹${projection.annualIncome.toLocaleString()}` },
    { label: "Annual expenses", value: `₹${projection.annualExpenses.toLocaleString()}` },
    { label: "Annual savings", value: `₹${projection.annualSavings.toLocaleString()}` },
  ];

  const trend = [
    { label: "3-year projection", value: projection.projection3, accent: "bg-sky-500" },
    { label: "5-year projection", value: projection.projection5, accent: "bg-emerald-500" },
  ];

  return (
    <section className="rounded-[32px] border border-slate-800 bg-slate-900 p-6 shadow-xl shadow-slate-950/20">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-white">Annual financial projection</h2>
        <p className="text-sm text-slate-400">See your wealth accumulation for the next 5 years.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {items.map((item) => (
          <div key={item.label} className="rounded-3xl border border-slate-800 bg-slate-950 p-5">
            <p className="text-sm text-slate-400">{item.label}</p>
            <p className="mt-3 text-xl font-semibold text-white">{item.value}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 space-y-4">
        {trend.map((item) => (
          <div key={item.label} className="rounded-3xl border border-slate-800 bg-slate-950 p-5">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm text-slate-300">{item.label}</p>
              <p className="text-xl font-semibold text-white">₹{item.value.toLocaleString()}</p>
            </div>
            <div className="mt-4 h-3 rounded-full bg-slate-800">
              <div className={`${item.accent} h-3 rounded-full`} style={{ width: "100%" }} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default AnnualProjection;
