import Link from 'next/link';
import { notFound } from 'next/navigation';
import PublicLayout from '@/components/PublicLayout';
import ImagePlaceholder from '@/components/ImagePlaceholder';
import { getArtifactById, getPublishedArtifacts } from '@/lib/data';

export async function generateStaticParams() {
  const artifacts = await getPublishedArtifacts();
  return artifacts.map((a) => ({ id: a.id }));
}

export default async function ArtifactDetailPage({ params }: { params: { id: string } }) {
  const artifact = await getArtifactById(params.id);

  if (!artifact || artifact.status !== 'published') {
    notFound();
  }

  const meta = [
    ['Xuất xứ', artifact.origin],
    ['Thời kỳ', artifact.era],
    ['Chất liệu', artifact.material],
    ['Bộ sưu tập', artifact.collection?.name],
  ].filter(([, v]) => v) as [string, string][];

  return (
    <PublicLayout>
      <div className="container-museum py-10">
        <Link
          href="/hien-vat"
          className="inline-flex items-center gap-1 text-amber-600 hover:text-amber-800 text-sm mb-8"
        >
          ← Quay lại danh sách hiện vật
        </Link>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Image */}
          <div className="rounded-2xl overflow-hidden bg-amber-100 aspect-square flex items-center justify-center shadow-md">
            {artifact.image_url ? (
              <img
                src={artifact.image_url}
                alt={artifact.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <ImagePlaceholder type="artifact" />
            )}
          </div>

          {/* Details */}
          <div>
            {artifact.collection && (
              <span className="text-xs text-amber-700 font-semibold bg-amber-100 px-3 py-1 rounded-full">
                {artifact.collection.name}
              </span>
            )}

            <h1 className="font-serif text-3xl md:text-4xl font-bold text-amber-950 mt-4 mb-5 leading-tight">
              {artifact.name}
            </h1>

            {artifact.description && (
              <p className="text-amber-800 leading-relaxed mb-8 text-base">{artifact.description}</p>
            )}

            {meta.length > 0 && (
              <dl className="grid grid-cols-2 gap-3">
                {meta.map(([label, val]) => (
                  <div key={label} className="bg-amber-50 rounded-xl p-3.5 border border-amber-100">
                    <dt className="text-xs text-amber-500 font-semibold uppercase tracking-wide mb-1">
                      {label}
                    </dt>
                    <dd className="text-amber-950 text-sm font-medium">{val}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
