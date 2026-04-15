import type { Article } from '@/lib/types';
import ImagePlaceholder from './ImagePlaceholder';

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

export default function ArticleCard({ article }: { article: Article }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm card-hover border border-amber-100 flex flex-col md:flex-row">
      <div className="relative h-44 md:h-auto md:w-52 flex-shrink-0 bg-amber-100">
        {article.image_url ? (
          <img src={article.image_url} alt={article.title} className="w-full h-full object-cover" />
        ) : (
          <ImagePlaceholder type="article" />
        )}
      </div>
      <div className="p-5 flex flex-col justify-between">
        <div>
          <p className="text-xs text-amber-400 mb-1.5 font-medium">{formatDate(article.created_at)}</p>
          <h3 className="font-serif font-bold text-amber-950 text-lg leading-tight mb-2">
            {article.title}
          </h3>
          {article.summary && (
            <p className="text-sm text-amber-700 leading-relaxed line-clamp-3">{article.summary}</p>
          )}
        </div>
        <p className="text-xs text-amber-600 font-medium mt-3">Đọc tiếp →</p>
      </div>
    </div>
  );
}
