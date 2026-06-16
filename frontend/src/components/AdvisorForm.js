import React from "react";

const categories = [
  { key: "food", label: "Food" },
  { key: "shopping", label: "Shopping" },
  { key: "transport", label: "Transport" },
  { key: "utilities", label: "Utilities" },
  { key: "entertainment", label: "Entertainment" },
  { key: "healthcare", label: "Healthcare" },
  { key: "other", label: "Other expenses" },
];

function AdvisorForm({ values, onChange, onSubmit }) {
  return (
    <section className="rounded-[32px] border border-slate-800 bg-slate-900 p-6 shadow-xl shadow-slate-950/20">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-white">Personal finance advisor</h2>
        <p className="text-sm text-slate-400">Enter your monthly income and expense values to generate a custom report.</p>
      </div>
      <form className="space-y-6" onSubmit={onSubmit}>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-300">Monthly income</span>
            <input
              name="income"
              type="number"
              min="0"
              value={values.income}
              onChange={onChange}
              className="w-full rounded-3xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-400/70"
              placeholder="₹ 0"
            />
          </label>
          {categories.map((category) => (
            <label key={category.key} className="space-y-2">
              <span className="text-sm font-medium text-slate-300">{category.label}</span>
              <input
                name={category.key}
                type="number"
                min="0"
                value={values[category.key]}
                onChange={onChange}
                className="w-full rounded-3xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-400/70"
                placeholder="₹ 0"
              />
            </label>
          ))}
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="rounded-3xl bg-sky-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-400"
          >
            Generate report
          </button>
        </div>
      </form>
    </section>
  );
}

export default AdvisorForm;
