'use client';

import { useRef, useState } from 'react';
import { uploadImage } from '@/lib/actions';

interface Props {
  currentUrl?: string | null;
  onUploaded: (url: string) => void;
}

export default function ImageUpload({ currentUrl, onUploaded }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(currentUrl ?? null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError('');
    // local preview
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    setUploading(true);
    const fd = new FormData();
    fd.append('file', file);
    const result = await uploadImage(fd);
    setUploading(false);
    if (result.success && result.url) {
      onUploaded(result.url);
    } else {
      setError(result.error ?? 'Upload thất bại.');
      setPreview(currentUrl ?? null);
    }
  }

  return (
    <div className="space-y-2">
      <div
        className="relative w-full h-36 rounded-lg border-2 border-dashed border-amber-300 bg-amber-50 flex items-center justify-center overflow-hidden cursor-pointer hover:border-amber-500 transition-colors"
        onClick={() => inputRef.current?.click()}
      >
        {preview ? (
          <img src={preview} alt="preview" className="w-full h-full object-cover" />
        ) : (
          <div className="text-center text-amber-500 select-none">
            <div className="text-3xl mb-1">📷</div>
            <p className="text-xs">Click để chọn ảnh</p>
            <p className="text-xs text-amber-400">JPG, PNG, WEBP · tối đa 5MB</p>
          </div>
        )}
        {uploading && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
            <span className="text-sm text-amber-700 animate-pulse">Đang tải lên...</span>
          </div>
        )}
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFile}
      />
    </div>
  );
}
