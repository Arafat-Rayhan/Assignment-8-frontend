"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAuthHeaders } from "@/app/lib/auth-headers";

type Post = {
  _id: string;
  title: string;
  image?: string;
  eventDate?: string;
  location?: string;
};

const POST_API = process.env.NEXT_PUBLIC_POSTS_URL;

export default function JoinedEventsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJoined = async () => {
      try {
        const headers = await getAuthHeaders()
        const res = await fetch(POST_API + "/joined", {
          credentials: "include",
          headers,
        });

        const result = await res.json();

        if (!res.ok) {
          throw new Error(result.message || "Failed to load");
        }

        setPosts(result.data ?? []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchJoined();
  }, []);

  if (loading) {
    return <p className="p-10 text-slate-500">Loading...</p>;
  }

  if (error) {
    return <p className="p-10 text-red-500">{error}</p>;
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-bold text-slate-900">Joined Events</h1>

      {posts.length === 0 ? (
        <p className="mt-6 text-slate-500">You haven&apos;t joined any event yet.</p>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post._id}
              href={"/postDetail/" + post._id}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
            >
              <div className="aspect-video bg-slate-100">
                {post.image && (
                  <img
                    src={post.image}
                    alt={post.title}
                    className="h-full w-full object-cover"
                  />
                )}
              </div>

              <div className="p-4">
                <h2 className="font-bold text-slate-900">{post.title}</h2>

                {post.eventDate && (
                  <p className="mt-2 text-sm text-slate-500">
                    📅 {new Date(post.eventDate).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                )}

                {post.location && (
                  <p className="mt-1 text-sm text-slate-500">📍 {post.location}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
