"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import ContributionGraph from "@/components/profile/ContributionGraph";
import ProfileCard from "@/components/profile/ProfileCard";
import RepoList from "@/components/profile/RepoList";
import StatsGrid from "@/components/profile/StatsGrid";
import { useGithubProfile } from "@/hooks/useGithubProfile";
import { useSearchParams } from "next/navigation";

export default function ProfilePage() {
  const params = useSearchParams();
  const username = params.get("user");

  const { profile, repos, loading, error, loadProfile } = useGithubProfile();

  // ✅ Prevent SSR hydration mismatch
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // 🔹 Load profile when username changes
  useEffect(() => {
    if (username) {
      loadProfile(username);
    }
  }, [username]);

  // 🔹 Read theme from Redux
  const theme = useSelector((state) => state.theme.theme);
  const isDark = theme === "dark";

  if (!mounted) return null;

  if (!username) {
    return (
      <p className={`${isDark ? "text-slate-300" : "text-gray-700"} text-center pt-20`}>
        No GitHub username provided
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-red-400 text-center pt-20">
        {error}
      </p>
    );
  }

  return (
    <div className={`md:m-8 transition-colors duration-500 ${isDark ? "=" : ""}`}>
      {/* 🔹 Header */}
      <div className={`pt-8 md:pt-0 mb-8 text-center transition-colors duration-500`}>
        {loading ? (
          <div className="space-y-3 flex flex-col items-center justify-center">
            <div className={`h-8 w-72 rounded mb-3 animate-pulse ${isDark ? "bg-slate-700" : "bg-gray-300"}`} />
            <div className={`h-4 w-96 rounded animate-pulse ${isDark ? "bg-slate-700" : "bg-gray-300"}`} />
          </div>
        ) : (
          <>
            <h1 className={`${isDark ? "text-white" : "text-gray-900"} text-3xl md:text-4xl font-bold`}>
              GitHub Profile Overview
            </h1>

            <p className={`${isDark ? "text-slate-400" : "text-gray-700"} mt-2`}>
              Insights, repositories, and activity for{" "}
              <span className="text-blue-400 font-medium">
                @{profile?.login}
              </span>
            </p>
          </>
        )}
      </div>

      {/* 🔹 Main Content */}
      <div className="grid lg:grid-cols-3 gap-6">
        <ProfileCard profile={profile} loading={loading} theme={isDark ? "dark" : "light"} />

        <div className="lg:col-span-2 space-y-6">
          <StatsGrid profile={profile} repos={repos} loading={loading} theme={isDark ? "dark" : "light"} />
          <ContributionGraph username={profile?.login} loading={loading} theme={isDark ? "dark" : "light"} />
          <RepoList repos={repos.slice(0, 6)} loading={loading} theme={isDark ? "dark" : "light"} />
        </div>
      </div>
    </div>
  );
}
