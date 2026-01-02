"use client";

import { useRouter } from "next/navigation";
import { SearchBar } from "@/components/common/SearchBar";

export default function HomePage() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex items-center justify-center">
      <SearchBar
        onSearch={(u) => router.push(`/profile?user=${u}`)}
      />
    </main>
  );
}
