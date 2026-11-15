import Link from "next/link";

const events = [
  {
    title: "Weekly Quran Study Circle",
    date: "12 November 2026",
    location: "Central Mosque Hall",
    category: "Learning",
    icon: "📖",
    color: "from-indigo-500 to-purple-500",
  },
  {
    title: "Youth Character Workshop",
    date: "08 November 2026",
    location: "Community Center",
    category: "Youth",
    icon: "🌱",
    color: "from-emerald-500 to-teal-500",
  },
  {
    title: "Winter Clothes Distribution",
    date: "02 November 2026",
    location: "City Park Ground",
    category: "Charity",
    icon: "🧥",
    color: "from-amber-500 to-orange-500",
  },
];

export default function RecentEvents() {
  return (
    <section className="bg-gradient-to-br from-indigo-50 via-slate-50 to-purple-50 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">
              Recent Events
            </p>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Latest From Our Community
            </h2>
          </div>

          <Link
            href="/upcoming-events"
            className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-indigo-600 shadow-sm ring-1 ring-slate-200 transition hover:bg-indigo-50"
          >
            View all events →
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <article
              key={event.title}
              className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              {/* ছবির জায়গা: পরে আসল ছবি বসাতে পারবেন */}
              <div
                className={`flex aspect-video items-center justify-center bg-gradient-to-br ${event.color} text-6xl`}
              >
                {event.icon}
              </div>

              <div className="p-5">
                <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                  {event.category}
                </span>

                <h3 className="mt-4 text-lg font-bold text-slate-900">
                  {event.title}
                </h3>

                <div className="mt-3 space-y-1 text-sm text-slate-500">
                  <p>📅 {event.date}</p>
                  <p>📍 {event.location}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}