'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

const navItems = [
  { href: '/quan-tri', label: 'Tổng quan', icon: '📊' },
  { href: '/quan-tri/hien-vat', label: 'Hiện vật', icon: '🏺' },
  { href: '/quan-tri/bai-viet', label: 'Bài viết', icon: '📜' },
  { href: '/quan-tri/su-kien', label: 'Sự kiện', icon: '🎪' },
  { href: '/quan-tri/tin-nhan', label: 'Tin nhắn', icon: '✉️' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (!sessionStorage.getItem('btds-admin')) {
        router.replace('/dang-nhap');
      } else {
        setReady(true);
      }
    }
  }, [router]);

  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-amber-50">
        <div className="text-amber-600 text-sm">Đang xác thực...</div>
      </div>
    );
  }

  function logout() {
    sessionStorage.removeItem('btds-admin');
    router.push('/dang-nhap');
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-56 flex-shrink-0 bg-amber-950 text-white flex flex-col shadow-xl">
        <div className="p-5 border-b border-amber-800">
          <div className="text-2xl mb-1">🥥</div>
          <div className="font-serif font-bold text-base text-white">Quản trị</div>
          <div className="text-amber-400 text-xs mt-0.5">Bảo tàng Dừa Sáp</div>
        </div>

        <nav className="flex-1 p-3 space-y-0.5">
          {navItems.map((item) => {
            const active =
              item.href === '/quan-tri' ? pathname === '/quan-tri' : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  active
                    ? 'bg-amber-700 text-white font-medium'
                    : 'text-amber-300 hover:bg-amber-800/70 hover:text-white'
                }`}
              >
                <span className="text-base">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-amber-800 space-y-0.5">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2 px-3 py-2 text-amber-400 hover:text-white text-xs rounded-lg hover:bg-amber-800 transition-colors"
          >
            🌐 Xem website
          </Link>
          <button
            onClick={logout}
            className="w-full flex items-center gap-2 px-3 py-2 text-amber-400 hover:text-red-300 text-xs rounded-lg hover:bg-amber-800 transition-colors"
          >
            🚪 Đăng xuất
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto p-8 min-w-0">{children}</main>
    </div>
  );
}
