"use client";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function LanguageStats({ data, loading }) {
  // ✅ Get theme from Redux
  const theme = useSelector((state) => state.theme.theme);
  const isDark = theme === "dark";

  // ✅ Prevent SSR hydration mismatch
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  /* 🔹 Loading Skeleton */
  if (loading) {
    return (
      <div
        className={`rounded-xl p-6 border animate-pulse transition-colors duration-500 ${
          isDark ? "bg-black border-slate-700" : "bg-white border-gray-300"
        }`}
      >
        <div
          className={`h-5 w-44 rounded mb-4 ${
            isDark ? "bg-slate-700" : "bg-gray-300"
          }`}
        />

        {/* Progress bar skeleton */}
        <div
          className={`h-4 rounded-full mb-4 ${
            isDark ? "bg-slate-700" : "bg-gray-300"
          }`}
        />

        {/* List skeleton */}
        <div className="grid grid-cols-2 gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <div
                className={`w-3 h-3 rounded-full ${
                  isDark ? "bg-slate-700" : "bg-gray-300"
                }`}
              />
              <div
                className={`h-4 w-20 rounded ${
                  isDark ? "bg-slate-700" : "bg-gray-300"
                }`}
              />
              <div
                className={`ml-auto h-4 w-10 rounded ${
                  isDark ? "bg-slate-700" : "bg-gray-300"
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  /* 🔹 Empty safety */
  if (!data || Object.keys(data).length === 0) return null;

  const total = Object.values(data).reduce((a, b) => a + b, 0);

  const getColor = (lang) => {
    const colors = {
      JavaScript: "#f1e05a",
      TypeScript: "#3178c6",
      Python: "#3572A5",
      Java: "#b07219",
      Rust: "#dea584",
      Go: "#00ADD8",
      CSS: "#563d7c",
      HTML: "#e34c26",
      Ruby: "#701516",
      PHP: "#4F5D95",
      C: "#555555",
      "C++": "#f34b7d",
      "C#": "#178600",
      Swift: "#ffac45",
      Kotlin: "#A97BFF",
      Dart: "#00B4AB",
    };
    return colors[lang] || "#8b949e";
  };

  return (
    <div
      className={`rounded-xl p-6 border transition-colors duration-500 ${
        isDark ? "bg-black border-slate-700" : "bg-white border-gray-300"
      }`}
    >
      <h3
        className={`text-lg font-semibold mb-4 ${
          isDark ? "text-white" : "text-gray-900"
        }`}
      >
        Most Used Languages
      </h3>

      {/* Progress bar */}
      <div className="h-4 rounded-full overflow-hidden flex mb-4">
        {Object.entries(data).map(([lang, bytes]) => (
          <div
            key={lang}
            style={{
              width: `${((bytes / total) * 100).toFixed(1)}%`,
              backgroundColor: getColor(lang),
            }}
          />
        ))}
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-2">
        {Object.entries(data).map(([lang, bytes]) => (
          <div
            key={lang}
            className={`flex items-center gap-2 text-sm ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: getColor(lang) }}
            />
            <span>{lang}</span>
            <span className={`ml-auto ${isDark ? "text-slate-400" : "text-gray-500"}`}>
              {((bytes / total) * 100).toFixed(1)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
