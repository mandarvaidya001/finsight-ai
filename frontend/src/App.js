import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import DashboardShell from "./components/DashboardShell";
import ThemeToggle from "./components/ThemeToggle";
import Home from "./pages/Home";
import Advisor from "./pages/Advisor";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  timeout: 10000,
});

function App() {
  const [theme, setTheme] = useState(() => {
    try {
      return window.localStorage.getItem("theme") || "dark";
    } catch (e) {
      return "dark";
    }
  });

  const handleThemeToggle = (nextTheme) => {
    setTheme(nextTheme);
  };

  // Sync theme to document root and persist to localStorage
  useEffect(() => {
    try {
      const root = document.documentElement;
      if (theme === "dark") {
        root.classList.add("dark");
        root.classList.remove("light-theme");
      } else {
        root.classList.remove("dark");
        root.classList.add("light-theme");
      }
      window.localStorage.setItem("theme", theme);
    } catch (e) {
      // ignore (e.g., during SSR)
    }
  }, [theme]);

  return (
    <Router>
      <DashboardShell theme={theme}>
        <div className="grid gap-4 xl:grid-cols-[1fr_auto]">
          <div className="flex flex-wrap gap-2">
            <a
              href="/"
              className="rounded-3xl border border-slate-700 bg-slate-950 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:border-slate-600 hover:text-white"
            >
              Home
            </a>
            <a
              href="/advisor"
              className="rounded-3xl border border-slate-700 bg-slate-950 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:border-slate-600 hover:text-white"
            >
              Personal Advisor
            </a>
          </div>
          <ThemeToggle theme={theme} onToggle={handleThemeToggle} />
        </div>

        <Routes>
          <Route path="/" element={<Home api={api} theme={theme} />} />
          <Route path="/advisor" element={<Advisor api={api} />} />
        </Routes>
      </DashboardShell>
    </Router>
  );
}

export default App;
