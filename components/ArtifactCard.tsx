import Link from 'next/link';
import type { Artifact } from '@/lib/types';
import ImagePlaceholder from './ImagePlaceholder';

export default function ArtifactCard({ artifact }: { artifact: Artifact }) {
  return (
    <Link href={`/hien-vat/${artifact.id}`} className="group block">
      <div className="bg-white rounded-xl overflow-hidden shadow-sm card-hover border border-amber-100 h-full flex flex-col">
        <div className="relative h-44 bg-amber-100 flex-shrink-0">
          {artifact.image_url ? (
            <img
              src={artifact.image_url}
              alt={artifact.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <ImagePlaceholder type="artifact" />
          )}
          {artifact.collection && (
            <span className="absolute top-2 left-2 text-xs bg-amber-900/80 text-amber-100 px-2 py-0.5 rounded-full backdrop-blur-sm">
              {artifact.collection.name}
            </span>
          )}
        </div>
        <div className="p-4 flex flex-col flex-1">
          <h3 className="font-semibold text-amber-950 group-hover:text-amber-700 transition-colors line-clamp-2 text-sm leading-snug">
            {artifact.name}
          </h3>
          {artifact.era && (
            <p className="text-xs text-amber-500 mt-1 font-medium">{artifact.era}</p>
          )}
          {artifact.description && (
            <p className="text-xs text-amber-700 mt-2 line-clamp-2 leading-relaxed flex-1">
              {artifact.description}
            </p>
          )}
          <p className="text-xs text-amber-500 mt-3 font-medium group-hover:text-amber-700 transition-colors">
            Xem chi tiết →
          </p>
        </div>
      </div>
    </Link>
  );
}
