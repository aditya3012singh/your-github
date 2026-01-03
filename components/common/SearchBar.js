"use client";

import { Search, Github, Heart, Sparkles } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux"; // import Redux selector
import { RootState } from "@/store/store"; // import store type
import DecryptedText from "../DecryptedText";

export default function SearchBar({ onSearch }) {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Get theme from Redux
  const theme = useSelector((state) => state.theme.theme);
  const isDark = theme === "dark";

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden transition-colors duration-500 ${
        isDark ? "" : ""
      }`}
    >
      <div className="w-full max-w-md relative z-10">
        {/* GitHub Logo */}
        <div className={`flex justify-center mb-8 ${isDark ? "text-[#58a6ff]" : "text-[#0366d6]"}`}>
          <Github size={52} />
        </div>

        {/* Title */}
        <div className="text-center mb-12">
          <div
            className={`text-4xl font-bold ${
              isDark ? "text-[#c9d1d9]" : "text-gray-900"
            }`}
          >
            <DecryptedText
              text="GET YOUR GITHUB STATS"
              animateOn="view"
              maxIterations={10}
              revealDirection="start"
              sequential
              speed={100}
            />
          </div>
        </div>

        {/* Card */}
        <div
          className={`rounded-2xl p-8 shadow-2xl border transition-all duration-300 ${
            isDark
              ? "bg-black border-[#30363d] hover:border-[#58a6ff]/50"
              : "bg-white border-gray-300 hover:border-blue-400/50"
          }`}
        >
          {/* Label */}
          <label
            className={`block text-xs uppercase tracking-wider mb-3 font-semibold flex items-center gap-2 ${
              isDark ? "text-[#c9d1d9]" : "text-gray-700"
            }`}
          >
            <Github className="w-4 h-4 text-[#58a6ff]" />
            Username
          </label>

          {/* Input */}
          <div className="relative mb-5">
            <Search
              className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${
                isDark ? "text-[#8b949e]" : "text-gray-400"
              }`}
            />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && username.trim() && onSearch(username)
              }
              placeholder="Enter GitHub username"
              className={`w-full rounded-xl pl-12 pr-4 py-4 border focus:outline-none focus:shadow-lg placeholder:transition-all placeholder:duration-300 transition-all duration-300 ${
                isDark
                  ? "bg-[#0d1117] text-[#c9d1d9] border-[#30363d] focus:border-[#58a6ff] focus:shadow-[#58a6ff]/20 placeholder-[#8b949e]"
                  : "bg-gray-100 text-gray-900 border-gray-300 focus:border-blue-400 focus:shadow-blue-400/20 placeholder-gray-400"
              }`}
            />
          </div>

          {/* Button */}
          <button
            onClick={() => onSearch(username)}
            disabled={loading || !username.trim()}
            className={`w-full font-bold py-4 rounded-xl relative overflow-hidden transition-all duration-300 ${
              isDark
                ? "bg-[#1f9a36] text-white hover:bg-[#2fb440] hover:shadow-2xl hover:shadow-[#2ea043]/40 disabled:opacity-50 disabled:cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-500 hover:shadow-2xl hover:shadow-blue-400/40 disabled:opacity-50 disabled:cursor-not-allowed"
            }`}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Loading...
                </>
              ) : (
                <>
                  <span>Get Your Stats</span>
                  <Sparkles className="w-4 h-4" />
                </>
              )}
            </span>

            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full hover:translate-x-full transition-transform duration-1000" />
          </button>
        </div>

        {/* Footer */}
        <div className="text-center mt-10 space-y-3">
          <p
            className={`text-sm flex items-center justify-center gap-2 ${
              isDark ? "text-[#8b949e]" : "text-gray-600"
            }`}
          >
            Made with{" "}
            <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" /> by
            Aditya Singh
          </p>

          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`text-sm flex items-center justify-center gap-2 transition-all duration-300 ${
              isDark ? "text-[#8b949e] hover:text-[#58a6ff]" : "text-gray-700 hover:text-blue-600"
            }`}
          >
            <Github className="w-4 h-4" />
            View on GitHub
          </a>
        </div>
      </div>
    </div>
  );
}
