import {
  MapPin,
  Building,
  Globe,
  Users,
} from "lucide-react";

export default function ProfileCard({ profile }) {
  if (!profile) return null;

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 flex flex-col items-center">
      <div className="relative mb-4">
        <img
          src={profile.avatar_url}
          alt={profile.login}
          className="w-32 h-32 rounded-full border-4 border-slate-700"
        />
        <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full border-2 border-slate-800"></div>
      </div>

      <h2 className="text-2xl font-bold">{profile.name || profile.login}</h2>
      <p className="text-slate-400 mb-4">@{profile.login}</p>

      {profile.bio && <p className="text-sm text-slate-300 mb-4 text-center">{profile.bio}</p>}

      <div className="space-y-2 text-sm text-slate-400 mb-4">
        {profile.location && (
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" /> {profile.location}
          </div>
        )}
        {profile.company && (
          <div className="flex items-center gap-2">
            <Building className="w-4 h-4" /> {profile.company}
          </div>
        )}
        {profile.blog && (
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4" />
            <a href={profile.blog} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
              {profile.blog.replace(/^https?:\/\//, "")}
            </a>
          </div>
        )}
      </div>

      <a
        href={profile.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full bg-slate-700 hover:bg-slate-600 text-center py-2 rounded-lg mb-2 transition"
      >
        View on GitHub
      </a>
    </div>
  );
}
