const items = [
  {
    icon: "🕌",
    title: "Dawah & Awareness",
    text: "Programs that invite people to the path of Din with wisdom, kindness and clear guidance.",
  },
  {
    icon: "📖",
    title: "Quran & Learning Circles",
    text: "Weekly study circles to learn the Quran, Hadith and the basics of faith together.",
  },
  {
    icon: "🌱",
    title: "Youth Guidance",
    text: "Events that help young people build strong character and stay away from harmful habits.",
  },
  {
    icon: "🤝",
    title: "Charity & Service",
    text: "Community drives to support families in need, from food packs to winter clothes.",
  },
  {
    icon: "👨‍👩‍👧",
    title: "Family Gatherings",
    text: "Friendly meetups where families connect, learn and grow closer as a community.",
  },
  {
    icon: "🧭",
    title: "Self Improvement",
    text: "Sessions on repentance, discipline and purifying the heart, step by step.",
  },
];

export default function WhatWeDo() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">
          What We Do
        </p>
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Events That Bring People Closer to Din
        </h2>
        <p className="mt-4 text-sm leading-7 text-slate-500 sm:text-base">
          Anyone can create or join an event on our platform. Here are the kinds
          of events our community organizes.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <article
            key={item.title}
            className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-3xl transition group-hover:bg-indigo-100">
              {item.icon}
            </div>

            <h3 className="mt-5 text-lg font-bold text-slate-900">
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