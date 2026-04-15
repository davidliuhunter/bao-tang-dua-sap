'use client';

import { useState, useEffect } from 'react';
import Lightbox from '@/components/Lightbox';
import ImagePlaceholder from '@/components/ImagePlaceholder';
import { trackArtifactView } from '@/lib/actions';
import { Search } from 'lucide-react';

interface Props {
  artifactId: string;
  imageUrl: string | null;
  name: string;
}

export default function ArtifactImageClient({ artifactId, imageUrl, name }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    trackArtifactView(artifactId);
  }, [artifactId]);

  if (!imageUrl) {
    return (
      <div className="rounded-2xl overflow-hidden bg-amber-100 aspect-square flex items-center justify-center shadow-md">
        <ImagePlaceholder type="artifact" />
      </div>
    );
  }

  return (
    <>
      <div
        className="rounded-2xl overflow-hidden bg-amber-100 aspect-square flex items-center justify-center shadow-md cursor-zoom-in group relative"
        onClick={() => setOpen(true)}
      >
        <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
          <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5">
            <Search className="w-3.5 h-3.5" /> Phóng to
          </span>
        </div>
      </div>
      {open && <Lightbox src={imageUrl} alt={name} onClose={() => setOpen(false)} />}
    </>
  );
}
