"use client";

import { Suspense, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { categories } from "@/app/lib/categories";
import JoinEventSection from "../../../../component/eventItem/JoinEventSection";
import { useSession } from "@/app/lib/auth-client";

type Post = {
  _id: string;
  title: string;
  content: string;
  image?: string;
  eventDate?: string;
  location?: string;
  category: string;
};

const POST_API = process.env.NEXT_PUBLIC_POSTS_URL;

export default function EventDetailsPage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <EventDetailsPageContent />
    </Suspense>
  );
}

function LoadingState() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <p className="text-slate-500">Loading event...</p>
    </div>
  );
}

function EventDetailsPageContent() {
  const params = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`${POST_API}/${params.id}`, {
          credentials: "include",
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Failed to load event");
        }

        setPost(result.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchPost();
    }
  }, [params.id]);

  const { data: session, isPending } = useSession();

  if (isPending) {
    return <p>Loading session....................</p>;
  }

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-slate-500">Loading event...</p>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-bold text-slate-800">Event not found</h2>

        <p className="text-sm text-red-500">
          {error || "This event does not exist."}
        </p>

        <Link
          href="/upcoming-events"
          className="rounded-xl bg-indigo-600 px-5 py-3 text-white"
        >
          Back to Events
        </Link>
      </div>
    );
  }

  const category = categories.find((item) => item.slug === post.category);

  const formattedDate = post.eventDate
    ? new Date(post.eventDate).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Date not available";

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="aspect-video w-full overflow-hidden bg-slate-100">
          {post.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={post.image}
              alt={post.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-slate-400">
              No event image
            </div>
          )}
        </div>

        <div className="p-6 sm:p-8">
          {category && (
            <span className="rounded-full bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700">
              {category.name}
            </span>
          )}

          <h1 className="mt-5 text-3xl font-bold text-slate-900 sm:text-4xl">
            {post.title}
          </h1>

          <div className="mt-5 flex flex-wrap gap-5 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <span>📅</span>
              {formattedDate}
            </div>

            {post.location && (
              <div className="flex items-center gap-2">
                <span>📍</span>
                {post.location}
              </div>
            )}
          </div>

          <hr className="my-7 border-slate-200" />

          <h2 className="text-2xl font-bold text-slate-900">About This Event</h2>

          <p className="mt-4 whitespace-pre-line leading-8 text-slate-600">
            {post.content}
          </p>
        </div>
      </div>

      {category && (
        <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <span className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
            Category Discussion
          </span>

          <h2 className="mt-3 text-2xl font-bold text-slate-900 sm:text-3xl">
            About {category.name}
          </h2>

          <p className="mt-4 leading-8 text-slate-600">{category.summary}</p>

          <div className="mt-8 space-y-5">
            {category.sections.map((section, index) => (
              <article
                key={index}
                className="rounded-2xl bg-slate-50 p-5 sm:p-6"
              >
                <h3 className="text-lg font-bold text-slate-900">
                  {section.heading}
                </h3>

                <p className="mt-3 leading-8 text-slate-600">{section.body}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      <JoinEventSection postId={post._id} user={session?.user ?? null} />
    </main>
  );
}