<<<<<<< HEAD
﻿"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAuthHeaders } from "@/app/lib/auth-headers";
=======
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { authClient } from "@/app/lib/auth-client";
>>>>>>> 1a2e94553155da1aeceff124478722b03a3ede23

type Post = {
  _id: string;
  title: string;
  image?: string;
  eventDate?: string;
  location?: string;
};

const POST_API = process.env.NEXT_PUBLIC_POSTS_URL;

export default function JoinedEventsPage() {
<<<<<<< HEAD
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
=======
  const [posts, setPosts] = useState<Post[]>([]);  
  const [loading, setLoading] = useState(true);   
  const [error, setError] = useState("");
       
  
  

  async function getAndSaveToken(): Promise<string> {
    try {
      const { data, error } = await authClient.token();

      if (error) {
        throw new Error(error.message || "Failed to get JWT token");
      }

      if (!data?.token) {
        throw new Error("No token received from authentication");
      }

      const jwtToken = data.token;

      localStorage.setItem("jwt_token", jwtToken);

      return jwtToken;
    } catch (err) {
      const oldToken = localStorage.getItem("jwt_token");
      if (oldToken) {
        return oldToken;
      }
      throw err;
    }
  }

>>>>>>> 1a2e94553155da1aeceff124478722b03a3ede23

  useEffect(() => {
    const fetchJoined = async () => {
      try {
<<<<<<< HEAD
        const headers = await getAuthHeaders()
        const res = await fetch(POST_API + "/joined", {
          credentials: "include",
          headers,
=======
         const token = await getAndSaveToken();
        const res = await fetch(`${POST_API}/joined`, {
          credentials: "include", 
            headers: {
            'authorization': `Bearer ${token}`,
          },
>>>>>>> 1a2e94553155da1aeceff124478722b03a3ede23
        });

        const result = await res.json();

        if (!res.ok) {
          throw new Error(result.message || "Failed to load");
        }

<<<<<<< HEAD
        setPosts(result.data ?? []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
=======
        setPosts(result.data);  
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);  
>>>>>>> 1a2e94553155da1aeceff124478722b03a3ede23
      }
    };

    fetchJoined();
<<<<<<< HEAD
  }, []);

=======
  }, []); 

  
>>>>>>> 1a2e94553155da1aeceff124478722b03a3ede23
  if (loading) {
    return <p className="p-10 text-slate-500">Loading...</p>;
  }

<<<<<<< HEAD
=======
  // ২. এরর অবস্থা
>>>>>>> 1a2e94553155da1aeceff124478722b03a3ede23
  if (error) {
    return <p className="p-10 text-red-500">{error}</p>;
  }

<<<<<<< HEAD
=======
  // ৩. মূল পেজ
>>>>>>> 1a2e94553155da1aeceff124478722b03a3ede23
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-bold text-slate-900">Joined Events</h1>

      {posts.length === 0 ? (
<<<<<<< HEAD
        <p className="mt-6 text-slate-500">You haven&apos;t joined any event yet.</p>
=======
        <p className="mt-6 text-slate-500">
          You haven&apos;t joined any event yet.
        </p>
>>>>>>> 1a2e94553155da1aeceff124478722b03a3ede23
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post._id}
<<<<<<< HEAD
              href={"/postDetail/" + post._id}
=======
              href={`/postDetail/${post._id}`}
>>>>>>> 1a2e94553155da1aeceff124478722b03a3ede23
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
            >
              <div className="aspect-video bg-slate-100">
                {post.image && (
<<<<<<< HEAD
=======
                  // eslint-disable-next-line @next/next/no-img-element
>>>>>>> 1a2e94553155da1aeceff124478722b03a3ede23
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
<<<<<<< HEAD
                    📅 {new Date(post.eventDate).toLocaleDateString("en-US", {
=======
                    📅{" "}
                    {new Date(post.eventDate).toLocaleDateString("en-US", {
>>>>>>> 1a2e94553155da1aeceff124478722b03a3ede23
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                )}

                {post.location && (
<<<<<<< HEAD
                  <p className="mt-1 text-sm text-slate-500">📍 {post.location}</p>
=======
                  <p className="mt-1 text-sm text-slate-500">
                    📍 {post.location}
                  </p>
>>>>>>> 1a2e94553155da1aeceff124478722b03a3ede23
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 1a2e94553155da1aeceff124478722b03a3ede23
