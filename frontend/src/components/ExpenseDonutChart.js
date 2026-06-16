import React from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = ["#38bdf8", "#60a5fa", "#818cf8", "#a78bfa", "#f472b6", "#f59e0b", "#22c55e"];

function CustomTooltip({ active, payload }) {
  if (!active || !payload || payload.length === 0) return null;
  const entry = payload[0].payload;

  return (
    <div className="rounded-3xl border border-slate-700 bg-slate-950 p-4 text-sm text-slate-100 shadow-xl shadow-slate-950/40">
      <div className="font-semibold text-white">{entry.name}</div>
      <div className="mt-2 text-slate-400">Amount: ₹{entry.amount.toLocaleString()}</div>
      <div className="text-slate-400">Share: {entry.percentage.toFixed(1)}%</div>
    </div>
  );
}

function ExpenseDonutChart({ data }) {
  const chartData = data || [];

  return (
    <section className="rounded-[32px] border border-slate-800 bg-slate-900 p-6 shadow-xl shadow-slate-950/20">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-white">Expense distribution</h2>
          <p className="text-sm text-slate-400">Visualize your spending by category.</p>
        </div>
      </div>
      <div className="h-[360px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={140}
              paddingAngle={4}
              startAngle={90}
              endAngle={-270}
            >
              {chartData.map((entry, index) => (
                <Cell key={`slice-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {chartData.map((item, idx) => (
          <div key={idx} className="rounded-3xl border border-slate-800 bg-slate-950 p-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs uppercase tracking-[0.2em] text-slate-400">Category</span>
                <span className="h-3 w-3 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
              </div>
              <p className="text-sm font-semibold text-white">{item.name}</p>
            </div>
            <p className="mt-4 text-2xl font-semibold text-white">₹{item.amount.toLocaleString()}</p>
            <p className="text-sm text-slate-400">{item.percentage.toFixed(1)}% of income</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ExpenseDonutChart;
