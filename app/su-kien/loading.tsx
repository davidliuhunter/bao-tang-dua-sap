import PublicLayout from '@/components/PublicLayout';

export default function EventsLoading() {
  return (
    <PublicLayout>
      <div className="page-hero py-12">
        <div className="container-museum">
          <div className="skeleton h-9 w-32 mb-2" />
          <div className="skeleton h-4 w-48" />
        </div>
      </div>

      <div className="container-museum py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl overflow-hidden shadow">
              <div className="skeleton h-44 w-full rounded-none" />
              <div className="p-5 space-y-3">
                <div className="flex gap-2">
                  <div className="skeleton h-5 w-20 rounded-full" />
                  <div className="skeleton h-5 w-24 rounded-full" />
                </div>
                <div className="skeleton h-6 w-full" />
                <div className="skeleton h-6 w-3/4" />
                <div className="skeleton h-4 w-full" />
                <div className="skeleton h-4 w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </PublicLayout>
  );
}
