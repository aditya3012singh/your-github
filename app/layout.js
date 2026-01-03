"use client";

import { Provider, useSelector, useDispatch } from "react-redux";
import { store } from "@/store/store";
import "./globals.css";
import { Background } from "@/components/Background";
import { toggleTheme } from "@/store/theme.slice.js";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { StepBack } from "lucide-react";

export default function RootLayout({ children }) {
  return (
    <Provider store={store}>
      <LayoutContent>{children}</LayoutContent>
    </Provider>
  );
}

function LayoutContent({ children }) {
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();
  const pathname = usePathname();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Apply theme to body
  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("bg-black", "text-white");
      document.body.classList.remove("bg-white", "text-black");
    } else {
      document.body.classList.add("bg-white", "text-black");
      document.body.classList.remove("bg-black", "text-white");
    }
  }, [theme]);

  const skeletonBg =
    theme === "dark" ? "bg-slate-800" : "bg-slate-300";

  return (
    <html lang="en">
      <body className="min-h-screen transition-colors duration-500">
        <main className="relative min-h-screen overflow-hidden">
          <Background theme={theme}>
            {/* 🔹 Top-left Back button / Skeleton */}
            <div className="fixed top-4 left-3 md:top-6 md:left-6 z-50">
              {!mounted ? (
                <div
                  className={`h-6 w-14 rounded-md animate-pulse ${skeletonBg}`}
                />
              ) : (
                pathname !== "/" && (
                  <Link
                    href="/"
                    className={`font-bold text-lg md:text-xl transition-all duration-300 ${
                      theme === "dark"
                        ? "text-white hover:text-blue-400"
                        : "text-black hover:text-blue-600"
                    }`}
                  >
                    <StepBack/>
                  </Link>
                )
              )}
            </div>

            {/* 🔹 Top-right Theme toggle / Skeleton */}
            <div className="fixed top-4 right-3 md:top-6 md:right-6 z-50">
              {!mounted ? (
                <div
                  className={`w-10 h-10 rounded-full animate-pulse ${skeletonBg}`}
                />
              ) : (
                <button
                  onClick={() => dispatch(toggleTheme())}
                  className="text-[#8b949e] hover:text-[#58a6ff] transition-all duration-300 p-2 rounded-full hover:bg-[#161b22]"
                >
                  {theme === "dark" ? (
                    <svg
                      className="w-8 h-8"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-8 h-8"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"
                      />
                    </svg>
                  )}
                </button>
              )}
            </div>

            {/* 🔹 Page content */}
            <div className="relative z-10 min-h-screen">
              {mounted ? children : null}
            </div>
          </Background>
        </main>
      </body>
    </html>
  );
}
