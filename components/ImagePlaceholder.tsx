export default function ImagePlaceholder({
  type,
  className = '',
}: {
  type: 'artifact' | 'article' | 'event';
  className?: string;
}) {
  const config = {
    artifact: { icon: '🏺', bg: 'from-amber-100 to-amber-200' },
    article: { icon: '📜', bg: 'from-blue-50 to-amber-100' },
    event: { icon: '🎪', bg: 'from-amber-100 to-orange-100' },
  };
  const { icon, bg } = config[type];

  return (
    <div
      className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${bg} ${className}`}
    >
      <span className="text-5xl opacity-30 select-none">{icon}</span>
    </div>
  );
}
