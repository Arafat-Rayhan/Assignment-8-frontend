import Link from "next/link";
 
export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-slate-300">
      {/* ...আগের সব কোড একই... */}
         <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-3">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-xl text-indigo-600">
              ✦
            </span>
            <p className="text-lg font-bold text-white">
              Dawat-ul-<span className="text-emerald-400">Islam</span>
            </p>
          </div>

          <p className="mt-4 max-w-sm text-sm leading-7 text-slate-400">
            A community platform to create and join events that invite people
            to the path of Din and serve society.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-white">
            Quick Links
          </h4>

          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <Link href="/" className="transition hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link href="/upcoming-events" className="transition hover:text-white">
                Upcoming Events
              </Link>
            </li>
            <li>
              <Link href="/create-post" className="transition hover:text-white">
                Create an Event
              </Link>
            </li>
            <li>
              <Link href="/manage-events" className="transition hover:text-white">
                Manage Events
              </Link>
            </li>
          </ul>
        </div>

        {/* Account */}
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-white">
            Account
          </h4>

          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <Link href="/sign-in" className="transition hover:text-white">
                Sign In
              </Link>
            </li>
            <li>
              <Link href="/sign-up" className="transition hover:text-white">
                Sign Up
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-800 py-5 text-center text-xs text-slate-500">
        © 2026 Dawat-ul-Islam. All rights reserved.
      </div>
    </footer>
  );
}