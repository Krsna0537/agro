import { motion } from "framer-motion";
import { shimmerAnimation } from "@/lib/animations";

interface SkeletonProps {
  className?: string;
  height?: string;
  width?: string;
}

export const Skeleton = ({ className = "", height = "h-4", width = "w-full" }: SkeletonProps) => {
  return (
    <motion.div
      className={`bg-muted rounded ${height} ${width} ${className}`}
      animate={shimmerAnimation.animate}
      style={{
        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
        backgroundSize: "200% 100%"
      }}
    />
  );
};

export const CardSkeleton = () => {
  return (
    <div className="border rounded-lg p-6 space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton height="h-4" width="w-24" />
        <Skeleton height="h-4" width="w-4" className="rounded-full" />
      </div>
      <Skeleton height="h-8" width="w-16" />
      <Skeleton height="h-3" width="w-32" />
    </div>
  );
};

export const TableSkeleton = ({ rows = 5 }: { rows?: number }) => {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center space-x-4 p-4 border rounded-lg">
          <Skeleton height="h-10" width="w-10" className="rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton height="h-4" width="w-1/3" />
            <Skeleton height="h-3" width="w-1/2" />
          </div>
          <Skeleton height="h-6" width="w-20" />
        </div>
      ))}
    </div>
  );
};

export const DashboardSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="border rounded-lg p-6 space-y-4">
          <Skeleton height="h-6" width="w-32" />
          <TableSkeleton rows={4} />
        </div>
        <div className="border rounded-lg p-6 space-y-4">
          <Skeleton height="h-6" width="w-40" />
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="p-3 border rounded">
                <Skeleton height="h-4" width="w-3/4" />
                <Skeleton height="h-3" width="w-1/2" className="mt-2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
