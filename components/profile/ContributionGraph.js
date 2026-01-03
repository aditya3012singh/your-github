"use client";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function ContributionGraph({ username, loading }) {
  // ✅ Get current theme from Redux
  const theme = useSelector((state) => state.theme.theme);
  const isDark = theme === "dark";

  // ✅ Prevent SSR hydration mismatch
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;

  if (!username && !loading) return null;

  /* 🔹 Loading Skeleton */
  if (loading) {
    return (
      <div
        className={`min-w-screen rounded-xl p-6 border animate-pulse transition-colors duration-500 ${
          isDark
            ? "bg-black border-slate-700"
            : "bg-white border-gray-300"
        }`}
      >
        <div
          className={`h-5 w-48 rounded mb-4 ${
            isDark ? "bg-slate-700" : "bg-gray-300"
          }`}
        />

        <div className="grid grid-cols-14 gap-1">
          {Array.from({ length: 98 }).map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-sm ${
                isDark ? "bg-slate-700" : "bg-gray-300"
              }`}
            />
          ))}
        </div>

        <div
          className={`flex justify-between mt-4 text-xs transition-colors duration-500 ${
            isDark ? "text-slate-500" : "text-gray-500"
          }`}
        >
          <span>Less</span>
          <div className="flex gap-1">
            <div className={`w-3 h-3 rounded-sm ${isDark ? "bg-slate-700" : "bg-gray-300"}`} />
            <div className={`w-3 h-3 rounded-sm ${isDark ? "bg-slate-600" : "bg-gray-400"}`} />
            <div className={`w-3 h-3 rounded-sm ${isDark ? "bg-slate-500" : "bg-gray-500"}`} />
            <div className={`w-3 h-3 rounded-sm ${isDark ? "bg-slate-400" : "bg-gray-600"}`} />
          </div>
          <span>More</span>
        </div>
      </div>
    );
  }

  /* 🔹 Placeholder (until GraphQL integration) */
  return (
    <div
      className={`rounded-xl p-6 text-center border transition-colors duration-500 ${
        isDark ? "bg-black border-slate-700" : "bg-white border-gray-300"
      }`}
    >
      <h3
        className={`text-lg font-semibold mb-4 ${
          isDark ? "text-white" : "text-gray-900"
        }`}
      >
        Contribution Graph
      </h3>

      <p className={`text-sm ${isDark ? "text-slate-400" : "text-gray-600"}`}>
        Contribution graph will load here via GitHub GraphQL API.
      </p>
    </div>
  );
}
