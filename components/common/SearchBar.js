"use client";

import { Search } from "lucide-react";
import { useState } from "react";

export function SearchBar({ onSearch }) {
  const [value, setValue] = useState("");

  return (
    <div className="relative max-w-xl mx-auto">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSearch(value)}
        placeholder="Enter GitHub username..."
        className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-12 pr-32 py-4"
      />
      <button
        onClick={() => onSearch(value)}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-500 px-6 py-2 rounded-md"
      >
        Get Stats →
      </button>
    </div>
  );
}
