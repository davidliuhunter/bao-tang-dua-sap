'use client';

import { useState, useMemo } from 'react';
import ArtifactCard from '@/components/ArtifactCard';
import type { Artifact, Collection } from '@/lib/types';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';

const PAGE_SIZE = 8;

interface Props {
  artifacts: Artifact[];
  collections: Collection[];
}

export default function ArtifactsClient({ artifacts, collections }: Props) {
  const [search, setSearch] = useState('');
  const [collectionFilter, setCollectionFilter] = useState('');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let result = artifacts;
    if (collectionFilter) {
      result = result.filter((a) => a.collection_id === collectionFilter);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          (a.era ?? '').toLowerCase().includes(q) ||
          (a.material ?? '').toLowerCase().includes(q) ||
          (a.origin ?? '').toLowerCase().includes(q) ||
          (a.collection?.name ?? '').toLowerCase().includes(q)
      );
    }
    return result;
  }, [artifacts, search, collectionFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paged = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  function handleSearch(v: string) { setSearch(v); setPage(1); }
  function handleCollection(v: string) { setCollectionFilter(v); setPage(1); }

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-400">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="text"
            placeholder="Tìm theo tên, thời kỳ, chất liệu..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-amber-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-300"
          />
        </div>
        <select
          value={collectionFilter}
          onChange={(e) => handleCollection(e.target.value)}
          className="sm:w-52 px-3 py-2.5 rounded-xl border border-amber-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-300"
        >
          <option value="">Tất cả bộ sưu tập</option>
          {collections.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
        {(search || collectionFilter) && (
          <button
            onClick={() => { handleSearch(''); handleCollection(''); }}
            className="px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-500 hover:bg-gray-50"
          >
            Xóa lọc
          </button>
        )}
      </div>

      {/* Result count */}
      {(search || collectionFilter) && (
        <p className="text-sm text-amber-700 mb-4">
          Tìm thấy <strong>{filtered.length}</strong> hiện vật
          {search && <> cho &ldquo;<em>{search}</em>&rdquo;</>}
        </p>
      )}

      {/* Grid */}
      {paged.length === 0 ? (
        <div className="text-center py-20 text-amber-600">
          <div className="flex justify-center mb-4"><Search className="w-12 h-12 opacity-40" /></div>
          <p className="text-lg">Không tìm thấy hiện vật phù hợp.</p>
          <button onClick={() => { handleSearch(''); handleCollection(''); }} className="mt-4 text-sm text-amber-700 underline">
            Xem tất cả hiện vật
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {paged.map((a) => (
            <ArtifactCard key={a.id} artifact={a} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-10">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1.5 rounded-lg border border-amber-200 text-sm disabled:opacity-40 hover:bg-amber-50 flex items-center gap-1"
          >
            <ChevronLeft className="w-4 h-4" /> Trước
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`w-9 h-9 rounded-lg text-sm font-medium ${
                p === currentPage
                  ? 'bg-amber-700 text-white'
                  : 'border border-amber-200 hover:bg-amber-50 text-amber-800'
              }`}
            >
              {p}
            </button>
          ))}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1.5 rounded-lg border border-amber-200 text-sm disabled:opacity-40 hover:bg-amber-50 flex items-center gap-1"
          >
            Sau <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
