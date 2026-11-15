"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Post = {
  _id: string;
  title: string;
  image?: string;
  eventDate?: string;
  location?: string;
};

type Tab = "created" | "joined";

const POST_API = process.env.NEXT_PUBLIC_POSTS_URL;

export default function ManageEventsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("created");
  const [createdPosts, setCreatedPosts] = useState<Post[]>([]);
  const [joinedPosts, setJoinedPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [createdRes, joinedRes] = await Promise.all([
          fetch(`${POST_API}/my-posts`, { credentials: "include" }),
          fetch(`${POST_API}/joined`, { credentials: "include" }),
        ]);

        const createdData = await createdRes.json();
        const joinedData = await joinedRes.json();

        if (!createdRes.ok) {
          throw new Error(createdData.message || "Failed to load created events");
        }
        if (!joinedRes.ok) {
          throw new Error(joinedData.message || "Failed to load joined events");
        }

        setCreatedPosts(createdData.data);
        setJoinedPosts(joinedData.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  // ডিলিট
  const handleDelete = async (id: string) => {
    const ok = window.confirm("Are you sure you want to delete this event?");
    if (!ok) return;

    try {
      setDeletingId(id);

      const res = await fetch(`${POST_API}/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const result = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(result.message || "Delete failed");
      }

      // সফল হলে লিস্ট থেকে সাথে সাথে সরিয়ে দেওয়া
      setCreatedPosts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return <p className="p-10 text-slate-500">Loading...</p>;
  }

  if (error) {
    return <p className="p-10 text-red-500">{error}</p>;
  }

  const posts = activeTab === "created" ? createdPosts : joinedPosts;

  const emptyMessage =
    activeTab === "created"
      ? "You haven't created any event yet."
      : "You haven't joined any event yet.";

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-bold text-slate-900">Manage Events</h1>

      {/* ট্যাব */}
      <div className="mt-6 flex gap-3">
        <button
          onClick={() => setActiveTab("created")}
          className={`rounded-xl px-5 py-2 text-sm font-semibold transition ${
            activeTab === "created"
              ? "bg-indigo-600 text-white"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          Created ({createdPosts.length})
        </button>

        <button
          onClick={() => setActiveTab("joined")}
          className={`rounded-xl px-5 py-2 text-sm font-semibold transition ${
            activeTab === "joined"
              ? "bg-indigo-600 text-white"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          Joined ({joinedPosts.length})
        </button>
      </div>

      {/* কার্ড লিস্ট */}
      {posts.length === 0 ? (
        <p className="mt-8 text-slate-500">{emptyMessage}</p>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <div
              key={post._id}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
            >
              {/* ছবি ও লেখা: ক্লিক করলে ডিটেইলস পেজে যাবে */}
              <Link href={`/postDetail/${post._id}`} className="block">
                <div className="aspect-video bg-slate-100">
                  {post.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={post.image}
                      alt={post.title}
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>

                <div className="p-4 pb-2">
                  <h2 className="font-bold text-slate-900">{post.title}</h2>

                  {post.eventDate && (
                    <p className="mt-2 text-sm text-slate-500">
                      📅{" "}
                      {new Date(post.eventDate).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  )}

                  {post.location && (
                    <p className="mt-1 text-sm text-slate-500">
                      📍 {post.location}
                    </p>
                  )}
                </div>
              </Link>

              {/* বাটন: শুধু Created ট্যাবে */}
              {activeTab === "created" && (
                <div className="flex gap-3 p-4 pt-2">
                  <Link
                    href={`/update-post/${post._id}`}
                    className="flex-1 rounded-xl bg-indigo-50 py-2 text-center text-sm font-semibold text-indigo-700 transition hover:bg-indigo-100"
                  >
                    Update
                  </Link>

                  <button
                    onClick={() => handleDelete(post._id)}
                    disabled={deletingId === post._id}
                    className="flex-1 rounded-xl bg-red-50 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100 disabled:opacity-50"
                  >
                    {deletingId === post._id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </main>
  );
}