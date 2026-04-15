import type { EventItem } from '@/lib/types';
import ImagePlaceholder from './ImagePlaceholder';
import { CalendarDays, MapPin } from 'lucide-react';

function formatRange(start: string | null, end: string | null) {
  if (!start) return '';
  const opts: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
  const s = new Date(start).toLocaleDateString('vi-VN', opts);
  if (!end) return s;
  const e = new Date(end).toLocaleDateString('vi-VN', opts);
  return s === e ? s : `${s} – ${e}`;
}

export default function EventCard({ event, dark }: { event: EventItem; dark?: boolean }) {
  const textMain = dark ? 'text-white' : 'text-amber-950';
  const textSub = dark ? 'text-amber-200' : 'text-amber-700';
  const textMeta = dark ? 'text-amber-300' : 'text-amber-500';
  const bg = dark ? 'bg-amber-800/60 border-amber-700 hover:bg-amber-700/60' : 'bg-white border-amber-100';

  return (
    <div className={`rounded-xl overflow-hidden border card-hover flex ${bg}`}>
      <div className={`relative w-28 flex-shrink-0 ${dark ? 'bg-amber-900' : 'bg-amber-100'}`}>
        {event.image_url ? (
          <img src={event.image_url} alt={event.title} className="w-full h-full object-cover" />
        ) : (
          <ImagePlaceholder type="event" />
        )}
      </div>
      <div className="p-4 flex flex-col justify-between">
        <div>
          <h3 className={`font-semibold text-sm leading-snug mb-1.5 ${textMain}`}>{event.title}</h3>
          {event.description && (
            <p className={`text-xs line-clamp-2 leading-relaxed ${textSub}`}>{event.description}</p>
          )}
        </div>
        <div className="mt-3 space-y-1">
          {event.start_date && (
            <p className={`text-xs flex items-center gap-1.5 ${textMeta}`}>
              <CalendarDays className="w-3.5 h-3.5 shrink-0" />
              {formatRange(event.start_date, event.end_date)}
            </p>
          )}
          {event.location && (
            <p className={`text-xs flex items-center gap-1.5 ${textMeta}`}>
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              {event.location}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
