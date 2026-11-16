const stats = [
  { value: "120+", label: "Events Organized" },
  { value: "2,500+", label: "Community Members" },
  { value: "40+", label: "Charity Drives" },
  { value: "15", label: "Cities Reached" },
];

const achievements = [
  {
    year: "2026",
    title: "Ramadan Food Support",
    text: "Food packs were delivered to hundreds of families by volunteers working together.",
  },
  {
    year: "2026",
    title: "Youth Awareness Campaign",
    text: "A series of workshops helped young people understand the value of discipline and faith.",
  },
  {
    year: "2025",
    title: "Community Learning Centers",
    text: "Weekly Quran and basic Islamic knowledge classes started in several neighborhoods.",
  },
];

export default function CommunityActions() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">
          Community Action
        </p>
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          What We Have Achieved Together
        </h2>
        <p className="mt-4 text-sm leading-7 text-slate-500 sm:text-base">
          Every success below was made possible by people who joined hands for
          a good cause.
        </p>
      </div>

      {/* Stats */}
      <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-3xl bg-gradient-to-br from-indigo-600 to-purple-600 p-6 text-center text-white shadow-lg shadow-indigo-600/20"
          >
            <p className="text-3xl font-extrabold sm:text-4xl">{stat.value}</p>
            <p className="mt-2 text-xs font-medium text-indigo-100 sm:text-sm">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Achievements */}
      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {achievements.map((item) => (
          <article
            key={item.title}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-lg text-emerald-600">
                ✓
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {item.year}
              </span>
            </div>

            <h3 className="mt-4 text-lg font-bold text-slate-900">
              {item.title}
            </h3>

            <p className="mt-2 text-sm leading-7 text-slate-500">
              {item.text}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}