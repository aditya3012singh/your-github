"use client";

import { Users, FolderGit2, GitFork, Star } from "lucide-react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

/* 🔹 Skeleton Card */
function StatSkeleton({ isDark }) {
  return (
    <div
      className={` rounded-xl p-4 animate-pulse transition-colors duration-500 ${
        isDark ? "bg-black border border-slate-700" : "bg-white border-gray-300"
      }`}
    >
      <div
        className={`w-5 h-5 rounded mb-3 ${
          isDark ? "bg-slate-700" : "bg-gray-300"
        }`}
      />
      <div
        className={`h-6 w-16 rounded mb-2 ${
          isDark ? "bg-slate-700" : "bg-gray-300"
        }`}
      />
      <div
        className={`h-3 w-20 rounded ${
          isDark ? "bg-slate-700" : "bg-gray-300"
        }`}
      />
    </div>
  );
}

export default function StatsGrid({ profile, repos = [], loading }) {
  const theme = useSelector((state) => state.theme.theme);
  const isDark = theme === "dark";

  // Hydration-safe
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  /* 🔹 Loading Skeletons */
  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <StatSkeleton key={i} isDark={isDark} />
        ))}
      </div>
    );
  }

  if (!profile) return null;

  const totalStars = repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0);
  const totalForks = repos.reduce((sum, r) => sum + (r.forks_count || 0), 0);

  const items = [
    { label: "Followers", value: profile.followers, icon: Users },
    { label: "Following", value: profile.following, icon: Users },
    { label: "Repos", value: profile.public_repos, icon: FolderGit2 },
    { label: "Stars", value: totalStars, icon: Star },
    { label: "Forks", value: totalForks, icon: GitFork },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
      {items.map(({ label, value, icon: Icon }) => (
        <div
          key={label}
          className={`rounded-xl p-4 transition-colors duration-500 hover:shadow ${
            isDark
              ? "bg-black border border-slate-700 hover:border-slate-600 text-slate-300"
              : "bg-white border border-gray-300 hover:border-gray-400 text-gray-900"
          }`}
        >
          <Icon className={`w-5 h-5 mb-2 ${isDark ? "text-slate-300" : "text-gray-600"}`} />
          <p className="text-xl font-bold">{Number(value || 0).toLocaleString()}</p>
          <p className={`text-sm ${isDark ? "text-slate-400" : "text-gray-500"}`}>{label}</p>
        </div>
      ))}
    </div>
  );
}
