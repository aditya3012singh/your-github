import {
  Users,
  FolderGit2,
  GitFork,
  Star,
} from "lucide-react";

export default function StatsGrid({ profile, repos }) {
  if (!profile || !Array.isArray(repos)) return null;

  const totalStars = repos.reduce(
    (sum, r) => sum + r.stargazers_count,
    0
  );

  const totalForks = repos.reduce(
    (sum, r) => sum + r.forks_count,
    0
  );

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
          className="bg-slate-800 rounded-xl p-4"
        >
          <Icon className="w-5 h-5 mb-2" />
          <p className="text-xl font-bold">
            {value.toLocaleString()}
          </p>
          <p className="text-sm text-slate-400">{label}</p>
        </div>
      ))}
    </div>
  );
}
