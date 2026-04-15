import PublicLayout from '@/components/PublicLayout';

export default function HomeLoading() {
  return (
    <PublicLayout>
      {/* Hero skeleton */}
      <section className="bg-gradient-to-br from-amber-950 via-amber-900 to-amber-700 py-24">
        <div className="container-museum text-center space-y-4 flex flex-col items-center">
          <div className="skeleton w-20 h-20 rounded-full" />
          <div className="skeleton h-12 w-72 mx-auto" />
          <div className="skeleton h-5 w-48 mx-auto" />
          <div className="skeleton h-4 w-96 mx-auto" />
          <div className="flex gap-4 mt-4">
            <div className="skeleton h-11 w-40 rounded-full" />
            <div className="skeleton h-11 w-36 rounded-full" />
          </div>
        </div>
      </section>

      {/* Cards skeleton */}
      <section className="container-museum py-16">
        <div className="skeleton h-8 w-48 mb-6" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl overflow-hidden shadow">
              <div className="skeleton h-48 w-full rounded-none" />
              <div className="p-4 space-y-2">
                <div className="skeleton h-5 w-3/4" />
                <div className="skeleton h-4 w-full" />
                <div className="skeleton h-4 w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </PublicLayout>
  );
}
