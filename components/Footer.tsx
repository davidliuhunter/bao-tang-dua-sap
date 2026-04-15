import Link from 'next/link';
import { TreePalm, MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-amber-950 text-amber-100 mt-16">
      <div className="container-museum py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-serif text-xl font-bold text-white mb-3 flex items-center gap-2"><TreePalm className="w-5 h-5 text-amber-400" /> Bảo tàng Dừa Sáp</h3>
          <p className="text-amber-300 text-sm leading-relaxed">
            Bảo tàng lưu giữ và giới thiệu giá trị văn hóa, lịch sử của giống
            dừa quý hiếm Dừa Sáp Cầu Kè, Trà Vinh.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-3">Khám phá</h4>
          <ul className="space-y-2 text-sm">
            {(
              [
                ['/hien-vat', 'Hiện vật'],
                ['/bai-viet', 'Bài viết'],
                ['/su-kien', 'Sự kiện'],
                ['/lien-he', 'Liên hệ'],
              ] as [string, string][]
            ).map(([href, label]) => (
              <li key={href}>
                <Link href={href} className="text-amber-300 hover:text-amber-100 transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-3">Liên hệ</h4>
          <ul className="space-y-2 text-sm text-amber-300">
            <li className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 shrink-0" /> Huyện Cầu Kè, Tỉnh Trà Vinh</li>
            <li className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 shrink-0" /> (0294) 123 4567</li>
            <li className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 shrink-0" /> info@baotangduasap.vn</li>
            <li className="flex items-center gap-2"><Clock className="w-3.5 h-3.5 shrink-0" /> Thứ 2 – CN · 8:00 – 17:00</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-amber-900">
        <div className="container-museum py-4 text-center text-amber-500 text-xs">
          © 2026 Đồ án học phần - Hệ thống website quản lý Bảo tàng Dừa Sáp.
        </div>
      </div>
    </footer>
  );
}
