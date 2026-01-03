"use client";

import { useState, useEffect } from "react";
import {GitHubCalendar} from "react-github-calendar";
import { useSelector } from "react-redux";

function ContributionSkeleton({ theme }) {
  return (
    <div
      className={`rounded-xl border p-6 animate-pulse ${
        theme === "dark" ? "bg-black border-slate-700" : "bg-white border-slate-300"
      }`}
    >
      <div className="h-6 w-48 rounded bg-slate-500 mb-4" />
      <div className="grid grid-cols-14 gap-1">
        {Array.from({ length: 98 }).map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded ${
              theme === "dark" ? "bg-slate-800" : "bg-slate-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function ContributionFallback({ theme }) {
  return (
    <div
      className={`rounded-xl border p-6 ${
        theme === "dark" ? "bg-black border-slate-700" : "bg-white border-slate-300"
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className={`text-lg font-semibold ${theme === "dark" ? "text-white" : "text-black"}`}>
          Contribution Activity
        </h2>
      </div>
      <div className="grid grid-cols-14 gap-1">
        {Array.from({ length: 98 }).map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded ${
              theme === "dark" ? "bg-slate-800" : "bg-slate-200"
            }`}
          />
        ))}
      </div>
      <p className="mt-2 text-sm text-gray-500 dark:text-slate-400">
        No contributions in this year
      </p>
    </div>
  );
}

export default function ContributionGraph({ username, loading }) {
  const theme = useSelector((state) => state.theme.theme);
  const [mounted, setMounted] = useState(false);
  const [years, setYears] = useState([]);
  const [year, setYear] = useState("");
  const [hasData, setHasData] = useState(true);

  useEffect(() => setMounted(true), []);

  // Fetch available years from GitHub (recent 2-3 years for simplicity)
  useEffect(() => {
    if (!username) return;

    const fetchYears = async () => {
      try {
        const res = await fetch(`https://api.github.com/users/${username}`);
        const data = await res.json();
        const createdYear = new Date(data.created_at).getFullYear();
        const currentYear = new Date().getFullYear();

        const userYears = [];
        for (let y = currentYear; y >= createdYear; y--) userYears.push(y);

        setYears(userYears);
        setYear(String(userYears[0])); // default to latest year
      } catch (err) {
        console.error("Error fetching GitHub user:", err);
        setYears([new Date().getFullYear()]); // fallback
        setYear(String(new Date().getFullYear()));
      }
    };

    fetchYears();
  }, [username]);

  if (!mounted || loading || !username || years.length === 0) {
    return <ContributionSkeleton theme={theme} />;
  }

  return (
    <div
      className={`rounded-xl border p-6 transition-colors ${
        theme === "dark" ? "bg-black border-slate-700" : "bg-white border-slate-300"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className={`text-lg font-semibold ${theme === "dark" ? "text-white" : "text-black"}`}>
          Contribution Activity
        </h2>

        <select
          value={year}
          onChange={(e) => {
            setYear(e.target.value);
            setHasData(true);
          }}
          className={`text-sm rounded-md px-2 py-1 border ${
            theme === "dark"
              ? "bg-black border-slate-700 text-white"
              : "bg-white border-slate-300 text-black"
          }`}
        >
          {years.map((y) => (
            <option key={y} value={String(y)}>
              {y}
            </option>
          ))}
        </select>
      </div>

      {/* Calendar or Fallback */}
      <div className="max-w-screen md:pl-2 overflow-x-auto">
        {hasData ? (
          <GitHubCalendar
            username={username}
            year={year}
            blockSize={14}
            blockMargin={4}
            fontSize={14}
            colorScheme={theme === "dark" ? "dark" : "light"}
            onDataLoad={(data) => {
              if (!data || data.length === 0) {
                setHasData(false);
              }
            }}
            theme={{
              light: ["#ebf2ff", "#c7d2fe", "#93c5fd", "#60a5fa", "#2563eb"],
              dark: ["#0d1117", "#1e3a8a", "#1d4ed8", "#2563eb", "#3b82f6"],
            }}
          />
        ) : (
          <ContributionFallback theme={theme} />
        )}
      </div>

      <p className="mt-3 text-xs text-slate-500">
        Hover on a day to see contributions · Powered by GitHub
      </p>
    </div>
  );
}
