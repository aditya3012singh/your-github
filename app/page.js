"use client";

import SearchBar from "@/components/common/SearchBar";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function HomePage() {
  const router = useRouter();
  const theme = useSelector((state) => state.theme.theme);

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div
        className={`p- rounded-lg transition-colors duration-500 ${
          theme === "dark" ? "bg- text-white" : "bg- text-black"
        }`}
      >
        <SearchBar onSearch={(u) => router.push(`/profile?user=${u}`)} />
      </div>
    </main>
  );
}
