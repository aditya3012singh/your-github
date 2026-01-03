"use client";
import { useCallback, useState } from "react";

export function useGithubProfile() {
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadProfile = useCallback(async (username) => {
    if (!username) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/github/${username}`);

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to fetch profile");
      }

      const data = await res.json();
      setProfile(data.user);
      setRepos(Array.isArray(data.repos) ? data.repos : []);
    } catch (err) {
      setError(err.message);
      setProfile(null);
      setRepos([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return { profile, repos, loading, error, loadProfile };
}
