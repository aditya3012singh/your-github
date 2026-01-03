"use client";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { MapPin, Building, Globe } from "lucide-react";

export default function ProfileCard({ profile, loading }) {
  // ✅ Get current theme
  const theme = useSelector((state) => state.theme.theme);
  const isDark = theme === "dark";

  // ✅ Prevent SSR hydration mismatch
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  /* 🔹 Loading Skeleton */
  if (loading) {
    return (
      <div
        className={`rounded-xl p-6 flex flex-col items-center animate-pulse transition-colors duration-500 ${
          isDark ? "bg-black border border-slate-700" : "bg-white border-gray-300"
        }`}
      >
        <div
          className={`w-32 h-32 rounded-full mb-4 ${
            isDark ? "bg-slate-700" : "bg-gray-300"
          }`}
        />
        <div
          className={`h-6 w-40 rounded mb-2 ${
            isDark ? "bg-slate-700" : "bg-gray-300"
          }`}
        />
        <div
          className={`h-4 w-28 rounded mb-4 ${
            isDark ? "bg-slate-700" : "bg-gray-300"
          }`}
        />
        <div className="space-y-2 w-full mb-4">
          <div
            className={`h-4 rounded w-3/4 mx-auto ${
              isDark ? "bg-slate-700" : "bg-gray-300"
            }`}
          />
          <div
            className={`h-4 rounded w-2/3 mx-auto ${
              isDark ? "bg-slate-700" : "bg-gray-300"
            }`}
          />
        </div>
        <div
          className={`h-10 w-full rounded-lg ${
            isDark ? "bg-slate-700" : "bg-gray-300"
          }`}
        />
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div
      className={`rounded-xl p-6 flex flex-col items-center transition-colors duration-500 ${
        isDark ? "bg-black border border-slate-700 text-white" : "bg-white border border-gray-300 text-gray-900"
      }`}
    >
      {/* Avatar */}
      <div className="relative mb-4">
        <img
          src={profile.avatar_url}
          alt={profile.login}
          className={`w-32 h-32 rounded-full border-4 ${
            isDark ? "border-slate-700" : "border-gray-300"
          }`}
        />
        <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full border-2 border-gray-800" />
      </div>

      {/* Name */}
      <h2 className={`${isDark ? "text-white" : "text-gray-900"} text-2xl font-bold`}>
        {profile.name || profile.login}
      </h2>
      <p className={`${isDark ? "text-slate-400" : "text-gray-500"} mb-4`}>
        @{profile.login}
      </p>

      {/* Bio */}
      {profile.bio && (
        <p className={`${isDark ? "text-slate-300" : "text-gray-700"} text-sm mb-4 text-center`}>
          {profile.bio}
        </p>
      )}

      {/* Meta */}
      <div className={`space-y-2 text-sm mb-4 w-full ${isDark ? "text-slate-400" : "text-gray-700"}`}>
        {profile.location && (
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            {profile.location}
          </div>
        )}
        {profile.company && (
          <div className="flex items-center gap-2">
            <Building className="w-4 h-4" />
            {profile.company}
          </div>
        )}
        {profile.blog && (
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4" />
            <a
              href={profile.blog.startsWith("http") ? profile.blog : `https://${profile.blog}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition"
            >
              {profile.blog.replace(/^https?:\/\//, "")}
            </a>
          </div>
        )}
      </div>

      {/* GitHub Link */}
      <a
        href={profile.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className={`block w-full py-2 rounded-lg text-center transition-colors duration-300 ${
          isDark
            ? "bg-slate-700 hover:bg-slate-600"
            : "bg-gray-200 hover:bg-gray-300"
        }`}
      >
        View on GitHub
      </a>
    </div>
  );
}
