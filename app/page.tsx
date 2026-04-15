import Link from 'next/link';
import PublicLayout from '@/components/PublicLayout';
import ArtifactCard from '@/components/ArtifactCard';
import ArticleCard from '@/components/ArticleCard';
import EventCard from '@/components/EventCard';
import { getPublishedArtifacts, getPublishedArticles, getPublishedEvents } from '@/lib/data';

export default async function HomePage() {
  const [artifacts, articles, events] = await Promise.all([
    getPublishedArtifacts(),
    getPublishedArticles(),
    getPublishedEvents(),
  ]);

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="bg-gradient-to-br from-amber-950 via-amber-900 to-amber-700 text-white py-24">
        <div className="container-museum text-center">
          <div className="text-7xl mb-5 drop-shadow-lg">🥥</div>
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-3 drop-shadow">
            Bảo tàng Dừa Sáp
          </h1>
          <p className="text-amber-300 text-xl mb-3 font-medium tracking-wide">
            Cầu Kè · Trà Vinh · Việt Nam
          </p>
          <p className="text-amber-100 max-w-2xl mx-auto text-base leading-relaxed mt-4 opacity-90">
            Nơi lưu giữ và tôn vinh giá trị văn hóa, lịch sử của giống dừa quý hiếm — niềm tự hào đặc sản của vùng đất Cầu Kè.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            <Link href="/hien-vat" className="px-8 py-3 bg-amber-400 hover:bg-amber-300 text-amber-950 font-bold rounded-full transition-all shadow-lg hover:scale-105">
              Khám phá hiện vật
            </Link>
            <Link href="/bai-viet" className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/40 font-semibold rounded-full transition-all hover:scale-105">
              Đọc bài viết
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-amber-800 text-white py-5">
        <div className="container-museum grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {([
            { num: `${artifacts.length}+`, label: 'Hiện vật' },
            { num: `${articles.length}+`, label: 'Bài viết' },
            { num: `${events.length}+`, label: 'Sự kiện' },
            { num: '300+', label: 'Năm lịch sử' },
          ] as { num: string; label: string }[]).map((s) => (
            <div key={s.label}>
              <div className="font-serif text-3xl font-bold text-amber-300">{s.num}</div>
              <div className="text-amber-200 text-sm mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Artifacts */}
      <section className="py-16 container-museum">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="section-title">Hiện vật nổi bật</h2>
            <p className="section-sub">Những hiện vật đặc sắc trong bộ sưu tập</p>
          </div>
          <Link href="/hien-vat" className="text-amber-600 hover:text-amber-900 text-sm font-semibold">
            Xem tất cả →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {artifacts.slice(0, 4).map((a) => (
            <ArtifactCard key={a.id} artifact={a} />
          ))}
        </div>
      </section>

      {/* About */}
      <section className="bg-amber-100 py-16">
        <div className="container-museum grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-serif text-3xl font-bold text-amber-950 mb-4">Về Dừa Sáp Cầu Kè</h2>
            <p className="text-amber-800 leading-relaxed mb-4">
              Dừa Sáp (Makapuno) là giống dừa đặc biệt với cơm đặc như thạch, hương thơm đặc trưng và hàm lượng dinh dưỡng cao. Cầu Kè, Trà Vinh là vùng đất gắn liền với loài dừa quý hiếm này suốt hơn 300 năm lịch sử.
            </p>
            <p className="text-amber-800 leading-relaxed mb-6">
              Bảo tàng được thành lập nhằm bảo tồn và lan tỏa di sản văn hóa — kinh tế độc đáo này đến thế hệ tương lai.
            </p>
            <Link href="/hien-vat" className="btn-primary inline-block">Tham quan bảo tàng</Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {([
              { icon: '🌴', title: 'Giống đặc hữu', desc: 'Dừa sáp chỉ xuất hiện nhiều nhất tại Cầu Kè, tỷ lệ tự nhiên thấp và quý hiếm' },
              { icon: '🏛️', title: 'Di sản 300 năm', desc: 'Lịch sử trồng và gìn giữ dừa sáp của người Khmer bản địa' },
              { icon: '🧬', title: 'Khoa học hiện đại', desc: 'Nhân giống nuôi cấy phôi đạt tỷ lệ 90–100% quả sáp' },
              { icon: '🎪', title: 'Văn hóa sống', desc: 'Lễ hội, triển lãm định kỳ lan tỏa giá trị di sản' },
            ] as { icon: string; title: string; desc: string }[]).map((item) => (
              <div key={item.title} className="bg-white rounded-xl p-4 shadow-sm border border-amber-100">
                <div className="text-3xl mb-2">{item.icon}</div>
                <h4 className="font-semibold text-amber-950 text-sm mb-1">{item.title}</h4>
                <p className="text-amber-600 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Articles */}
      {articles.length > 0 && (
        <section className="py-16 container-museum">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="section-title">Bài viết mới nhất</h2>
              <p className="section-sub">Kiến thức và câu chuyện về Dừa Sáp</p>
            </div>
            <Link href="/bai-viet" className="text-amber-600 hover:text-amber-900 text-sm font-semibold">Xem tất cả →</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {articles.slice(0, 2).map((a) => (<ArticleCard key={a.id} article={a} />))}
          </div>
        </section>
      )}

      {/* Events */}
      {events.length > 0 && (
        <section className="bg-amber-900 py-16">
          <div className="container-museum">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="font-serif text-3xl font-bold text-white mb-2">Sự kiện sắp tới</h2>
                <p className="text-amber-300">Đừng bỏ lỡ các hoạt động của bảo tàng</p>
              </div>
              <Link href="/su-kien" className="text-amber-400 hover:text-amber-300 text-sm font-semibold">Xem tất cả →</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {events.slice(0, 2).map((e) => (<EventCard key={e.id} event={e} dark />))}
            </div>
          </div>
        </section>
      )}
    </PublicLayout>
  );
}