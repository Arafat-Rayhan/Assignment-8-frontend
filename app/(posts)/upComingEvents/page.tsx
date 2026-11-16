import Link from "next/link";
import { getCategory } from "@/app/lib/categories";
import PostCard from '../../../component/postUi/postCard';


type Post = {
    _id: string;
    title: string;
    content: string;
    image?: string;
    eventDate?: string;
    location?: string;
    category: string;
};

export const instant =false
async function getPosts(category?: string): Promise<Post[]> {
  const url = new URL(process.env.NEXT_PUBLIC_POSTS_URL!);
  url.searchParams.set("limit", "12");
  if (category) url.searchParams.set("category", category);

  const res = await fetch(url.toString(), { cache: "no-store" });
  if (!res.ok) return [];
  const json = await res.json();
  return json.data ?? [];
}

export default async function EventsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const activeCategory = category ? getCategory(category) : undefined;
  const posts = await getPosts(activeCategory?.slug);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
        Upcoming events
      </h1>
      <p className="mt-2 text-slate-600">
        {activeCategory
          ? `Showing: ${activeCategory.name}`
          : "The next events happening in the community."}
      </p>
      {activeCategory && (
        <Link href="/events" className="mt-2 inline-block text-sm font-medium text-indigo-600 hover:underline">
          Show all events
        </Link>
      )}

      {posts.length === 0 ? (
        <div className="mt-10 rounded-3xl border border-slate-200 bg-slate-50 p-10 text-center text-slate-600">
          No upcoming events yet.
        </div>
      ) : (
        <PostCard posts={posts} />
       
      )}
    </main>
  );
}