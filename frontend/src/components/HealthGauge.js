import React from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { getHealthStatus } from "../utils/advisorUtils";

function HealthGauge({ score }) {
  const segments = [
    { value: 40, color: "#ef4444" },
    { value: 20, color: "#f59e0b" },
    { value: 20, color: "#22c55e" },
    { value: 20, color: "#38bdf8" },
  ];

  const { label, color } = getHealthStatus(score);

  return (
    <section className="relative overflow-hidden rounded-[32px] border border-slate-800 bg-slate-900 p-6 shadow-xl shadow-slate-950/20">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-white">Financial health gauge</h2>
        <p className="text-sm text-slate-400">A professional view of your money fitness.</p>
      </div>
      <div className="flex flex-col items-center gap-6">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={segments}
                dataKey="value"
                startAngle={180}
                endAngle={0}
                innerRadius={95}
                outerRadius={135}
                paddingAngle={3}
              >
                {segments.map((entry, index) => (
                  <Cell key={`slice-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="absolute left-1/2 top-36 flex -translate-x-1/2 flex-col items-center">
          <div className="text-5xl font-semibold text-white">{score.toFixed(0)}%</div>
          <div className="mt-2 rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-slate-950/40" style={{ borderColor: color, borderWidth: 1, borderStyle: "solid" }}>
            {label}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HealthGauge;
