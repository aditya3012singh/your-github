"use client";

import { useEffect, useRef, useState } from "react";
import { GitHubCalendar } from "react-github-calendar";
import { useSelector } from "react-redux";

const YEARS = [
  new Date().getFullYear(),
  new Date().getFullYear() - 1,
  new Date().getFullYear() - 2,
];

function ContributionSkeleton({ theme }) {
  return (
    <div
      className={`rounded-xl border p-6 animate-pulse ${
        theme === "dark"
          ? "bg-black border-slate-700"
          : "bg-white border-slate-300"
      }`}
    >
      <div className="h-4 w-48 rounded bg-slate-500 mb-4" />
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

export default function ContributionGraph({ username, loading }) {
  const theme = useSelector((state) => state.theme.theme);

  const [mounted, setMounted] = useState(false);
  const [year, setYear] = useState(YEARS[0]);
  const [total, setTotal] = useState(0);
  const [hasData, setHasData] = useState(true);

  // refs (safe during render)
  const totalRef = useRef(0);
  const hasDataRef = useRef(true);

  useEffect(() => setMounted(true), []);

  // sync refs → state AFTER render
  useEffect(() => {
    setTotal(totalRef.current);
    setHasData(hasDataRef.current);
  }, [year]);

  if (!mounted || loading || !username) {
    return <ContributionSkeleton theme={theme} />;
  }

  return (
    <div
      className={` rounded-xl border p-6 transition-colors ${
        theme === "dark"
          ? "bg-black border-slate-700"
          : "bg-white border-slate-300"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2
          className={`text-lg font-semibold ${
            theme === "dark" ? "text-white" : "text-black"
          }`}
        >
          Contribution Activity
        </h2>

        <select
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          className={`text-sm rounded-md px-2 py-1 border ${
            theme === "dark"
              ? "bg-black border-slate-700 text-white"
              : "bg-white border-slate-300 text-black"
          }`}
        >
          {YEARS.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>

      {/* Total */}
      <p
        className={`mb-3 text-sm ${
          theme === "dark" ? "text-slate-400" : "text-gray-600"
        }`}
      >
        {hasData
          ? `${total.toLocaleString()} contributions in ${year}`
          : `No contributions in ${year}`}
      </p>

      {/* Calendar */}
      {hasData ? (
        <div className="max-w-screen md:pl-10 ">
          <GitHubCalendar
            username={username}
            year={year}
            blockSize={14}
            blockMargin={4}
            fontSize={14}
            colorScheme={theme === "dark" ? "dark" : "light"}
            transformData={(data) => {
              if (!data || data.length === 0) {
                hasDataRef.current = false;
                totalRef.current = 0;
                return [];
              }

              hasDataRef.current = true;
              totalRef.current = data.reduce((sum, d) => sum + d.count, 0);
              return data;
            }}
            theme={{
              light: [
                "#ebf2ff",
                "#c7d2fe",
                "#93c5fd",
                "#60a5fa",
                "#2563eb",
              ],
              dark: [
                "#0d1117",
                "#1e3a8a",
                "#1d4ed8",
                "#2563eb",
                "#3b82f6",
              ],
            }}
          />
        </div>
      ) : (
        <div
          className={`h-32 flex items-center justify-center rounded ${
            theme === "dark" ? "text-slate-400" : "text-gray-500"
          }`}
        >
          No contribution data available for {year}
        </div>
      )}

      <p className="mt-3 text-xs text-slate-500">
        Hover on a day to see contributions · Powered by GitHub
      </p>
    </div>
  );
}
