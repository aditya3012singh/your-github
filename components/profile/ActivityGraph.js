"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useSelector } from "react-redux";

export default function ActivityGraph({ data, username, loading = false }) {
  const theme = useSelector((state) => state.theme.theme);
  const isDark = theme === "dark";

  // 🔹 Skeleton Loader
// Skeleton Loader
if (loading) {
  return (
    <div
      className={`rounded-xl border p-6 animate-pulse ${
        isDark ? "bg-black border-slate-700" : "bg-white border-gray-300"
      }`}
    >
      {/* Header Skeleton */}
      <div className="h-8 w-48 mb-4 rounded bg-gray-400"></div>
      <div className="h-6 w-64 mb-6 rounded bg-gray-400"></div>

      {/* Chart Skeleton */}
      <div className="w-full h-[320px] rounded bg-gray-400 mb-2"></div>

      {/* Optional: small x-axis placeholders */}
      <div className="flex justify-between mt-2">
        {Array(6)
          .fill(0)
          .map((_, idx) => (
            <div key={idx} className="h-2 w-8 rounded bg-gray-500"></div>
          ))}
      </div>
    </div>
  );
}


  // 🔹 No data available
  if (!data || data.length === 0) {
    return (
      <div
        className={`rounded-xl border p-6 ${
          isDark
            ? "bg-black border-slate-700 text-slate-400"
            : "bg-white border-gray-300 text-gray-600"
        }`}
      >
        No activity data available
      </div>
    );
  }

  return (
    <div
      className={`rounded-xl border p-6 ${
        isDark
          ? "bg-black border-slate-700"
          : "bg-white border-gray-300"
      }`}
    >
      {/* Header */}
      <h3
        className={`text-lg font-semibold mb-4 ${
          isDark ? "text-white" : "text-gray-900"
        }`}
      >
        📈 Activity Graph
      </h3>

      <p className="text-sm text-cyan-400 mb-4">
        {username}'s Contribution Activity
      </p>

      {/* Chart */}
      <div className="w-full h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={isDark ? "#1f2937" : "#e5e7eb"}
            />

            <XAxis
              dataKey="day"
              stroke={isDark ? "#93c5fd" : "#2563eb"}
              tick={{ fontSize: 12 }}
            />

            <YAxis
              stroke={isDark ? "#93c5fd" : "#2563eb"}
              tick={{ fontSize: 12 }}
              allowDecimals={false}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: isDark ? "#020617" : "#ffffff",
                border: "1px solid #1e40af",
                borderRadius: "6px",
                color: isDark ? "#ffffff" : "#000000",
              }}
              labelStyle={{ color: "#38bdf8" }}
            />

            <Line
              type="monotone"
              dataKey="contributions"
              stroke="#38bdf8"
              strokeWidth={2.5}
              dot={{ r: 4, fill: isDark ? "#38bdf8" : "#2563eb" }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
