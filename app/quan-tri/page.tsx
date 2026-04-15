'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getAllArtifacts, getAllArticles, getAllEvents, getAllContactMessages } from '@/lib/data';

export default function AdminOverviewPage() {
  const [stats, setStats] = useState({ artifacts: 0, articles: 0, events: 0, messages: 0 });

  useEffect(() => {
    async function load() {
      const [artifacts, articles, events, msgs] = await Promise.all([
        getAllArtifacts(),
        getAllArticles(),
        getAllEvents(),
        getAllContactMessages(),
      ]);
      setStats({
        artifacts: artifacts.length,
        articles: articles.length,
        events: events.length,
        messages: msgs.length,
      });
    }
    load();
  }, []);

  const cards = [
    { href: '/quan-tri/hien-vat', icon: '🏺', label: 'Hiện vật', count: stats.artifacts, color: 'bg-amber-100 text-amber-800 border-amber-200' },
    { href: '/quan-tri/bai-viet', icon: '📜', label: 'Bài viết', count: stats.articles, color: 'bg-blue-50 text-blue-800 border-blue-200' },
    { href: '/quan-tri/su-kien', icon: '🎪', label: 'Sự kiện', count: stats.events, color: 'bg-green-50 text-green-800 border-green-200' },
    { href: '/quan-tri/tin-nhan', icon: '✉️', label: 'Tin nhắn', count: stats.messages, color: 'bg-purple-50 text-purple-800 border-purple-200' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-serif font-bold text-gray-800 mb-1">Tổng quan</h1>
      <p className="text-gray-500 text-sm mb-8">Chào mừng đến trang quản trị Bảo tàng Dừa Sáp</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {cards.map((card) => (
          <Link key={card.href} href={card.href} className="group">
            <div className={`${card.color} border rounded-xl p-5 card-hover`}>
              <div className="text-3xl mb-2">{card.icon}</div>
              <div className="text-3xl font-bold">{card.count}</div>
              <div className="text-sm font-medium mt-0.5 opacity-80">{card.label}</div>
            </div>
          </Link>
        ))}
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
        <h2 className="font-semibold text-amber-900 mb-4">🚀 Thao tác nhanh</h2>
        <div className="flex flex-wrap gap-3">
          <Link href="/quan-tri/hien-vat" className="btn-primary text-xs">+ Thêm hiện vật</Link>
          <Link href="/quan-tri/bai-viet" className="btn-primary text-xs">+ Viết bài mới</Link>
          <Link href="/quan-tri/su-kien" className="btn-primary text-xs">+ Tạo sự kiện</Link>
          <Link href="/" target="_blank" className="btn-secondary text-xs">🌐 Xem trang web</Link>
        </div>
      </div>
    </div>
  );
}
