'use client';

import { useEffect, useState } from 'react';
import { getAllContactMessages } from '@/lib/data';
import { markMessageRead } from '@/lib/actions';
import type { ContactMessage } from '@/lib/types';
import { X, ChevronRight, Mail } from 'lucide-react';

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [selected, setSelected] = useState<ContactMessage | null>(null);

  async function reload() {
    setMessages(await getAllContactMessages());
  }

  useEffect(() => { reload(); }, []);

  async function handleRead(msg: ContactMessage) {
    setSelected(msg);
    if (!msg.is_read) {
      await markMessageRead(msg.id);
      setMessages((prev) => prev.map((m) => (m.id === msg.id ? { ...m, is_read: true } : m)));
    }
  }

  const unread = messages.filter((m) => !m.is_read).length;

  return (
    <div className="flex gap-6">
      <div className="flex-1 min-w-0">
        <div className="mb-6">
          <h1 className="text-2xl font-serif font-bold text-gray-800">Tin nhắn</h1>
          <p className="text-gray-500 text-sm">
            {messages.length} tin nhắn
            {unread > 0 && <span className="ml-2 text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-medium">{unread} chưa đọc</span>}
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Người gửi</th>
                <th className="px-4 py-3 text-left font-medium hidden md:table-cell">Email</th>
                <th className="px-4 py-3 text-left font-medium hidden lg:table-cell">Thời gian</th>
                <th className="px-4 py-3 text-left font-medium">Trạng thái</th>
                <th className="px-4 py-3 text-right font-medium">Chi tiết</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {messages.map((msg) => (
                <tr
                  key={msg.id}
                  className={`hover:bg-gray-50 cursor-pointer ${!msg.is_read ? 'bg-blue-50/40 font-medium' : ''}`}
                  onClick={() => handleRead(msg)}
                >
                  <td className="px-4 py-3 text-gray-800">{msg.full_name}</td>
                  <td className="px-4 py-3 text-gray-500 hidden md:table-cell">{msg.email}</td>
                  <td className="px-4 py-3 text-gray-400 hidden lg:table-cell text-xs">
                    {new Date(msg.created_at).toLocaleDateString('vi-VN')}
                  </td>
                  <td className="px-4 py-3">
                    {msg.is_read ? (
                      <span className="text-xs text-gray-400">Đã đọc</span>
                    ) : (
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">Mới</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className="text-amber-600 text-xs font-medium flex items-center justify-end gap-0.5">Xem <ChevronRight className="w-3.5 h-3.5" /></span>
                  </td>
                </tr>
              ))}
              {messages.length === 0 && (
                <tr><td colSpan={5} className="px-4 py-10 text-center text-gray-400">Chưa có tin nhắn nào</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selected && (
        <div className="w-80 flex-shrink-0">
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm sticky top-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-gray-800">Chi tiết tin nhắn</h2>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-700 p-0.5 rounded transition-colors"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-400 font-medium mb-0.5">Người gửi</p>
                <p className="text-sm text-gray-800 font-medium">{selected.full_name}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium mb-0.5">Email</p>
                <a href={`mailto:${selected.email}`} className="text-sm text-amber-700 hover:underline">{selected.email}</a>
              </div>
              {selected.phone && (
                <div>
                  <p className="text-xs text-gray-400 font-medium mb-0.5">Điện thoại</p>
                  <p className="text-sm text-gray-800">{selected.phone}</p>
                </div>
              )}
              <div>
                <p className="text-xs text-gray-400 font-medium mb-0.5">Thời gian</p>
                <p className="text-sm text-gray-600">{new Date(selected.created_at).toLocaleString('vi-VN')}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium mb-1">Nội dung</p>
                <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-800 leading-relaxed border border-gray-100">
                  {selected.message}
                </div>
              </div>
              <a
                href={`mailto:${selected.email}`}
                className="btn-primary w-full text-center flex items-center justify-center gap-2 mt-2"
              >
                <Mail className="w-4 h-4" /> Phản hồi qua email
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
