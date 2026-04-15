'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getAllArtifacts, getAllArticles, getAllEvents, getAllContactMessages, getTopViewedArtifacts } from '@/lib/data';
import type { Artifact } from '@/lib/types';

export default function AdminOverviewPage() {
  const [stats, setStats] = useState({ artifacts: 0, articles: 0, events: 0, messages: 0 });
  const [topViewed, setTopViewed] = useState<Artifact[]>([]);

  useEffect(() => {
    async function load() {
      const [artifacts, articles, events, msgs, top] = await Promise.all([
        getAllArtifacts(),
        getAllArticles(),
        getAllEvents(),
        getAllContactMessages(),
        getTopViewedArtifacts(5),
      ]);
      setStats({
        artifacts: artifacts.length,
        articles: articles.length,
        events: events.length,
        messages: msgs.length,
      });
      setTopViewed(top);
    }
    load();
  }, []);

  const cards = [
    { href: '/quan-tri/hien-vat', icon: '🏺', label: 'Hiện vật', count: stats.artifacts, color: 'bg-amber-100 text-amber-800 border-amber-200' },
    { href: '/quan-tri/bai-viet', icon: '📜', label: 'Bài viết', count: stats.articles, color: 'bg-blue-50 text-blue-800 border-blue-200' },
    { href: '/quan-tri/su-kien', icon: '🎪', label: 'Sự kiện', count: stats.events, color: 'bg-green-50 text-green-800 border-green-200' },
    { href: '/quan-tri/tin-nhan', icon: '✉️', label: 'Tin nhắn', count: stats.messages, color: 'bg-purple-50 text-purple-800 border-purple-200' },
  ];

  const maxViews = topViewed[0]?.view_count ?? 1;

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

      {/* Top viewed */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm">
        <h2 className="font-semibold text-gray-800 mb-4">📊 Hiện vật được xem nhiều nhất</h2>
        {topViewed.length === 0 ? (
          <p className="text-sm text-gray-400">Chưa có dữ liệu lượt xem.</p>
        ) : (
          <div className="space-y-3">
            {topViewed.map((a, i) => (
              <div key={a.id} className="flex items-center gap-3">
                <span className="text-xs font-bold text-amber-600 w-4">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700 truncate">{a.name}</span>
                    <span className="text-xs text-gray-400 ml-2 shrink-0">{a.view_count ?? 0} lượt</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-500 rounded-full transition-all"
                      style={{ width: `${Math.round(((a.view_count ?? 0) / maxViews) * 100)}%` }}
                    />
                  </div>
                </div>
                <Link href={`/hien-vat/${a.id}`} target="_blank" className="text-xs text-amber-600 hover:underline shrink-0">
                  Xem →
                </Link>
              </div>
            ))}
          </div>
        )}
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
