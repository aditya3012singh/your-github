const GITHUB_API = "https://api.github.com";

export async function fetchUser(username) {
  const res = await fetch(`${GITHUB_API}/users/${username}`);
  if (!res.ok) throw new Error("User not found");
  return res.json();
}

export async function fetchRepos(username) {
  const res = await fetch(
    `${GITHUB_API}/users/${username}/repos?per_page=100&sort=stars`
  );
  if (!res.ok) throw new Error("Failed to fetch repos");
  return res.json();
}

export async function fetchLanguageStats(repos) {
  const stats= {};
  let total = 0;

  for (const repo of repos.slice(0, 20)) {
    const res = await fetch(repo.languages_url);
    const data = await res.json();

    for (const [lang, bytes] of Object.entries(data)) {
      stats[lang] = (stats[lang] || 0) + (bytes);
      total += bytes;
    }
  }

  return Object.entries(stats)
    .map(([lang, bytes]) => ({
      lang,
      percent: ((bytes / total) * 100).toFixed(1),
    }))
    .sort((a, b) => Number(b.percent) - Number(a.percent))
    .slice(0, 4);
}
