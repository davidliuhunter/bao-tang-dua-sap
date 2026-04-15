import PublicLayout from '@/components/PublicLayout';
import EventCard from '@/components/EventCard';
import { getPublishedEvents } from '@/lib/data';

export default async function EventsPage() {
  const events = await getPublishedEvents();

  return (
    <PublicLayout>
      <div className="page-hero">
        <div className="container-museum">
          <h1 className="font-serif text-4xl font-bold mb-2">Sự kiện</h1>
          <p className="text-amber-200">Hoạt động và sự kiện của bảo tàng</p>
        </div>
      </div>

      <div className="container-museum py-12">
        {events.length === 0 ? (
          <div className="text-center py-20 text-amber-600">
            <div className="text-6xl mb-4">🎪</div>
            <p className="text-lg">Chưa có sự kiện nào được công bố.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {events.map((e) => (
              <EventCard key={e.id} event={e} />
            ))}
          </div>
        )}
      </div>
    </PublicLayout>
  );
}
