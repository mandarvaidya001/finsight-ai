import React from "react";
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const colors = ["#38bdf8", "#60a5fa", "#818cf8", "#a78bfa", "#f472b6"];

function CategoryPie({ categories }) {
  const pieData = (categories || []).map((item, index) => ({
    name: item.category,
    value: item.amount,
    fill: colors[index % colors.length],
  }));

  return (
    <section className="rounded-[32px] border border-slate-800 bg-slate-900 p-6 shadow-xl shadow-slate-950/20">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">Category spending</h2>
          <p className="text-sm text-slate-400">Top categories by expenditure</p>
        </div>
      </div>
      <div className="h-[360px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              innerRadius={70}
              outerRadius={120}
              dataKey="value"
              nameKey="name"
              paddingAngle={4}
              cornerRadius={16}
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: "#0f172a",
                border: "1px solid #334155",
                color: "#fff",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {pieData.map((row) => (
          <div
            key={row.name}
            className="rounded-3xl border border-slate-800 bg-slate-950 p-4"
          >
            <div className="flex items-center gap-3">
              <span
                className="h-3 w-3 rounded-full"
                style={{ background: row.fill }}
              />
              <p className="text-sm font-medium text-white">{row.name}</p>
            </div>
            <p className="mt-3 text-xl font-semibold text-white">
              ₹{row.value.toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CategoryPie;
