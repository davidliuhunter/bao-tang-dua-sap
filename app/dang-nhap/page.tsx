'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { TreePalm, ChevronLeft } from 'lucide-react';

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'btds2026';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    if (username === 'admin' && password === ADMIN_PASSWORD) {
      sessionStorage.setItem('btds-admin', '1');
      router.push('/quan-tri');
    } else {
      setError('Tên đăng nhập hoặc mật khẩu không đúng.');
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-950 via-amber-900 to-amber-700 flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-8">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-3">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center">
                <TreePalm className="w-8 h-8 text-amber-700" />
              </div>
            </div>
            <h1 className="font-serif text-2xl font-bold text-amber-950">Đăng nhập</h1>
            <p className="text-amber-500 text-sm mt-1">Bảo tàng Dừa Sáp · Quản trị viên</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="form-label">Tên đăng nhập</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="form-input"
                autoComplete="username"
              />
            </div>
            <div>
              <label className="form-label">Mật khẩu</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                placeholder="••••••••"
                autoComplete="current-password"
                autoFocus
              />
            </div>
            {error && (
              <div className="bg-red-50 text-red-700 text-sm px-3 py-2.5 rounded-xl border border-red-200">
                {error}
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full mt-2"
            >
              {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link href="/" className="text-amber-500 text-sm hover:text-amber-700 transition-colors flex items-center justify-center gap-1">
              <ChevronLeft className="w-4 h-4" /> Về trang chủ
            </Link>
          </div>
        </div>

        <div className="bg-amber-50 border-t border-amber-100 px-8 py-4 text-center">
          <p className="text-xs text-amber-500">
            Demo: <span className="font-mono font-semibold text-amber-700">admin</span> /{' '}
            <span className="font-mono font-semibold text-amber-700">btds2026</span>
          </p>
        </div>
      </div>
    </div>
  );
}
