import React from "react";

function ErrorMessage({ message }) {
  return (
    <div className="rounded-3xl border border-rose-500/30 bg-rose-500/5 p-6 text-slate-200 shadow-xl shadow-rose-900/10">
      <p className="text-sm font-semibold text-rose-100">{message}</p>
    </div>
  );
}

export default ErrorMessage;
