import PublicLayout from '@/components/PublicLayout';

export default function ArtifactDetailLoading() {
  return (
    <PublicLayout>
      <div className="container-museum py-12">
        <div className="skeleton h-4 w-48 mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Image */}
          <div className="skeleton h-96 w-full rounded-xl" />
          {/* Info */}
          <div className="space-y-4">
            <div className="skeleton h-8 w-3/4" />
            <div className="skeleton h-5 w-1/3" />
            <div className="skeleton h-4 w-full" />
            <div className="skeleton h-4 w-full" />
            <div className="skeleton h-4 w-5/6" />
            <div className="skeleton h-4 w-4/5" />
            <div className="skeleton h-4 w-2/3" />
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
