import React from "react";

export default function LanguageStats({ data }) {
  if (!data || Object.keys(data).length === 0) return null;

  const total = Object.values(data).reduce((a, b) => a + b, 0);

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
      <h3 className="text-lg font-semibold mb-4">Most Used Languages</h3>

      <div className="h-4 rounded-full overflow-hidden flex mb-4">
        {Object.entries(data).map(([lang, bytes]) => (
          <div
            key={lang}
            style={{
              width: `${((bytes / total) * 100).toFixed(1)}%`,
              backgroundColor: getColor(lang),
            }}
          />
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2">
        {Object.entries(data).map(([lang, bytes]) => (
          <div key={lang} className="flex items-center gap-2 text-sm">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: getColor(lang) }}
            />
            <span>{lang}</span>
            <span className="ml-auto text-slate-400">
              {((bytes / total) * 100).toFixed(1)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
