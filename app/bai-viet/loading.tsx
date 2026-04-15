import PublicLayout from '@/components/PublicLayout';

export default function ArticlesLoading() {
  return (
    <PublicLayout>
      <div className="page-hero py-12">
        <div className="container-museum">
          <div className="skeleton h-9 w-36 mb-2" />
          <div className="skeleton h-4 w-56" />
        </div>
      </div>

      <div className="container-museum py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl overflow-hidden shadow">
              <div className="skeleton h-48 w-full rounded-none" />
              <div className="p-5 space-y-3">
                <div className="skeleton h-3 w-24" />
                <div className="skeleton h-6 w-full" />
                <div className="skeleton h-6 w-4/5" />
                <div className="skeleton h-4 w-full" />
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
