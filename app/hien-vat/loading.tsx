import PublicLayout from '@/components/PublicLayout';

export default function ArtifactsLoading() {
  return (
    <PublicLayout>
      <div className="page-hero py-12">
        <div className="container-museum">
          <div className="skeleton h-9 w-36 mb-2" />
          <div className="skeleton h-4 w-56" />
        </div>
      </div>

      <div className="container-museum py-12">
        {/* Filter bar skeleton */}
        <div className="flex gap-3 mb-8 flex-wrap">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="skeleton h-9 w-24 rounded-full" />
          ))}
        </div>

        {/* Cards skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl overflow-hidden shadow">
              <div className="skeleton h-52 w-full rounded-none" />
              <div className="p-4 space-y-2">
                <div className="skeleton h-5 w-3/4" />
                <div className="skeleton h-4 w-full" />
                <div className="skeleton h-4 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </PublicLayout>
  );
}
