import { Star, GitFork } from "lucide-react";

export default function RepoList({ repos }) {
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
    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-4">Top Repositories</h3>

      <div className="grid md:grid-cols-2 gap-4">
        {repos.map((repo) => (
          <a
            key={repo.id}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-slate-900/50 border border-slate-700 rounded-lg p-4 hover:border-slate-600 transition"
          >
            <h4 className="font-medium text-blue-400">{repo.name}</h4>
            {repo.description && <p className="text-sm text-slate-400">{repo.description}</p>}

            <div className="flex items-center gap-4 text-xs text-slate-500 mt-2">
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
                <Star className="w-3 h-3" /> {repo.stargazers_count}
              </div>
              <div className="flex items-center gap-1">
                <GitFork className="w-3 h-3" /> {repo.forks_count}
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
