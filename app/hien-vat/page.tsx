import PublicLayout from '@/components/PublicLayout';
import ArtifactsClient from '@/components/ArtifactsClient';
import { getPublishedArtifacts, getCollections } from '@/lib/data';

export default async function ArtifactsPage() {
  const [artifacts, collections] = await Promise.all([
    getPublishedArtifacts(),
    getCollections(),
  ]);

  return (
    <PublicLayout>
      <div className="page-hero">
        <div className="container-museum">
          <h1 className="font-serif text-4xl font-bold mb-2">Hiện vật</h1>
          <p className="text-amber-200">Bộ sưu tập {artifacts.length} hiện vật của bảo tàng</p>
        </div>
      </div>

      <div className="container-museum py-12">
        <ArtifactsClient artifacts={artifacts} collections={collections} />
      </div>
    </PublicLayout>
  );
}
