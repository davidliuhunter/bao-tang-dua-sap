import PublicLayout from '@/components/PublicLayout';
import ArtifactCard from '@/components/ArtifactCard';
import { getPublishedArtifacts } from '@/lib/data';

export default async function ArtifactsPage() {
  const artifacts = await getPublishedArtifacts();

  return (
    <PublicLayout>
      <div className="page-hero">
        <div className="container-museum">
          <h1 className="font-serif text-4xl font-bold mb-2">Hiện vật</h1>
          <p className="text-amber-200">Bộ sưu tập {artifacts.length} hiện vật của bảo tàng</p>
        </div>
      </div>

      <div className="container-museum py-12">
        {artifacts.length === 0 ? (
          <div className="text-center py-20 text-amber-600">
            <div className="text-6xl mb-4">🏛️</div>
            <p className="text-lg">Chưa có hiện vật nào được xuất bản.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {artifacts.map((a) => (
              <ArtifactCard key={a.id} artifact={a} />
            ))}
          </div>
        )}
      </div>
    </PublicLayout>
  );
}
