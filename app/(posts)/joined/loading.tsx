export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 px-4">

      <div className="w-full max-w-md rounded-3xl border border-white bg-white/80 p-8 text-center shadow-xl backdrop-blur">

        {/* Animated Spinner */}
        <div className="relative mx-auto mb-7 h-20 w-20">

          <div className="absolute inset-0 rounded-full border-4 border-indigo-100" />

          <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-indigo-600" />

          <div className="absolute inset-0 flex items-center justify-center text-2xl">
            ✦
          </div>

        </div>

        {/* Title */}
        <h1 className="text-2xl font-extrabold text-slate-800">
          Loading...
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Please wait while we prepare everything for you.
        </p>

        {/* Animated Progress Bar */}
        <div className="mt-7 h-2 overflow-hidden rounded-full bg-indigo-100">

          <div className="h-full w-1/2 animate-pulse rounded-full bg-gradient-to-r from-indigo-500 to-purple-600" />

        </div>

        {/* Skeleton Loading */}
        <div className="mt-8 space-y-4">

          <div className="h-4 w-3/4 animate-pulse rounded-full bg-slate-200" />

          <div className="h-4 w-full animate-pulse rounded-full bg-slate-200" />

          <div className="h-4 w-2/3 animate-pulse rounded-full bg-slate-200" />

        </div>

        <p className="mt-7 text-xs font-medium tracking-wide text-indigo-500">
          COMMUNITY EVENTS
        </p>

      </div>
    </main>
  );
}