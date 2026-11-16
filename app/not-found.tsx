import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-100 p-6">
      <div className="w-full max-w-lg rounded-3xl bg-white p-10 text-center shadow-2xl">
        <h1 className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-8xl font-extrabold text-transparent">
          404
        </h1>

        <h2 className="mt-4 text-2xl font-bold text-gray-900">
          Page Not Found
        </h2>

        <p className="mt-3 text-sm text-gray-500">
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:opacity-90"
          >
            Go Home
          </Link>

          <Link
            href="/upcoming-events"
            className="rounded-xl border border-gray-200 bg-white px-6 py-3 font-semibold text-gray-800 transition hover:bg-gray-50"
          >
            Upcoming Events
          </Link>
        </div>
      </div>
    </div>
  );
}