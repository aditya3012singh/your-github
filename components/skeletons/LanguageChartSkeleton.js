import { Skeleton } from '@/components/ui/SkeletonLoader';

export default function LanguageChartSkeleton() {
  return (
    <div className="bg-slate-800/70 border border-slate-700 rounded-xl p-6">
      <Skeleton className="h-5 w-40 mb-4" />

      <div className="flex gap-1 mb-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-4 flex-1" />
        ))}
      </div>

      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-4 w-full" />
        ))}
      </div>
    </div>
  );
}
