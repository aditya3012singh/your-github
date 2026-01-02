import React from "react";

export default function ContributionGraph({ username }) {
  if (!username) return null;

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 text-center">
      <h3 className="text-lg font-semibold mb-4">Contribution Graph</h3>
      <p className="text-sm text-slate-400">
        Contribution graph will load here via GitHub GraphQL API.
      </p>
    </div>
  );
}
