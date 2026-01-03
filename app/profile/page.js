"use client";

import { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "next/navigation";

import ContributionGraph from "@/components/profile/ContributionGraph";
import ProfileCard from "@/components/profile/ProfileCard";
import RepoList from "@/components/profile/RepoList";
import StatsGrid from "@/components/profile/StatsGrid";
import LanguageStats from "@/components/profile/LanguageStats";
import ActivityGraph from "@/components/profile/ActivityGraph";
import { useGithubProfile } from "@/hooks/useGithubProfile";

/* 🔹 Build language stats from repos */
function buildLanguageStats(repos = []) {
  const map = {};
  repos.forEach((repo) => {
    if (!repo?.language) return;
    const weight = repo.size || 1;
    map[repo.language] = (map[repo.language] || 0) + weight;
  });
  return map;
}

/* 🔹 Build activity data compatible with ActivityGraph */
function buildActivityData(repos = []) {
  return repos.map((repo) => ({
    day: repo.name,
    contributions: repo.size || 0,
  }));
}

export default function ProfilePage() {
  const params = useSearchParams();
  const username = params.get("user");

  const { profile, repos, loading, error, loadProfile } = useGithubProfile();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (username) loadProfile(username);
  }, [username, loadProfile]);

  const theme = useSelector((state) => state.theme.theme);
  const isDark = theme === "dark";

  const languageData = useMemo(() => buildLanguageStats(repos), [repos]);
  const activityData = useMemo(() => buildActivityData(repos), [repos]);

  if (!mounted) return null;

  if (!username) {
    return (
      <p className={`text-center pt-20 ${isDark ? "text-slate-300" : "text-gray-700"}`}>
        No GitHub username provided
      </p>
    );
  }

  if (error) {
    return <p className="text-red-400 text-center pt-20">{error}</p>;
  }

  return (
    <div className="p-4 md:p-8 transition-colors duration-500">
      {/* Header */}
      <div className="pt-8 mb-8 text-center">
        {loading ? (
          <div className="space-y-3 flex flex-col items-center">
            <div className={`h-8 w-72 rounded animate-pulse ${isDark ? "bg-slate-700" : "bg-gray-300"}`} />
            <div className={`h-4 w-96 rounded animate-pulse ${isDark ? "bg-slate-700" : "bg-gray-300"}`} />
          </div>
        ) : (
          <>
            <h1 className={`text-3xl md:text-4xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
              GitHub Profile Overview
            </h1>
            <p className={`mt-2 ${isDark ? "text-slate-400" : "text-gray-700"}`}>
              Insights, repositories, and activity for{" "}
              <span className="text-blue-400 font-medium">@{profile?.login}</span>
            </p>
          </>
        )}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="space-y-6 lg:col-span-1">
          <ProfileCard profile={profile} loading={loading} theme={isDark ? "dark" : "light"} />

          <LanguageStats data={languageData} loading={loading} username={profile?.login} />

          <ActivityGraph data={activityData} username={profile?.login} loading={loading} />
        </div>

        {/* Right column */}
        <div className="space-y-6 lg:col-span-2">
          <StatsGrid profile={profile} repos={repos} loading={loading} theme={isDark ? "dark" : "light"} />

          <ContributionGraph username={profile?.login} loading={loading} theme={isDark ? "dark" : "light"} />

          <RepoList repos={repos.slice(0, 6)} loading={loading} theme={isDark ? "dark" : "light"} />
        </div>
      </div>
    </div>
  );
}
