import React from "react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

function TrendLineChart({ monthlyTrend }) {
  return (
    <section className="rounded-[32px] border border-slate-800 bg-slate-900 p-6 shadow-xl shadow-slate-950/20">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">Monthly spending</h2>
          <p className="text-sm text-slate-400">Trends over time</p>
        </div>
      </div>
      <div className="h-[360px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={monthlyTrend || []} margin={{ top: 15, right: 20, bottom: 5, left: 0 }}>
            <CartesianGrid stroke="#334155" strokeDasharray="3 3" />
            <XAxis dataKey="month" stroke="#94a3b8" tick={{ fontSize: 12 }} />
            <YAxis stroke="#94a3b8" tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                background: "#0f172a",
                border: "1px solid #334155",
                color: "#fff",
              }}
            />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#38bdf8"
              strokeWidth={4}
              dot={{ r: 4, fill: "#38bdf8" }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

export default TrendLineChart;
