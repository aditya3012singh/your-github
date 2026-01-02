import { Skeleton } from '@/components/ui/SkeletonLoader';

export default function RepoListSkeleton() {
  return (
    <div className="bg-slate-800/70 border border-slate-700 rounded-xl p-6">
      <Skeleton className="h-5 w-40 mb-4" />

      <div className="grid md:grid-cols-2 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="bg-slate-900/50 border border-slate-700 rounded-lg p-4"
          >
            <Skeleton className="h-4 w-32 mb-2" />
            <Skeleton className="h-3 w-full mb-3" />
            <Skeleton className="h-3 w-24" />
          </div>
        ))}
      </div>
    </div>
  );
}
