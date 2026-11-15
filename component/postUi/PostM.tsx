"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getCategory } from "@/app/lib/categories";

type Post = {
  _id: string;
  title: string;
  content: string;
  image?: string;
  eventDate?: string;
  location?: string;
  category: string;
};

const POST_API = process.env.NEXT_PUBLIC_POST_API;

const PostCard = ({ posts }: { posts: Post[] }) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (postId: string) => {
    const confirmed = window.confirm(
      "তুমি কি নিশ্চিত এই পোস্টটি Delete করতে চাও?"
    );

    if (!confirmed) return;

    try {
      setDeletingId(postId);

      const response = await fetch(`${POST_API}/${postId}`, {
        method: "DELETE",
        credentials: "include",
      });

      const result = await response.json();

      if (!response.ok || result.success === false) {
        throw new Error(result.message || "পোস্ট Delete করা যায়নি");
      }

      alert("পোস্ট সফলভাবে Delete হয়েছে");

      router.refresh();
    } catch (error) {
      alert(
        error instanceof Error ? error.message : "Something went wrong"
      );
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => {
        const cat = getCategory(post.category);

        const date = post.eventDate
          ? new Date(post.eventDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })
          : null;

        return (
          <div
            key={post._id}
            className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/10"
          >
            {/* Post Details Link */}
            <Link href={`/events/${post._id}`} className="block">
              <div className="aspect-video w-full overflow-hidden bg-slate-100">
                {post.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={post.image}
                    alt={post.title}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                )}
              </div>

              <div className="p-5">
                {cat && (
                  <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
                    {cat.name}
                  </span>
                )}

                <h2 className="mt-3 line-clamp-2 text-lg font-bold text-slate-900">
                  {post.title}
                </h2>

                <p className="mt-2 line-clamp-2 text-sm text-slate-600">
                  {post.content}
                </p>

                <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
                  {date && <span>{date}</span>}
                  {post.location && <span>{post.location}</span>}
                </div>
              </div>
            </Link>
            {/* Update & Delete Buttons */}
            <div className="flex gap-3 px-5 pb-5">
              <Link
                href={`/posts/${post._id}/edit`}
                className="flex-1 rounded-xl bg-indigo-600 px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-indigo-700"
              >
                Update
              </Link>

              <button
                type="button"
                onClick={() => handleDelete(post._id)}
                disabled={deletingId === post._id}
                className="flex-1 rounded-xl bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {deletingId === post._id ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};