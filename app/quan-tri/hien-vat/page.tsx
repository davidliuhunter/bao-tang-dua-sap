'use client';

import { useEffect, useState } from 'react';
import { getAllArtifacts, getCollections } from '@/lib/data';
import { saveArtifact, deleteArtifact } from '@/lib/actions';
import ImageUpload from '@/components/ImageUpload';
import type { Artifact, Collection } from '@/lib/types';
import { X } from 'lucide-react';

const EMPTY: Partial<Artifact> = {};

export default function AdminArtifactsPage() {
  const [artifacts, setArtifacts] = useState<Artifact[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [editing, setEditing] = useState<Partial<Artifact> | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState('');

  async function reload() {
    const [a, c] = await Promise.all([getAllArtifacts(), getCollections()]);
    setArtifacts(a);
    setCollections(c);
  }

  useEffect(() => { reload(); }, []);

  function openEdit(a: Partial<Artifact>) {
    setEditing(a);
    setImageUrl(a.image_url ?? '');
  }

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  }

  async function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!editing) return;
    setSaving(true);
    const fd = new FormData(e.currentTarget);
    const result = await saveArtifact({
      id: editing.id,
      name: fd.get('name') as string,
      description: (fd.get('description') as string) || null,
      origin: (fd.get('origin') as string) || null,
      era: (fd.get('era') as string) || null,
      material: (fd.get('material') as string) || null,
      collection_id: (fd.get('collection_id') as string) || null,
      status: fd.get('status') as 'published' | 'draft',
      image_url: imageUrl || null,
    });
    setSaving(false);
    if (result.success) {
      showToast(editing.id ? 'Đã cập nhật hiện vật!' : 'Đã thêm hiện vật mới!');
      setEditing(null);
      await reload();
    } else {
      showToast('Lỗi: ' + result.error);
    }
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Xóa hiện vật "${name}"?`)) return;
    await deleteArtifact(id);
    showToast('Đã xóa hiện vật.');
    await reload();
  }

  return (
    <div className="flex gap-6">
      {/* List */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-serif font-bold text-gray-800">Quản lý Hiện vật</h1>
            <p className="text-gray-500 text-sm">{artifacts.length} hiện vật</p>
          </div>
          <button onClick={() => openEdit(EMPTY)} className="btn-primary">
            + Thêm mới
          </button>
        </div>

        {toast && (
          <div className="mb-4 text-green-700 bg-green-50 border border-green-200 rounded-lg px-4 py-2.5 text-sm">
            {toast}
          </div>
        )}

        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Tên hiện vật</th>
                <th className="px-4 py-3 text-left font-medium hidden md:table-cell">Thời kỳ</th>
                <th className="px-4 py-3 text-left font-medium">Trạng thái</th>
                <th className="px-4 py-3 text-right font-medium">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {artifacts.map((a) => (
                <tr key={a.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-800">{a.name}</td>
                  <td className="px-4 py-3 text-gray-500 hidden md:table-cell">{a.era || '—'}</td>
                  <td className="px-4 py-3">
                    <span className={a.status === 'published' ? 'badge-published' : 'badge-draft'}>
                      {a.status === 'published' ? 'Xuất bản' : 'Nháp'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right space-x-3">
                    <button
                      onClick={() => openEdit(a)}
                      className="text-amber-600 hover:text-amber-800 text-xs font-medium"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDelete(a.id, a.name)}
                      className="text-red-500 hover:text-red-700 text-xs font-medium"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
              {artifacts.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-10 text-center text-gray-400">
                    Chưa có hiện vật nào
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit panel */}
      {editing !== null && (
        <div className="w-80 flex-shrink-0">
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm sticky top-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-gray-800">{editing.id ? 'Chỉnh sửa' : 'Thêm mới'}</h2>
              <button
                onClick={() => setEditing(null)}
                className="text-gray-400 hover:text-gray-700 p-0.5 rounded transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSave} className="space-y-3">
              <div>
                <label className="form-label">Tên hiện vật *</label>
                <input name="name" defaultValue={editing.name || ''} required className="form-input" />
              </div>
              <div>
                <label className="form-label">Mô tả</label>
                <textarea name="description" defaultValue={editing.description || ''} rows={3} className="form-input resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="form-label">Xuất xứ</label>
                  <input name="origin" defaultValue={editing.origin || ''} className="form-input" />
                </div>
                <div>
                  <label className="form-label">Thời kỳ</label>
                  <input name="era" defaultValue={editing.era || ''} className="form-input" />
                </div>
              </div>
              <div>
                <label className="form-label">Chất liệu</label>
                <input name="material" defaultValue={editing.material || ''} className="form-input" />
              </div>
              <div>
                <label className="form-label">Bộ sưu tập</label>
                <select name="collection_id" defaultValue={editing.collection_id || ''} className="form-input">
                  <option value="">— Không chọn —</option>
                  {collections.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="form-label">Ảnh hiện vật</label>
                <ImageUpload currentUrl={imageUrl} onUploaded={(url) => setImageUrl(url)} />
                {imageUrl && (
                  <input type="hidden" name="image_url" value={imageUrl} />
                )}
              </div>
              <div>
                <label className="form-label">Trạng thái</label>
                <select name="status" defaultValue={editing.status || 'draft'} className="form-input">
                  <option value="draft">Nháp</option>
                  <option value="published">Xuất bản</option>
                </select>
              </div>
              <div className="flex gap-2 pt-1">
                <button type="submit" disabled={saving} className="btn-primary flex-1">
                  {saving ? 'Đang lưu...' : 'Lưu'}
                </button>
                <button type="button" onClick={() => setEditing(null)} className="btn-secondary">
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
