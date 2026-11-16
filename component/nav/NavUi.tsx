"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from '@/app/lib/auth-client';
import { authClient } from '@/app/lib/auth-client';
import ThemeToggle from '@/component/black and white/DarkWhite'

const publicLinks = [
  { href: "/", label: "Home" },
  { href: "/upComingEvents", label: "Upcoming Events" },
  { href: "/joined", label: "Joined event" },
];

const menuLinks = [
  { href: "/create-post", label: "Create Event" },
  { href: "/upComingEvents", label: "Upcoming Events" },
  { href: "/joined", label: "Joined event" },
  { href: "/manageEvent", label: "ManageMyPost" },
];

function SparkIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 2l2.2 6.8L21 11l-6.8 2.2L12 20l-2.2-6.8L3 11l6.8-2.2L12 2z" />
    </svg>
  );
}

function Avatar({
  name,
  image,
  className = "h-9 w-9",
}: {
  name?: string | null;
  image?: string | null;
  className?: string;
}) {
  if (image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={image}
        alt={name ?? "Profile"}
        referrerPolicy="no-referrer"
        className={`${className} rounded-full object-cover ring-2 ring-indigo-100`}
      />
    );
  }
  return (
    <span
      className={`${className} flex items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-700`}
    >
      {(name?.trim()?.[0] ?? "U").toUpperCase()}
    </span> 
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();
  const [activePathname, setActivePathname] = useState<string | null>(null);
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const user = session?.user ?? null;

  useEffect(() => {
    setActivePathname(pathname);
  }, [pathname]);

  const linkClass = (href: string) =>
  `rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
    activePathname === href
      ? "bg-indigo-50 text-indigo-700"
      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
  }`;

  

   




 
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDropdownOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const handleLogout = async () => {
 
  
 
    await authClient.signOut({
 
      fetchOptions: {
        onSuccess: () => {
          setDropdownOpen(false);
          setMobileOpen(false);
          router.push("/");
          router.refresh();
        },
      },
    });
  };

  
   
 
return (
  <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80">
    <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2.5">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-300">
          <SparkIcon />
        </span>
        <h1 className="font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
          Dawat-ul-
          <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
            Islam
          </span>
        </h1>
      </Link>

      {/* Desktop links */}
      <div className="hidden items-center gap-1 md:flex">
        {publicLinks.map((l) => (
          <Link key={l.href} href={l.href} className={linkClass(l.href)}>
            {l.label}
          </Link>
        ))}
      </div>

      {/* Desktop right side */}
      <div className="hidden items-center gap-3 md:flex">
        <ThemeToggle />

        {isPending ? (
          <div className="h-9 w-9 animate-pulse rounded-full bg-slate-200 dark:bg-slate-700" />
        ) : user ? (
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setDropdownOpen((v) => !v)}
              aria-haspopup="menu"
              aria-expanded={dropdownOpen}
              className="flex items-center gap-2 rounded-full p-0.5 transition hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:hover:bg-slate-800"
            >
              <Avatar name={user.name} image={user.image} />
            </button>

            {dropdownOpen && (
              <div
                role="menu"
                className="absolute right-0 mt-3 w-64 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/10 dark:border-slate-700 dark:bg-slate-900"
              >
                <div className="flex items-center gap-3 border-b border-slate-100 px-4 py-4 dark:border-slate-800">
                  <Avatar name={user.name} image={user.image} className="h-11 w-11" />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">{user.name}</p>
                    <p className="truncate text-xs text-slate-500 dark:text-slate-400">{user.email}</p>
                  </div>
                </div>

                <div className="p-2">
                  {menuLinks.map((l) => (
                    <Link
                      key={l.href + l.label}
                      href={l.href}
                      role="menuitem"
                      onClick={() => setDropdownOpen(false)}
                      className="block rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-indigo-50 hover:text-indigo-700 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-indigo-300"
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>

                <div className="border-t border-slate-100 p-2 dark:border-slate-800">
                  <button
                    type="button"
                    role="menuitem"
                    onClick={handleLogout}
                    className="w-full rounded-xl px-3 py-2.5 text-left text-sm font-medium text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10"
                  >
                    Log out
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link
              href="/sign-in"
              className="rounded-xl px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
            >
 
              Sign in
 
            </Link>
            <Link
              href="/sign-up"
              className="rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-600/25 transition hover:shadow-lg hover:shadow-indigo-600/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
            >
              Sign up
            </Link>
          </>
        )}
      </div>

      {/* Mobile: theme toggle + menu button */}
      <div className="flex items-center gap-1 md:hidden">
        <ThemeToggle />
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {mobileOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>
    </nav>

    {/* Mobile menu */}
    {mobileOpen && (
      <div className="border-t border-slate-200 bg-white px-4 pb-5 pt-3 dark:border-slate-800 dark:bg-slate-900 md:hidden">
        {user && (
          <div className="mb-3 flex items-center gap-3 rounded-2xl bg-slate-50 px-3 py-3 dark:bg-slate-800">
            <Avatar name={user.name} image={user.image} className="h-11 w-11" />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">{user.name}</p>
              <p className="truncate text-xs text-slate-500 dark:text-slate-400">{user.email}</p>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-1">
          <Link href="/" onClick={() => setMobileOpen(false)} className={linkClass("/")}>
            Home
          </Link>
 
         
 
          <Link href="/events" onClick={() => setMobileOpen(false)} className={linkClass("/events")}>
 
            Upcoming Events
          </Link>
          {user && (
            <>
            <Link href="/create-post" onClick={() => setMobileOpen(false)} className={linkClass("/create-post")}>
              Create Event
            </Link>
            <Link href="/joined" onClick={() => setMobileOpen(false)} className={linkClass("/joined")}>
              Joined event
             </Link>
            </>
          )}
        </div>

        <div className="mt-4">
          {isPending ? null : user ? (
            <button
              type="button"
              onClick={handleLogout}
              className="w-full rounded-xl border border-red-200 px-4 py-2.5 text-center text-sm font-semibold text-red-600 dark:border-red-500/30 dark:text-red-400"
            >
              Log out
           </button>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/sign-in"
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-center text-sm font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-200"
              >
                Sign in
  
              </Link>
              <Link
                href="/sign-up"
                className="rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2.5 text-center text-sm font-semibold text-white"
              >
                Sign up
              </Link>
            </div>
          )}
        </div>
      </div>
    )}
  </header>
)
}