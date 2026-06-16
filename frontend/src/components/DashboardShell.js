import React from "react";

function DashboardShell({ children, theme }) {
  const themeLabel = theme === "light" ? "Light mode enabled" : "Dark mode enabled";

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-sky-400">FinSight AI</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Fintech dashboard
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
              Business-grade financial analytics with AI-powered insights and live spending trends.
            </p>
          </div>
          <div className="rounded-3xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-slate-400 shadow-xl shadow-slate-950/20">
            {themeLabel}
          </div>
        </header>

        <div className="space-y-6">{children}</div>
      </div>
    </div>
  );
}

export default DashboardShell;
