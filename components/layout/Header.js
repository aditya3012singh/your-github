"use client";

import Link from "next/link";
import { Search, Award, Github } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const router = useRouter();
  const [username, setUsername] = useState("");

  const handleSearch = () => {
    if (!username.trim()) return;
    router.push(`/profile?user=${username}`);
    setUsername("");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-900/70 backdrop-blur">
      <div className="container mx-auto px-6 py-4 flex items-center gap-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="w-9 h-9 bg-blue-500 rounded-lg flex items-center justify-center">
            <Award className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-bold text-white">GitStats</span>
        </Link>

        {/* Search */}
        <div className="hidden md:flex flex-1 max-w-md relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Search GitHub username..."
            className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4 ml-auto">
          <Link
            href="https://github.com"
            target="_blank"
            className="text-slate-400 hover:text-white transition-colors"
            aria-label="GitHub"
          >
            <Github className="w-5 h-5" />
          </Link>

          <button className="hidden sm:inline-flex bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            Sign In
          </button>
        </div>
      </div>
    </header>
  );
}
