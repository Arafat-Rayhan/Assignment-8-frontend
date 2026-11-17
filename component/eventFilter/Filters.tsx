"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { categories } from "@/app/lib/categories";

const PAGE_PATH = "/upComingEvents";

type EventFiltersProps = {
  category?: string;
  search?: string;
};

export default function EventFilters({
  category = "",
  search = "",
}: EventFiltersProps) {
  const router = useRouter();
  const [searchText, setSearchText] = useState(search);

  function go(nextCategory: string, nextSearch: string) {
    const params = new URLSearchParams();

    if (nextCategory) params.set("category", nextCategory);
    if (nextSearch.trim()) params.set("search", nextSearch.trim());

    const query = params.toString();
    router.push(query ? `${PAGE_PATH}?${query}` : PAGE_PATH);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    go(category, searchText);
  }

  const hasFilter = Boolean(category || search);

  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
      {/* Category dropdown */}
      <select
        value={category}
        onChange={(e) => go(e.target.value, searchText)}
        aria-label="Filter by category"
        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 sm:w-72"
      >
        <option value="">All categories</option>
        {categories.map((cat) => (
          <option key={cat.slug} value={cat.slug}>
            {cat.name}
          </option>
        ))}
      </select>

      {/* Search bar */}
      <form onSubmit={handleSubmit} className="flex flex-1 gap-2">
        <input
          type="search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search by title, description or location..."
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        />

        <button
          type="submit"
          className="rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-indigo-600/25"
        >
          Search
        </button>

        {hasFilter && (
          <button
            type="button"
            onClick={() => {
              setSearchText("");
              router.push(PAGE_PATH);
            }}
            className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Clear
          </button>
        )}
      </form>
    </div>
  );
}