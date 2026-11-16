import Link from "next/link";

function MosqueArt() {
  return (
    <svg viewBox="0 0 400 440" className="h-full w-full" aria-hidden="true">
      {/* চাঁদ */}
      <path d="M300 70a40 40 0 1 0 28 68a32 32 0 1 1 -28 -68z" fill="#fef3c7" />
      {/* তারা */}
      <g fill="#fef3c7" opacity="0.9">
        <path d="M90 80l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" />
        <path d="M230 40l2 6 6 2-6 2-2 6-2-6-6-2 6-2z" />
        <path d="M350 190l2 6 6 2-6 2-2 6-2-6-6-2 6-2z" />
        <path d="M40 180l2 6 6 2-6 2-2 6-2-6-6-2 6-2z" />
      </g>
      {/* মিনার */}
      <g fill="#1e1b4b">
        <rect x="60" y="200" width="22" height="140" />
        <path d="M56 200L71 160L86 200Z" />
        <rect x="318" y="200" width="22" height="140" />
        <path d="M314 200L329 160L344 200Z" />
        {/* গম্বুজ */}
        <path d="M110 340V250A90 90 0 0 1 290 250V340Z" />
        <rect x="198" y="140" width="4" height="26" />
        <circle cx="200" cy="136" r="5" />
        {/* ছোট গম্বুজ */}
        <path d="M110 340V300A28 28 0 0 0 82 328V340Z" />
        <path d="M290 340V300A28 28 0 0 1 318 328V340Z" />
        {/* মাটি */}
        <rect x="0" y="340" width="400" height="100" />
      </g>
      {/* দরজা ও জানালা */}
      <g fill="#fef3c7" opacity="0.85">
        <path d="M184 340V300a16 16 0 0 1 32 0V340Z" />
        <path d="M132 340V310a10 10 0 0 1 20 0V340Z" />
        <path d="M248 340V310a10 10 0 0 1 20 0V340Z" />
        <rect x="67" y="230" width="8" height="18" rx="4" />
        <rect x="325" y="230" width="8" height="18" rx="4" />
      </g>
    </svg>
  );
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50 via-white to-white">
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-indigo-200/40 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-14 sm:px-6 md:grid-cols-2 md:py-24">
        {/* বাম পাশ: লেখা */}
        <div>
          <p className="text-sm font-semibold text-indigo-600">
            Community events for Dawah
          </p>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl">
            Invite hearts to the path of Din
          </h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-slate-600 sm:text-lg">
            Find gatherings, talks and study circles near you, or host your own
            and invite people with kindness. One place for the community to
            come together.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/upComingEvents"
              className="rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-indigo-600/25 transition hover:shadow-lg hover:shadow-indigo-600/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
            >
              Explore events
            </Link>
            <Link
              href="/create-post"
              className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Host an event
            </Link>
          </div>

          <ul className="mt-8 flex flex-wrap gap-2 text-sm text-slate-600">
            {["Gatherings", "Talks", "Study circles"].map((t) => (
              <li
                key={t}
                className="rounded-full bg-indigo-50 px-3.5 py-1.5 font-medium text-indigo-700"
              >
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* ডান পাশ: ছবি */}
        <div className="relative mx-auto w-full max-w-md">
          <div className="aspect-[10/11] overflow-hidden rounded-[2rem] bg-gradient-to-br from-indigo-500 via-indigo-600 to-purple-700 shadow-2xl shadow-indigo-600/25">
            <MosqueArt />
          </div>

          <div className="absolute -bottom-5 left-4 right-4 flex items-center gap-3 rounded-2xl border border-white/60 bg-white/90 px-4 py-3 shadow-xl shadow-slate-900/10 backdrop-blur sm:left-[-1.5rem] sm:right-auto">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="5" width="18" height="16" rx="3" />
                <path d="M8 3v4M16 3v4M3 10h18" />
              </svg>
            </span>
            <div>
              <p className="text-sm font-semibold text-slate-900">Upcoming gatherings</p>
              <p className="text-xs text-slate-500">Join one near you</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}