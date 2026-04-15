'use client';

import { useEffect, useState } from 'react';
import { getAllEvents } from '@/lib/data';
import { saveEvent, deleteEvent } from '@/lib/actions';
import type { EventItem } from '@/lib/types';
import { X } from 'lucide-react';

const EMPTY: Partial<EventItem> = {};

export default function AdminEventsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [editing, setEditing] = useState<Partial<EventItem> | null>(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState('');

  async function reload() {
    setEvents(await getAllEvents());
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
    const result = await saveEvent({
      id: editing.id,
      title: fd.get('title') as string,
      description: (fd.get('description') as string) || null,
      location: (fd.get('location') as string) || null,
      start_date: (fd.get('start_date') as string) || null,
      end_date: (fd.get('end_date') as string) || null,
      status: fd.get('status') as 'published' | 'draft',
      image_url: (fd.get('image_url') as string) || null,
    });
    setSaving(false);
    if (result.success) {
      showToast(editing.id ? 'Đã cập nhật sự kiện!' : 'Đã thêm sự kiện mới!');
      setEditing(null);
      await reload();
    } else {
      showToast('Lỗi: ' + result.error);
    }
  }

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Xóa sự kiện "${title}"?`)) return;
    await deleteEvent(id);
    showToast('Đã xóa sự kiện.');
    await reload();
  }

  return (
    <div className="flex gap-6">
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-serif font-bold text-gray-800">Quản lý Sự kiện</h1>
            <p className="text-gray-500 text-sm">{events.length} sự kiện</p>
          </div>
          <button onClick={() => setEditing(EMPTY)} className="btn-primary">+ Tạo sự kiện</button>
        </div>

        {toast && (
          <div className="mb-4 text-green-700 bg-green-50 border border-green-200 rounded-lg px-4 py-2.5 text-sm">{toast}</div>
        )}

        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Tên sự kiện</th>
                <th className="px-4 py-3 text-left font-medium hidden md:table-cell">Ngày bắt đầu</th>
                <th className="px-4 py-3 text-left font-medium">Trạng thái</th>
                <th className="px-4 py-3 text-right font-medium">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {events.map((ev) => (
                <tr key={ev.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-800 max-w-xs truncate">{ev.title}</td>
                  <td className="px-4 py-3 text-gray-500 hidden md:table-cell text-xs">
                    {ev.start_date ? new Date(ev.start_date).toLocaleDateString('vi-VN') : '—'}
                  </td>
                  <td className="px-4 py-3">
                    <span className={ev.status === 'published' ? 'badge-published' : 'badge-draft'}>
                      {ev.status === 'published' ? 'Xuất bản' : 'Nháp'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right space-x-3">
                    <button onClick={() => setEditing(ev)} className="text-amber-600 hover:text-amber-800 text-xs font-medium">Sửa</button>
                    <button onClick={() => handleDelete(ev.id, ev.title)} className="text-red-500 hover:text-red-700 text-xs font-medium">Xóa</button>
                  </td>
                </tr>
              ))}
              {events.length === 0 && (
                <tr><td colSpan={4} className="px-4 py-10 text-center text-gray-400">Chưa có sự kiện nào</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {editing !== null && (
        <div className="w-80 flex-shrink-0">
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm sticky top-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-gray-800">{editing.id ? 'Chỉnh sửa' : 'Sự kiện mới'}</h2>
              <button onClick={() => setEditing(null)} className="text-gray-400 hover:text-gray-700 p-0.5 rounded transition-colors"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSave} className="space-y-3">
              <div>
                <label className="form-label">Tên sự kiện *</label>
                <input name="title" defaultValue={editing.title || ''} required className="form-input" />
              </div>
              <div>
                <label className="form-label">Mô tả</label>
                <textarea name="description" defaultValue={editing.description || ''} rows={3} className="form-input resize-none" />
              </div>
              <div>
                <label className="form-label">Địa điểm</label>
                <input name="location" defaultValue={editing.location || ''} className="form-input" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="form-label">Ngày bắt đầu</label>
                  <input name="start_date" type="date" defaultValue={editing.start_date || ''} className="form-input" />
                </div>
                <div>
                  <label className="form-label">Ngày kết thúc</label>
                  <input name="end_date" type="date" defaultValue={editing.end_date || ''} className="form-input" />
                </div>
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
