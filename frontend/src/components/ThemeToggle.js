import React from "react";

function ThemeToggle({ theme, onToggle }) {
  return (
    <div className="flex items-center gap-3 rounded-3xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-slate-300 shadow-xl shadow-slate-950/20">
      <span className="font-medium text-slate-200">Theme</span>
      <button
        type="button"
        onClick={() => onToggle(theme === "dark" ? "light" : "dark")}
        className="rounded-full border border-slate-700 bg-slate-800 px-4 py-2 text-slate-100 transition hover:bg-slate-700"
      >
        {theme === "dark" ? "Switch to Light" : "Switch to Dark"}
      </button>
    </div>
  );
}

export default ThemeToggle;
