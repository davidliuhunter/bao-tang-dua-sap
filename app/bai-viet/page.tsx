import PublicLayout from '@/components/PublicLayout';
import ImagePlaceholder from '@/components/ImagePlaceholder';
import { getPublishedArticles } from '@/lib/data';
import { ScrollText } from 'lucide-react';

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

export default async function ArticlesPage() {
  const articles = await getPublishedArticles();

  return (
    <PublicLayout>
      <div className="page-hero">
        <div className="container-museum">
          <h1 className="font-serif text-4xl font-bold mb-2">Bài viết</h1>
          <p className="text-amber-200">Kiến thức và câu chuyện về Dừa Sáp Cầu Kè</p>
        </div>
      </div>

      <div className="container-museum py-12">
        {articles.length === 0 ? (
          <div className="text-center py-20 text-amber-600">
            <div className="flex justify-center mb-4"><ScrollText className="w-12 h-12 opacity-40" /></div>
            <p className="text-lg">Chưa có bài viết nào được xuất bản.</p>
          </div>
        ) : (
          <div className="space-y-8 max-w-3xl mx-auto">
            {articles.map((article) => (
              <article
                key={article.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-amber-100"
              >
                <div className="h-52 bg-amber-100">
                  {article.image_url ? (
                    <img
                      src={article.image_url}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <ImagePlaceholder type="article" />
                  )}
                </div>
                <div className="p-7">
                  <p className="text-xs text-amber-400 font-medium mb-2">
                    {formatDate(article.created_at)}
                  </p>
                  <h2 className="font-serif text-2xl font-bold text-amber-950 mb-4 leading-tight">
                    {article.title}
                  </h2>
                  {article.summary && (
                    <p className="text-amber-700 leading-relaxed mb-5 text-sm border-l-4 border-amber-200 pl-4 italic">
                      {article.summary}
                    </p>
                  )}
                  <div className="text-amber-800 text-sm leading-relaxed whitespace-pre-line">
                    {article.content}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </PublicLayout>
  );
}
