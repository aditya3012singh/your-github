"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useGithubProfile } from "@/hooks/useGithubProfile";

import ProfileCard from "@/components/profile/ProfileCard";
import StatsGrid from "@/components/profile/StatsGrid";
import RepoList from "@/components/profile/RepoList";


export default function ProfilePage() {
  const params = useSearchParams();
  const username = params.get("user");

  const { profile, repos, loading, error, loadProfile } =
    useGithubProfile();

  useEffect(() => {
    if (username) loadProfile(username);
  }, [username]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-400">{error}</p>;
  if (!profile) return null;

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <ProfileCard profile={profile} />

      <div className="lg:col-span-2 space-y-6">
        <StatsGrid profile={profile} repos={repos} />
        <RepoList repos={repos} />
      </div>
    </div>
  );
}
