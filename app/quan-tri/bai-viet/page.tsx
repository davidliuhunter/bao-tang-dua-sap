'use client';

import { useEffect, useState } from 'react';
import { getAllArticles } from '@/lib/data';
import { saveArticle, deleteArticle } from '@/lib/actions';
import ImageUpload from '@/components/ImageUpload';
import RichTextEditor from '@/components/RichTextEditor';
import type { Article } from '@/lib/types';

const EMPTY: Partial<Article> = {};

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [editing, setEditing] = useState<Partial<Article> | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');
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

  function openEdit(a: Partial<Article>) {
    setEditing(a);
    setImageUrl(a.image_url ?? '');
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
      image_url: imageUrl || null,
    });
    setSaving(false);
    if (result.success) {
      showToast(editing.id ? 'ÄÃ£ cáº­p nháº­t bÃ i viáº¿t!' : 'ÄÃ£ thÃªm bÃ i viáº¿t má»›i!');
      setEditing(null);
      await reload();
    } else {
      showToast('Lá»—i: ' + result.error);
    }
  }

  async function handleDelete(id: string, title: string) {
    if (!confirm(`XÃ³a bÃ i viáº¿t "${title}"?`)) return;
    await deleteArticle(id);
    showToast('ÄÃ£ xÃ³a bÃ i viáº¿t.');
    await reload();
  }

  return (
    <div className="flex gap-6">
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-serif font-bold text-gray-800">Quáº£n lÃ½ BÃ i viáº¿t</h1>
            <p className="text-gray-500 text-sm">{articles.length} bÃ i viáº¿t</p>
          </div>
          <button onClick={() => openEdit(EMPTY)} className="btn-primary">
            + Viáº¿t má»›i
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
                <th className="px-4 py-3 text-left font-medium">TiÃªu Ä‘á»</th>
                <th className="px-4 py-3 text-left font-medium hidden md:table-cell">NgÃ y táº¡o</th>
                <th className="px-4 py-3 text-left font-medium">Tráº¡ng thÃ¡i</th>
                <th className="px-4 py-3 text-right font-medium">Thao tÃ¡c</th>
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
                      {a.status === 'published' ? 'Xuáº¥t báº£n' : 'NhÃ¡p'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right space-x-3">
                    <button onClick={() => openEdit(a)} className="text-amber-600 hover:text-amber-800 text-xs font-medium">Sá»­a</button>
                    <button onClick={() => handleDelete(a.id, a.title)} className="text-red-500 hover:text-red-700 text-xs font-medium">XÃ³a</button>
                  </td>
                </tr>
              ))}
              {articles.length === 0 && (
                <tr><td colSpan={4} className="px-4 py-10 text-center text-gray-400">ChÆ°a cÃ³ bÃ i viáº¿t nÃ o</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {editing !== null && (
        <div className="w-80 flex-shrink-0">
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm sticky top-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-gray-800">{editing.id ? 'Chá»‰nh sá»­a' : 'BÃ i viáº¿t má»›i'}</h2>
              <button onClick={() => setEditing(null)} className="text-gray-400 hover:text-gray-700 text-lg">âœ•</button>
            </div>
            <form onSubmit={handleSave} className="space-y-3">
              <div>
                <label className="form-label">TiÃªu Ä‘á» *</label>
                <input name="title" defaultValue={editing.title || ''} required className="form-input" />
              </div>
              <div>
                <label className="form-label">TÃ³m táº¯t</label>
                <textarea name="summary" defaultValue={editing.summary || ''} rows={2} className="form-input resize-none" />
              </div>
              <div>
                <label className="form-label">Ná»™i dung *</label>
                <textarea name="content" defaultValue={editing.content || ''} required rows={6} className="form-input resize-none" />
              </div>
              <div>
                <label className="form-label">áº¢nh bÃ i viáº¿t</label>
                <ImageUpload currentUrl={imageUrl} onUploaded={(url) => setImageUrl(url)} />
              </div>
              <div>
                <label className="form-label">Tráº¡ng thÃ¡i</label>
                <select name="status" defaultValue={editing.status || 'draft'} className="form-input">
                  <option value="draft">NhÃ¡p</option>
                  <option value="published">Xuáº¥t báº£n</option>
                </select>
              </div>
              <div className="flex gap-2 pt-1">
                <button type="submit" disabled={saving} className="btn-primary flex-1">{saving ? 'Äang lÆ°u...' : 'LÆ°u'}</button>
                <button type="button" onClick={() => setEditing(null)} className="btn-secondary">Há»§y</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
