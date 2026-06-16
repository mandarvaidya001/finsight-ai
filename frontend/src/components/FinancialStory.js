import React from "react";

function FinancialStory({ story }) {
  if (!story || story.length === 0) return null;

  return (
    <section className="rounded-[32px] border border-slate-800 bg-slate-900 p-6 shadow-xl shadow-slate-950/20">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-white">Financial story</h2>
        <p className="text-sm text-slate-400">A premium narrative of your financial positioning.</p>
      </div>
      <div className="space-y-4 text-sm text-slate-300">
        {story.map((line, idx) => (
          <p key={idx} className="rounded-3xl border border-slate-800 bg-slate-950 p-4 leading-6">
            {line}
          </p>
        ))}
      </div>
    </section>
  );
}

export default FinancialStory;
