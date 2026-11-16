"use client";

import { useEffect, useState } from "react";
<<<<<<< HEAD
import { getAuthHeaders } from "@/app/lib/auth-headers";
=======
>>>>>>> 1a2e94553155da1aeceff124478722b03a3ede23

interface JoinEventSectionProps {
  postId: string;
  user: {
    id: string;
    name: string;
    image?: string | null;
  } | null;
}

export default function JoinEventSection({
  postId,
  user,
}: JoinEventSectionProps) {
  const [isJoined, setIsJoined] = useState(false);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
<<<<<<< HEAD
  const [errorMessage, setErrorMessage] = useState("");
=======
>>>>>>> 1a2e94553155da1aeceff124478722b03a3ede23

  const API_URL = process.env.NEXT_PUBLIC_JOIN_URL;

  // Check Join Status
  useEffect(() => {
    const checkStatus = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
<<<<<<< HEAD
        const headers = await getAuthHeaders();

        const res = await fetch(`${API_URL}/${postId}/join-status`, {
          method: "GET",
          headers,
          credentials: "include",
        });
=======
        const res = await fetch(
          `${API_URL}/${postId}/join-status`,
          { method:'GET',
            credentials: "include"
         }
        );
>>>>>>> 1a2e94553155da1aeceff124478722b03a3ede23

        if (!res.ok) throw new Error("Status check failed");

        const data = await res.json();
        setIsJoined(data.isJoined);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    checkStatus();
  }, [postId, user, API_URL]);

  // Join Event
  const handleJoin = async () => {
    setActionLoading(true);
<<<<<<< HEAD
    setErrorMessage("");

    try {
      const headers = await getAuthHeaders();

      const res = await fetch(`${API_URL}/${postId}/join`, {
        method: "POST",
        headers,
        credentials: "include",
      });

      if (!res.ok) {
        const result = await res.json().catch(() => ({}));
        throw new Error(result.message || "Join failed");
      }
=======

    try {
      const res = await fetch(`${API_URL}/${postId}/join`, {
        method: "POST",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Join failed");
>>>>>>> 1a2e94553155da1aeceff124478722b03a3ede23

      setIsJoined(true);
    } catch (error) {
      console.error(error);
<<<<<<< HEAD
      setErrorMessage(
        error instanceof Error ? error.message : "Join failed",
      );
=======
>>>>>>> 1a2e94553155da1aeceff124478722b03a3ede23
    } finally {
      setActionLoading(false);
    }
  };

  // Leave Event
  const handleLeave = async () => {
    setActionLoading(true);
<<<<<<< HEAD
    setErrorMessage("");

    try {
      const headers = await getAuthHeaders();

      const res = await fetch(`${API_URL}/${postId}/leave`, {
        method: "DELETE",
        headers,
        credentials: "include",
      });

      if (!res.ok) {
        const result = await res.json().catch(() => ({}));
        throw new Error(result.message || "Leave failed");
      }
=======

    try {
      const res = await fetch(`${API_URL}/${postId}/leave`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Leave failed");
>>>>>>> 1a2e94553155da1aeceff124478722b03a3ede23

      setIsJoined(false);
    } catch (error) {
      console.error(error);
<<<<<<< HEAD
      setErrorMessage(
        error instanceof Error ? error.message : "Leave failed",
      );
=======
>>>>>>> 1a2e94553155da1aeceff124478722b03a3ede23
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <section className="mt-8 rounded-3xl bg-slate-900 p-6 text-white sm:p-8">
<<<<<<< HEAD
      <h2 className="text-2xl font-bold">Interested in This Event?</h2>
=======

      <h2 className="text-2xl font-bold">
        Interested in This Event?
      </h2>
>>>>>>> 1a2e94553155da1aeceff124478722b03a3ede23

      <p className="mt-3 leading-7 text-slate-300">
        Join this event and become part of the community.
      </p>

      {!user ? (
        <p className="mt-5 text-sm text-yellow-300">
          Please login to join this event.
        </p>
      ) : loading ? (
<<<<<<< HEAD
        <p className="mt-5 text-sm text-slate-300">Checking your status...</p>
      ) : isJoined ? (
        <div className="mt-6 space-y-5">
          {/* Current User Information */}
          <div className="flex items-center gap-4 rounded-2xl bg-slate-800 p-4">
            {user.image ? (
              // eslint-disable-next-line @next/next/no-img-element
=======
        <p className="mt-5 text-sm text-slate-300">
          Checking your status...
        </p>
      ) : isJoined ? (

        <div className="mt-6 space-y-5">

          {/* Current User Information */}
          <div className="flex items-center gap-4 rounded-2xl bg-slate-800 p-4">

            {user.image ? (
>>>>>>> 1a2e94553155da1aeceff124478722b03a3ede23
              <img
                src={user.image}
                alt={user.name}
                className="h-14 w-14 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-600 text-xl font-bold">
                {user.name.charAt(0)}
              </div>
            )}

            <div>
              <h3 className="font-semibold">{user.name}</h3>
<<<<<<< HEAD
              <p className="text-sm text-green-400">You joined this event</p>
=======
              <p className="text-sm text-green-400">
                You joined this event
              </p>
>>>>>>> 1a2e94553155da1aeceff124478722b03a3ede23
            </div>
          </div>

          <button
            onClick={handleLeave}
            disabled={actionLoading}
            className="rounded-xl bg-red-500 px-8 py-3 font-semibold text-white transition hover:bg-red-600 disabled:opacity-50"
          >
            {actionLoading ? "Please wait..." : "Leave Event"}
          </button>
<<<<<<< HEAD
        </div>
      ) : (
=======

        </div>

      ) : (

>>>>>>> 1a2e94553155da1aeceff124478722b03a3ede23
        <button
          onClick={handleJoin}
          disabled={actionLoading}
          className="mt-6 rounded-xl bg-white px-8 py-3 font-semibold text-slate-900 transition hover:bg-slate-100 disabled:opacity-50"
        >
          {actionLoading ? "Please wait..." : "Join Event"}
        </button>
<<<<<<< HEAD
      )}

      {errorMessage && (
        <p className="mt-4 rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {errorMessage}
        </p>
      )}
=======

      )}

>>>>>>> 1a2e94553155da1aeceff124478722b03a3ede23
    </section>
  );
}