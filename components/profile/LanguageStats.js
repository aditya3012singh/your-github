"use client";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function LanguageStats({ data, loading, username }) {
  const theme = useSelector((state) => state.theme.theme);
  const isDark = theme === "dark";

  const [mounted, setMounted] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    setMounted(true);
    setTimeout(() => setAnimate(true), 150);
  }, []);

  if (!mounted) return null;

  /* -------------------- SKELETON -------------------- */
  if (loading) {
    return (
      <div
        className={`rounded-xl p-6 border animate-pulse ${
          isDark ? "bg-black border-slate-700" : "bg-white border-gray-300"
        }`}
      >
        <div className={`h-5 w-44 rounded mb-4 ${isDark ? "bg-slate-700" : "bg-gray-300"}`} />
        <div className={`h-4 rounded-full mb-4 ${isDark ? "bg-slate-700" : "bg-gray-300"}`} />
        <div className="grid grid-cols-2 gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className={`h-4 rounded ${isDark ? "bg-slate-700" : "bg-gray-300"}`}
            />
          ))}
        </div>
      </div>
    );
  }

  /* -------------------- DATA NORMALIZATION -------------------- */
  if (!data || typeof data !== "object") return null;

  const entries = Object.entries(data)
    .filter(([, bytes]) => typeof bytes === "number" && bytes > 0)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);

  if (entries.length === 0) return null;

  const total = entries.reduce((sum, [, bytes]) => sum + bytes, 0);

  /* -------------------- COLORS -------------------- */
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

  const openGitHubLang = (lang) => {
    if (!username) return;
    window.open(
      `https://github.com/${username}?tab=repositories&language=${encodeURIComponent(lang)}`,
      "_blank"
    );
  };

  /* -------------------- UI -------------------- */
  return (
    <div
      className={` rounded-xl p-6 border transition-colors ${
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

      {/* 🔥 Animated Progress Bar */}
      <div className="h-4 rounded-full overflow-hidden flex mb-4">
        {entries.map(([lang, bytes]) => {
          const percent = ((bytes / total) * 100).toFixed(1);
          return (
            <div
              key={lang}
              onMouseEnter={() => setHovered(lang)}
              onMouseLeave={() => setHovered(null)}
              style={{
                width: animate ? `${percent}%` : "0%",
                backgroundColor: getColor(lang),
                transition: "width 1s ease",
              }}
              className="relative"
            >
              {hovered === lang && (
                <div
                  className={`absolute -top-9 left-1/2 -translate-x-1/2 text-xs px-2 py-1 rounded shadow ${
                    isDark ? "bg-slate-800 text-white" : "bg-black text-white"
                  }`}
                >
                  {lang} · {percent}%
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 📊 Legend */}
      <div className="grid grid-cols-2 gap-2">
        {entries.map(([lang, bytes]) => {
          const percent = ((bytes / total) * 100).toFixed(1);
          return (
            <div
              key={lang}
              onClick={() => openGitHubLang(lang)}
              onMouseEnter={() => setHovered(lang)}
              onMouseLeave={() => setHovered(null)}
              className={`flex items-center gap-2 text-sm cursor-pointer transition hover:opacity-100 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: getColor(lang) }}
              />
              <span>{lang}</span>
              <span className={`ml-auto ${isDark ? "text-slate-400" : "text-gray-500"}`}>
                {percent}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
