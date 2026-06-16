import React from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

function SavingsBarChart({ income, expenses, savings }) {
  const chartData = [
    { name: "Income", value: income, fill: "#38bdf8" },
    { name: "Expenses", value: expenses, fill: "#f97316" },
    { name: "Savings", value: savings, fill: "#22c55e" },
  ];

  return (
    <section className="rounded-[32px] border border-slate-800 bg-slate-900 p-6 shadow-xl shadow-slate-950/20">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-white">Savings vs expenses</h2>
        <p className="text-sm text-slate-400">Compare your income, spending, and savings at a glance.</p>
      </div>
      <div className="h-[340px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} layout="vertical" margin={{ top: 20, right: 24, left: 24, bottom: 20 }}>
            <CartesianGrid stroke="#334155" strokeDasharray="3 3" />
            <XAxis type="number" stroke="#94a3b8" tick={{ fontSize: 12 }} />
            <YAxis type="category" dataKey="name" stroke="#94a3b8" tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{ background: "#0f172a", border: "1px solid #334155", color: "#fff" }}
            />
            <Bar dataKey="value" radius={[10, 10, 10, 10]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

export default SavingsBarChart;
