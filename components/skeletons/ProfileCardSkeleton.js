import { Skeleton } from '@/components/ui/SkeletonLoader';

export default function ProfileCardSkeleton() {
  return (
    <div className="bg-slate-800/70 border border-slate-700 rounded-xl p-6">
      <div className="flex justify-center mb-6">
        <Skeleton className="w-28 h-28 rounded-full" />
      </div>

      <Skeleton className="h-5 w-40 mx-auto mb-2" />
      <Skeleton className="h-4 w-24 mx-auto mb-4" />

      <Skeleton className="h-3 w-full mb-2" />
      <Skeleton className="h-3 w-5/6 mb-6" />

      <Skeleton className="h-9 w-full rounded-lg mb-2" />
      <Skeleton className="h-9 w-full rounded-lg" />
    </div>
  );
}
