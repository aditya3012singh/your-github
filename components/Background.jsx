import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { cn } from "@/lib/utils";

export function Background({ children }) {
  const theme = useSelector((state) => state.theme.theme);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // prevent SSR mismatch

  const isDark = theme === "dark";

  return (
    <div
      className={cn(
        "relative flex min-h-screen w-full items-center justify-center transition-colors duration-500",
        isDark ? "bg-black" : "bg-white"
      )}
    >
      {/* Grid background */}
      <div
        className={cn(
          "absolute inset-0 [background-size:20px_20px]",
          isDark
            ? "[background-image:linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)]"
            : "[background-image:linear-gradient(to_right,rgba(0,0,0,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.06)_1px,transparent_1px)]"
        )}
      />

      {/* Radial fade */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 transition-colors duration-500",
          isDark
            ? "bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_30%,black)]"
            : "bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_30%,white)]"
        )}
      />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center">{children}</div>
    </div>
  );
}
