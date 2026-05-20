export const RoomCardSkeleton = () => (
  <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
    <div className="h-48 skeleton-pulse" />
    <div className="p-md space-y-sm">
      <div className="h-5 w-3/4 skeleton-pulse rounded" />
      <div className="h-4 w-1/2 skeleton-pulse rounded" />
      <div className="flex gap-xs">
        <div className="h-6 w-16 skeleton-pulse rounded-full" />
        <div className="h-6 w-16 skeleton-pulse rounded-full" />
      </div>
      <div className="h-10 w-full skeleton-pulse rounded-xl mt-md" />
    </div>
  </div>
);

export const TableSkeleton = ({ rows = 4, cols = 5 }) => (
  <div className="space-y-md">
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} className="flex gap-md p-md">
        {Array.from({ length: cols }).map((_, j) => (
          <div
            key={j}
            className="h-6 skeleton-pulse rounded"
            style={{ width: `${100 / cols}%` }}
          />
        ))}
      </div>
    ))}
  </div>
);

export const PageSkeleton = () => (
  <div className="space-y-xl animate-pulse">
    <div className="h-8 w-64 skeleton-pulse rounded" />
    <div className="h-4 w-96 skeleton-pulse rounded" />
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
      {Array.from({ length: 6 }).map((_, i) => (
        <RoomCardSkeleton key={i} />
      ))}
    </div>
  </div>
);
