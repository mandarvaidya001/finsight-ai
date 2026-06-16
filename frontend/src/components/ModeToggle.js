import React from "react";

function ModeToggle({ mode, onChange }) {
  return (
    <div className="flex flex-col gap-3 rounded-[32px] border border-slate-800 bg-slate-900 p-4 shadow-xl shadow-slate-950/20 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-400">
          Mode
        </p>
        <p className="mt-2 text-sm text-slate-400">
          Switch between demo analytics and personal finance advisor.
        </p>
      </div>
      <div className="flex flex-wrap gap-2 sm:gap-3">
        {[
          { key: "demo", label: "Demo Analytics" },
          { key: "advisor", label: "Personal Advisor" },
        ].map((option) => (
          <button
            key={option.key}
            type="button"
            onClick={() => onChange(option.key)}
            className={`rounded-3xl px-4 py-2 text-sm font-semibold transition ${
              mode === option.key
                ? "bg-sky-500 text-slate-950 shadow-lg shadow-sky-500/20"
                : "border border-slate-700 bg-slate-950 text-slate-300 hover:border-slate-600 hover:text-white"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ModeToggle;
