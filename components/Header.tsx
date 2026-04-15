'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { TreePalm, Menu, X } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Trang chủ' },
  { href: '/hien-vat', label: 'Hiện vật' },
  { href: '/bai-viet', label: 'Bài viết' },
  { href: '/su-kien', label: 'Sự kiện' },
  { href: '/lien-he', label: 'Liên hệ' },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-amber-950 to-amber-800 text-white shadow-lg sticky top-0 z-50">
      <div className="container-museum">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 bg-amber-400 rounded-full flex items-center justify-center text-amber-900 font-bold text-lg flex-shrink-0">
              <TreePalm className="w-5 h-5" />
            </div>
            <div className="leading-tight">
              <div className="font-serif font-bold text-base group-hover:text-amber-200 transition-colors">
                Bảo tàng Dừa Sáp
              </div>
              <div className="text-amber-300 text-xs">Cầu Kè · Trà Vinh</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? 'bg-amber-700 text-white'
                    : 'text-amber-100 hover:bg-amber-700/60 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/dang-nhap"
              className="ml-3 px-4 py-1.5 bg-amber-400 hover:bg-amber-300 rounded-full text-sm font-semibold text-amber-950 transition-colors"
            >
              Quản trị
            </Link>
          </nav>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded-md text-amber-200 hover:text-white hover:bg-amber-800"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-amber-800">
          <div className="container-museum py-2 flex flex-col gap-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded text-sm ${
                  pathname === link.href ? 'bg-amber-700 text-white' : 'text-amber-200'
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/dang-nhap"
              className="px-3 py-2 mt-1 bg-amber-400 text-amber-950 rounded text-sm font-semibold"
              onClick={() => setMenuOpen(false)}
            >
              Quản trị
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
