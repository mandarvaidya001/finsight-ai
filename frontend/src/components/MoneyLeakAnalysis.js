import React from "react";

function MoneyLeakAnalysis({ leaks }) {
  return (
    <section className="rounded-[32px] border border-slate-800 bg-slate-900 p-6 shadow-xl shadow-slate-950/20">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-white">Money leak analysis</h2>
        <p className="text-sm text-slate-400">Risk-based spending review for each category.</p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-y-3">
          <thead>
            <tr className="text-left text-sm uppercase tracking-[0.24em] text-slate-500">
              <th className="pb-3">Category</th>
              <th className="pb-3">Amount</th>
              <th className="pb-3">% of income</th>
              <th className="pb-3">Risk</th>
            </tr>
          </thead>
          <tbody>
            {leaks.map((item) => (
              <tr key={item.key} className="rounded-[24px] border border-slate-800 bg-slate-950">
                <td className="px-4 py-4 text-sm text-white">{item.name}</td>
                <td className="px-4 py-4 text-sm text-slate-300">₹{item.amount.toLocaleString()}</td>
                <td className="px-4 py-4 text-sm text-slate-300">{item.percentage.toFixed(1)}%</td>
                <td className="px-4 py-4">
                  <span className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${item.badgeClass}`}>
                    {item.risk}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default MoneyLeakAnalysis;
