'use client';

import { useEffect, useState } from 'react';
import { getAllArticles } from '@/lib/data';
import { saveArticle, deleteArticle } from '@/lib/actions';
import type { Article } from '@/lib/types';

const EMPTY: Partial<Article> = {};

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [editing, setEditing] = useState<Partial<Article> | null>(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState('');

  async function reload() {
    setArticles(await getAllArticles());
  }

  useEffect(() => { reload(); }, []);

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  }

  async function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!editing) return;
    setSaving(true);
    const fd = new FormData(e.currentTarget);
    const result = await saveArticle({
      id: editing.id,
      title: fd.get('title') as string,
      summary: (fd.get('summary') as string) || null,
      content: fd.get('content') as string,
      status: fd.get('status') as 'published' | 'draft',
      image_url: (fd.get('image_url') as string) || null,
    });
    setSaving(false);
    if (result.success) {
      showToast(editing.id ? 'Đã cập nhật bài viết!' : 'Đã thêm bài viết mới!');
      setEditing(null);
      await reload();
    } else {
      showToast('Lỗi: ' + result.error);
    }
  }

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Xóa bài viết "${title}"?`)) return;
    await deleteArticle(id);
    showToast('Đã xóa bài viết.');
    await reload();
  }

  return (
    <div className="flex gap-6">
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-serif font-bold text-gray-800">Quản lý Bài viết</h1>
            <p className="text-gray-500 text-sm">{articles.length} bài viết</p>
          </div>
          <button onClick={() => setEditing(EMPTY)} className="btn-primary">
            + Viết mới
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
                <th className="px-4 py-3 text-left font-medium">Tiêu đề</th>
                <th className="px-4 py-3 text-left font-medium hidden md:table-cell">Ngày tạo</th>
                <th className="px-4 py-3 text-left font-medium">Trạng thái</th>
                <th className="px-4 py-3 text-right font-medium">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {articles.map((a) => (
                <tr key={a.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-800 max-w-xs truncate">{a.title}</td>
                  <td className="px-4 py-3 text-gray-500 hidden md:table-cell text-xs">
                    {new Date(a.created_at).toLocaleDateString('vi-VN')}
                  </td>
                  <td className="px-4 py-3">
                    <span className={a.status === 'published' ? 'badge-published' : 'badge-draft'}>
                      {a.status === 'published' ? 'Xuất bản' : 'Nháp'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right space-x-3">
                    <button onClick={() => setEditing(a)} className="text-amber-600 hover:text-amber-800 text-xs font-medium">Sửa</button>
                    <button onClick={() => handleDelete(a.id, a.title)} className="text-red-500 hover:text-red-700 text-xs font-medium">Xóa</button>
                  </td>
                </tr>
              ))}
              {articles.length === 0 && (
                <tr><td colSpan={4} className="px-4 py-10 text-center text-gray-400">Chưa có bài viết nào</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {editing !== null && (
        <div className="w-80 flex-shrink-0">
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm sticky top-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-gray-800">{editing.id ? 'Chỉnh sửa' : 'Bài viết mới'}</h2>
              <button onClick={() => setEditing(null)} className="text-gray-400 hover:text-gray-700 text-lg">✕</button>
            </div>
            <form onSubmit={handleSave} className="space-y-3">
              <div>
                <label className="form-label">Tiêu đề *</label>
                <input name="title" defaultValue={editing.title || ''} required className="form-input" />
              </div>
              <div>
                <label className="form-label">Tóm tắt</label>
                <textarea name="summary" defaultValue={editing.summary || ''} rows={2} className="form-input resize-none" />
              </div>
              <div>
                <label className="form-label">Nội dung *</label>
                <textarea name="content" defaultValue={editing.content || ''} required rows={6} className="form-input resize-none" />
              </div>
              <div>
                <label className="form-label">URL ảnh</label>
                <input name="image_url" defaultValue={editing.image_url || ''} type="url" className="form-input" placeholder="https://..." />
              </div>
              <div>
                <label className="form-label">Trạng thái</label>
                <select name="status" defaultValue={editing.status || 'draft'} className="form-input">
                  <option value="draft">Nháp</option>
                  <option value="published">Xuất bản</option>
                </select>
              </div>
              <div className="flex gap-2 pt-1">
                <button type="submit" disabled={saving} className="btn-primary flex-1">{saving ? 'Đang lưu...' : 'Lưu'}</button>
                <button type="button" onClick={() => setEditing(null)} className="btn-secondary">Hủy</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
