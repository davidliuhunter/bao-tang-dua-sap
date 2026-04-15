'use client';

import { useRef, useState } from 'react';
import PublicLayout from '@/components/PublicLayout';
import { submitContact } from '@/lib/actions';

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    const result = await submitContact(new FormData(e.currentTarget));
    if (result.success) {
      setStatus('success');
      formRef.current?.reset();
    } else {
      setStatus('error');
      setErrorMsg(result.error ?? 'Có lỗi xảy ra.');
    }
  }

  return (
    <PublicLayout>
      <div className="page-hero">
        <div className="container-museum">
          <h1 className="font-serif text-4xl font-bold mb-2">Liên hệ</h1>
          <p className="text-amber-200">Gửi câu hỏi hoặc yêu cầu đến bảo tàng</p>
        </div>
      </div>

      <div className="container-museum py-12 grid md:grid-cols-2 gap-12">
        {/* Info */}
        <div>
          <h2 className="font-serif text-2xl font-bold text-amber-950 mb-6">Thông tin liên hệ</h2>
          <div className="space-y-4">
            {(
              [
                { icon: '📍', label: 'Địa chỉ', value: 'Huyện Cầu Kè, Tỉnh Trà Vinh, Việt Nam' },
                { icon: '📞', label: 'Điện thoại', value: '(0294) 123 4567' },
                { icon: '✉️', label: 'Email', value: 'info@baotangduasap.vn' },
                { icon: '⏰', label: 'Giờ mở cửa', value: 'Thứ 2 – Chủ nhật\n8:00 – 17:00' },
              ] as { icon: string; label: string; value: string }[]
            ).map((item) => (
              <div key={item.label} className="flex gap-4 p-4 bg-amber-50 rounded-xl border border-amber-100">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <p className="text-xs text-amber-500 font-semibold mb-0.5">{item.label}</p>
                  <p className="text-amber-950 text-sm whitespace-pre-line">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div>
          <h2 className="font-serif text-2xl font-bold text-amber-950 mb-6">Gửi tin nhắn</h2>

          {status === 'success' ? (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
              <div className="text-5xl mb-3">✅</div>
              <h3 className="font-semibold text-green-800 text-lg mb-2">Gửi thành công!</h3>
              <p className="text-green-700 text-sm mb-5">Chúng tôi sẽ phản hồi sớm nhất có thể.</p>
              <button onClick={() => setStatus('idle')} className="btn-secondary">
                Gửi tin khác
              </button>
            </div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="form-label">Họ tên *</label>
                <input name="full_name" type="text" required className="form-input" placeholder="Nguyễn Văn A" />
              </div>
              <div>
                <label className="form-label">Email *</label>
                <input name="email" type="email" required className="form-input" placeholder="email@example.com" />
              </div>
              <div>
                <label className="form-label">Số điện thoại</label>
                <input name="phone" type="tel" className="form-input" placeholder="0901 234 567" />
              </div>
              <div>
                <label className="form-label">Nội dung *</label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  className="form-input resize-none"
                  placeholder="Nhập nội dung tin nhắn..."
                />
              </div>
              {status === 'error' && (
                <div className="bg-red-50 text-red-700 text-sm px-4 py-3 rounded-xl border border-red-200">
                  {errorMsg}
                </div>
              )}
              <button type="submit" disabled={status === 'loading'} className="btn-primary w-full">
                {status === 'loading' ? 'Đang gửi...' : 'Gửi tin nhắn'}
              </button>
            </form>
          )}
        </div>
      </div>
    </PublicLayout>
  );
}
