"use client";

import { Star, GitFork } from "lucide-react";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

/* 🔹 Skeleton Card */
function RepoSkeleton({ isDark }) {
  return (
    <div
      className={`rounded-lg p-4 animate-pulse transition-colors duration-500 ${
        isDark ? "bg-black border border-slate-700" : "bg-white border-gray-300"
      }`}
    >
      <div
        className={`h-4 w-32 rounded mb-2 ${
          isDark ? "bg-slate-700" : "bg-gray-300"
        }`}
      />
      <div
        className={`h-3 w-full rounded mb-1 ${
          isDark ? "bg-slate-700" : "bg-gray-300"
        }`}
      />
      <div
        className={`h-3 w-3/4 rounded mb-3 ${
          isDark ? "bg-slate-700" : "bg-gray-300"
        }`}
      />
      <div className="flex items-center gap-4">
        <div
          className={`h-3 w-14 rounded ${
            isDark ? "bg-slate-700" : "bg-gray-300"
          }`}
        />
        <div
          className={`h-3 w-10 rounded ${
            isDark ? "bg-slate-700" : "bg-gray-300"
          }`}
        />
        <div
          className={`h-3 w-10 rounded ${
            isDark ? "bg-slate-700" : "bg-gray-300"
          }`}
        />
      </div>
    </div>
  );
}

export default function RepoList({ repos, loading }) {
  const theme = useSelector((state) => state.theme.theme);
  const isDark = theme === "dark";

  // Hydration-safe
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  /* 🔹 Loading State */
  if (loading) {
    return (
      <div
        className={` rounded-xl p-6 transition-colors duration-500 ${
          isDark ? "bg-black border border-slate-700" : "bg-white border-gray-300"
        }`}
      >
        <div
          className={`h-5 w-40 rounded mb-4 ${
            isDark ? "bg-slate-700" : "bg-gray-300"
          } animate-pulse`}
        />
        <div className="grid md:grid-cols-2 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <RepoSkeleton key={i} isDark={isDark} />
          ))}
        </div>
      </div>
    );
  }

  if (!repos || repos.length === 0) return null;

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
      className={`rounded-xl border p-6 transition-colors duration-500 ${
        isDark ? "bg-black border border-slate-700 text-slate-400" : "bg-white border-gray-300 text-gray-900"
      }`}
    >
      <h3 className={`text-lg font-semibold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
        Top Repositories
      </h3>

      <div className="grid md:grid-cols-2 gap-4">
        {repos.map((repo) => (
          <a
            key={repo.id}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className={`rounded-lg p-4 border transition-colors duration-300 hover:shadow ${
              isDark
                ? "border-slate-700 hover:bg-slate-950 hover:border-slate-600"
                : "border-gray-300 hover:bg-gray-100 hover:border-gray-400"
            }`}
          >
            <h4 className={isDark ? "font-medium text-blue-400" : "font-medium text-blue-600"}>
              {repo.name}
            </h4>

            {repo.description && (
              <p className={`text-sm line-clamp-2 ${isDark ? "text-slate-400" : "text-gray-700"}`}>
                {repo.description}
              </p>
            )}

            <div className={`flex items-center gap-4 text-xs mt-2 ${isDark ? "text-slate-500" : "text-gray-500"}`}>
              {repo.language && (
                <div className="flex items-center gap-1">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: getColor(repo.language) }}
                  />
                  {repo.language}
                </div>
              )}

              <div className="flex items-center gap-1">
                <Star className="w-3 h-3" />
                {repo.stargazers_count}
              </div>

              <div className="flex items-center gap-1">
                <GitFork className="w-3 h-3" />
                {repo.forks_count}
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
