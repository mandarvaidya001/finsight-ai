import React from "react";

function InsightsPanel({ insights }) {
  return (
    <section className="rounded-[32px] border border-slate-800 bg-slate-900 p-6 shadow-xl shadow-slate-950/20">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">AI insights</h2>
          <p className="text-sm text-slate-400">Actionable recommendations from your finance data</p>
        </div>
      </div>
      <div className="space-y-4">
        {(insights || []).map((insight, index) => (
          <div
            key={index}
            className="rounded-3xl border border-slate-800 bg-slate-950 p-5"
          >
            <p className="text-sm leading-6 text-slate-200">{insight}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default InsightsPanel;
