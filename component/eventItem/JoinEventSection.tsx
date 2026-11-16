"use client";

import { useEffect, useState } from "react";
import { getAuthHeaders } from "@/app/lib/auth-headers";
import {toast} from 'sonner'

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
  const [errorMessage, setErrorMessage] = useState("");

  const API_URL = process.env.NEXT_PUBLIC_JOIN_URL;

  // Check Join Status
  useEffect(() => {
    const checkStatus = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const headers = await getAuthHeaders();

        const res = await fetch(`${API_URL}/${postId}/join-status`, {
          method: "GET",
          headers,
          credentials: "include",
        });

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
    setErrorMessage("");

    try {
      const headers = await getAuthHeaders();

      const res = await fetch(`${API_URL}/${postId}/join`, {
        method: "POST",
        headers,
        credentials: "include",
      });
              toast.success('join success')

      if (!res.ok) {
        const result = await res.json().catch(() => ({}));
        throw new Error(result.message || "Join failed");
      }

      setIsJoined(true);
    } catch (error) {
      console.error(error);
      setErrorMessage(
        error instanceof Error ? error.message : "Join failed",
      );
    } finally {
      setActionLoading(false);
    }
  };

  // Leave Event
  const handleLeave = async () => {
    setActionLoading(true);
    setErrorMessage("");

    try {
      const headers = await getAuthHeaders();

      const res = await fetch(`${API_URL}/${postId}/leave`, {
        method: "DELETE",
        headers,
        credentials: "include",
      });

        toast.success('leave success')




      if (!res.ok) {
        const result = await res.json().catch(() => ({}));
        throw new Error(result.message || "Leave failed");
      }


      setIsJoined(false);
    } catch (error) {
      console.error(error);
      setErrorMessage(
        error instanceof Error ? error.message : "Leave failed",
      );
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <section className="mt-8 rounded-3xl bg-slate-900 p-6 text-white sm:p-8">
      <h2 className="text-2xl font-bold">Interested in This Event?</h2>

      <p className="mt-3 leading-7 text-slate-300">
        Join this event and become part of the community.
      </p>

      {!user ? (
        <p className="mt-5 text-sm text-yellow-300">
          Please login to join this event.
        </p>
      ) : loading ? (
        <p className="mt-5 text-sm text-slate-300">Checking your status...</p>
      ) : isJoined ? (
        <div className="mt-6 space-y-5">
          {/* Current User Information */}
          <div className="flex items-center gap-4 rounded-2xl bg-slate-800 p-4">
            {user.image ? (
              // eslint-disable-next-line @next/next/no-img-element
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
              <p className="text-sm text-green-400">You joined this event</p>
            </div>
          </div>

          <button
            onClick={handleLeave}
            disabled={actionLoading}
            className="rounded-xl bg-red-500 px-8 py-3 font-semibold text-white transition hover:bg-red-600 disabled:opacity-50"
          >
            {actionLoading ? "Please wait..." : "Leave Event"}
          </button>
        </div>
      ) : (
        <button
          onClick={handleJoin}
          disabled={actionLoading}
          className="mt-6 rounded-xl bg-white px-8 py-3 font-semibold text-slate-900 transition hover:bg-slate-100 disabled:opacity-50"
        >
          {actionLoading ? "Please wait..." : "Join Event"}
        </button>
      )}

      {errorMessage && (
        <p className="mt-4 rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {errorMessage}
        </p>
      )}
    </section>
  );
}