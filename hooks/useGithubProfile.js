"use client";

import { useState } from "react";

export function useGithubProfile() {
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadProfile = async (username) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/github/${username}`);

      if (!res.ok) {
        throw new Error("User not found");
      }

      const data = await res.json();
      setProfile(data.user);
      setRepos(data.repos);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    profile,
    repos,
    loading,
    error,
    loadProfile,
  };
}
