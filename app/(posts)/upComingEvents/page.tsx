import { getCategory } from "@/app/lib/categories";
import PostCard from "../../../component/postUi/postCard";
import EventFilters from "@/component/eventFilter/Filters";

type Post = {
  _id: string;
  title: string;
  content: string;
  image?: string;
  eventDate?: string;
  location?: string;
  category: string;
};

async function getPosts(category?: string, search?: string): Promise<Post[]> {
  const url = new URL(process.env.NEXT_PUBLIC_ALL_POSTS_URL!);

  url.searchParams.set("limit", "12");
  url.searchParams.set("upcoming", "true");

  if (category) {
    url.searchParams.set("category", category);
  }

  if (search) {
    url.searchParams.set("search", search);
  }

  const res = await fetch(url.toString(), { cache: "no-store" });

  if (!res.ok) return [];

  const json = await res.json();
  return json.data ?? [];
}

export default async function EventsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string }>;
}) {
  const { category, search } = await searchParams;

  const activeCategory = category ? getCategory(category) : undefined;
  const searchText = search?.trim() || "";

  const posts = await getPosts(activeCategory?.slug, searchText);

  const hasFilter = Boolean(activeCategory || searchText);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      {/* Page Heading */}
      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
        Upcoming Events
      </h1>

      <p className="mt-2 text-slate-600">
        {hasFilter
          ? [
              activeCategory ? `Category: ${activeCategory.name}` : null,
              searchText ? `Search: "${searchText}"` : null,
            ]
              .filter(Boolean)
              .join(" • ")
          : "The next events happening in the community."}
      </p>

      {/* Filters: dropdown + search */}
      <EventFilters
        key={`${activeCategory?.slug ?? ""}|${searchText}`}
        category={activeCategory?.slug ?? ""}
        search={searchText}
      />

      {/* Posts Section */}
      <section className="mt-10">
        {posts.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-10 text-center text-slate-600">
            {hasFilter
              ? `No events found${
                  activeCategory ? ` in "${activeCategory.name}"` : ""
                }${searchText ? ` for "${searchText}"` : ""}.`
              : "No upcoming events yet."}
          </div>
        ) : (
          <PostCard posts={posts} />
        )}
      </section>
    </main>
  );
}