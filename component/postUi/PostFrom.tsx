"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { categories } from "@/app/lib/categories";
import { authClient } from "@/app/lib/auth-client";

type PostFormProps = {
  mode: "create" | "update";
  postId?: string;
};

type PostData = {
  _id: string;
  title: string;
  content: string;
  eventDate: string;
  location: string;
  category: string;
  image: string;
};

export default function PostForm({ mode, postId }: PostFormProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewRef = useRef<string | null>(null);

  const isUpdate = mode === "update";

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState("");

  // API URL
  const CREATE_API = process.env.NEXT_PUBLIC_CREAT_POST;
  const POST_API = process.env.NEXT_PUBLIC_POSTS_URL;

  const minDate = useMemo(() => {
    if (typeof window === "undefined") return "";

    const today = new Date();
    const localToday = new Date(
      today.getTime() - today.getTimezoneOffset() * 60000
    );

    return localToday.toISOString().slice(0, 10);
  }, []);

  useEffect(() => {
    return () => {
      if (previewRef.current) {
        URL.revokeObjectURL(previewRef.current);
      }
    };
  }, []);

  // Token function  
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



  useEffect(() => {
    if (!isUpdate || !postId || !POST_API) return;

    let active = true;

    async function fetchPost() {
      try {
        setFetching(true);

        const token = await getAndSaveToken();

        const response = await fetch(`\( {POST_API}/ \){postId}`, {
          method: "GET",
          headers: {
            'authorization': `Bearer ${token}`,
          },
          credentials: "include",
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Failed to load post.");
        }

        const post: PostData = result.data;

        if (!active) return;

        setTitle(post.title || "");
        setContent(post.content || "");
        setLocation(post.location || "");
        setCategory(post.category || "");
        setEventDate(
          post.eventDate
            ? new Date(post.eventDate).toISOString().split("T")[0]
            : ""
        );
        setImagePreview(post.image || null);
      } catch (error) {
        if (active) {
          setErrors({
            submit:
              error instanceof Error
                ? error.message
                : "Failed to load post.",
          });
        }
      } finally {
        if (active) setFetching(false);
      }
    }

    fetchPost();

    return () => {
      active = false;
    };
  }, [isUpdate, postId, POST_API]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;

    setErrors((prev) => ({ ...prev, [name]: "" }));
    setSuccess("");

    switch (name) {
      case "title":
        setTitle(value);
        break;
      case "content":
        setContent(value);
        break;
      case "eventDate":
        setEventDate(value);
        break;
      case "location":
        setLocation(value);
        break;
    }
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrors((prev) => ({
        ...prev,
        image: "Please select a valid image.",
      }));
      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        image: "Image size must be less than 5 MB.",
      }));
      e.target.value = "";
      return;
    }

    if (previewRef.current) {
      URL.revokeObjectURL(previewRef.current);
    }

    const preview = URL.createObjectURL(file);

    previewRef.current = preview;

    setSelectedImage(file);
    setImagePreview(preview);

    setErrors((prev) => ({ ...prev, image: "" }));
    setSuccess("");
  }

  function removeImage() {
    if (previewRef.current) {
      URL.revokeObjectURL(previewRef.current);
      previewRef.current = null;
    }

    setSelectedImage(null);
    setImagePreview(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  function validate() {
    const newErrors: Record<string, string> = {};

    if (title.trim().length < 3) {
      newErrors.title = "Title must contain at least 3 characters.";
    }

    if (content.trim().length < 10) {
      newErrors.content = "Description must contain at least 10 characters.";
    }

    if (!eventDate) {
      newErrors.eventDate = "Please select an event date.";
    } else if (!isUpdate && minDate && eventDate < minDate) {
      newErrors.eventDate = "Past dates are not allowed.";
    }

    if (!location.trim()) {
      newErrors.location = "Location is required.";
    }

    if (!category) {
      newErrors.category = "Please select a category.";
    }

    if (!isUpdate && !selectedImage) {
      newErrors.image = "Please upload an event image.";
    }

    return newErrors;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const newErrors = validate();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (isUpdate && (!postId || !POST_API)) {
      setErrors({ submit: "Update API configuration is missing." });
      return;
    }

    if (!isUpdate && !CREATE_API) {
      setErrors({ submit: "Create API configuration is missing." });
      return;
    }

    setLoading(true);
    setErrors({});
    setSuccess("");

    const formData = new FormData();

    formData.append("title", title.trim());
    formData.append("content", content.trim());
    formData.append("eventDate", eventDate);
    formData.append("location", location.trim());
    formData.append("category", category);

    if (selectedImage) {
      formData.append("image", selectedImage);
    }

    try {
      // ========== Token নেওয়া + Save করা ==========
      const jwtToken = await getAndSaveToken();
      // ===========================================

      const url = isUpdate ? `\( {POST_API}/ \){postId}` : CREATE_API!;

      const response = await fetch(url, {
        method: isUpdate ? "PUT" : "POST",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        credentials: "include",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Something went wrong.");
      }

      setSuccess(
        isUpdate
          ? "Post updated successfully!"
          : "Post published successfully!"
      );

      if (!isUpdate) {
        setTitle("");
        setContent("");
        setEventDate("");
        setLocation("");
        setCategory("");
        removeImage();
      } else {
        router.push("/manage-events");
        router.refresh();
      }
    } catch (error: unknown) {
      setErrors({
        submit:
          error instanceof Error ? error.message : "Something went wrong.",
      });
    } finally {
      setLoading(false);
    }
  }



  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10";

  const labelClass = "mb-2.5 block text-sm font-semibold text-slate-700";

  if (fetching) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-indigo-100 border-t-indigo-600" />
          <p className="mt-4 text-sm font-medium text-slate-500">
            Loading post information...
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-slate-50 to-purple-50 px-4 py-10 sm:px-6 lg:py-16">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-9 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100 text-3xl text-indigo-600 shadow-sm">
            ✦
          </div>

          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">
            Community Events
          </p>

          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            {isUpdate ? "Update Your Event" : "Create an Event"}
          </h1>

          <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-500 sm:text-base">
            {isUpdate
              ? "Make changes to your event information and keep your community updated."
              : "Share your event with the community and bring people together."}
          </p>
        </div>

        {/* Form Card */}
        <div className="overflow-hidden rounded-3xl border border-white bg-white shadow-[0_20px_60px_-25px_rgba(30,41,59,0.2)]">
          <div className="border-b border-slate-100 bg-slate-50/70 px-5 py-6 sm:px-9">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-100 text-xl">
                📝
              </div>

              <div>
                <h2 className="font-bold text-slate-900">Event Information</h2>
                <p className="mt-1 text-xs text-slate-500">
                  Complete the information below.
                </p>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="space-y-7 p-5 sm:p-9"
          >
            {/* Title */}
            <div>
              <label htmlFor="title" className={labelClass}>
                Event Title <span className="text-red-500">*</span>
              </label>

              <input
                id="title"
                name="title"
                value={title}
                onChange={handleChange}
                placeholder="e.g. Community Clean-up Day"
                className={inputClass}
                disabled={loading}
              />

              {errors.title && (
                <p className="mt-2 text-xs text-red-500">{errors.title}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label htmlFor="content" className={labelClass}>
                Event Description <span className="text-red-500">*</span>
              </label>

              <textarea
                id="content"
                name="content"
                rows={5}
                value={content}
                onChange={handleChange}
                placeholder="Tell people what your event is about..."
                className={`${inputClass} resize-y`}
                disabled={loading}
              />

              {errors.content && (
                <p className="mt-2 text-xs text-red-500">{errors.content}</p>
              )}

              <p className="mt-2 text-xs text-slate-400">
                Minimum 10 characters.
              </p>
            </div>

            {/* Date */}
            <div>
              <label htmlFor="eventDate" className={labelClass}>
                Event Date <span className="text-red-500">*</span>
              </label>

              <input
                id="eventDate"
                type="date"
                name="eventDate"
                value={eventDate}
                min={!isUpdate ? minDate : undefined}
                onChange={handleChange}
                className={inputClass}
                disabled={loading}
              />

              {errors.eventDate && (
                <p className="mt-2 text-xs text-red-500">{errors.eventDate}</p>
              )}
            </div>

            {/* Location */}
            <div>
              <label htmlFor="location" className={labelClass}>
                Event Location <span className="text-red-500">*</span>
              </label>

              <input
                id="location"
                name="location"
                value={location}
                onChange={handleChange}
                placeholder="Enter event location"
                className={inputClass}
                disabled={loading}
              />

              {errors.location && (
                <p className="mt-2 text-xs text-red-500">{errors.location}</p>
              )}
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className={labelClass}>
                Category <span className="text-red-500">*</span>
              </label>

              <select
                id="category"
                name="category"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setErrors((prev) => ({ ...prev, category: "" }));
                }}
                className={inputClass}
                disabled={loading}
              >
                <option value="">Select a category</option>

                {categories.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>

              {errors.category && (
                <p className="mt-2 text-xs text-red-500">{errors.category}</p>
              )}
            </div>

            {/* Image Upload */}
            <div>
              <label className={labelClass}>
                Event Cover Image{" "}
                <span className="text-slate-400">
                  {isUpdate ? "(Optional)" : "*"}
                </span>
              </label>

              {imagePreview ? (
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imagePreview}
                    alt="Event preview"
                    className="h-56 w-full object-cover sm:h-72"
                  />

                  <div className="flex flex-wrap items-center justify-between gap-3 p-4">
                    <div>
                      <p className="text-sm font-semibold text-slate-700">
                        {selectedImage
                          ? selectedImage.name
                          : "Current event image"}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        {selectedImage
                          ? `${(selectedImage.size / (1024 * 1024)).toFixed(2)} MB`
                          : "Existing image"}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={removeImage}
                      disabled={loading}
                      className="rounded-lg border border-red-100 bg-white px-4 py-2 text-xs font-semibold text-red-500 transition hover:bg-red-50"
                    >
                      {isUpdate ? "Change Image ✕" : "Remove Image ✕"}
                    </button>
                  </div>
                </div>
              ) : (
                <label
                  htmlFor="image"
                  className="group flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/70 px-5 py-10 text-center transition hover:border-indigo-400 hover:bg-indigo-50/40"
                >
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100 text-2xl text-indigo-600">
                    ↑
                  </div>

                  <p className="text-sm font-bold text-slate-700">
                    Click to upload your image
                  </p>

                  <p className="mt-2 text-xs text-slate-400">
                    PNG, JPG, JPEG or WEBP
                  </p>

                  <span className="mt-4 rounded-lg bg-white px-4 py-2 text-xs font-semibold text-indigo-600 shadow-sm ring-1 ring-slate-200">
                    Browse Files
                  </span>

                  <p className="mt-3 text-[11px] text-slate-400">
                    Maximum file size: 5 MB
                  </p>

                  <input
                    ref={fileInputRef}
                    id="image"
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={handleImageChange}
                    disabled={loading}
                    className="sr-only"
                  />
                </label>
              )}

              {errors.image && (
                <p className="mt-2 text-xs text-red-500">{errors.image}</p>
              )}
            </div>

            {/* Error */}
            {errors.submit && (
              <div
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
              >
                {errors.submit}
              </div>
            )}

            {/* Success */}
            {success && (
              <div
                role="status"
                className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700"
              >
                ✓ {success}
              </div>
            )}

            {/* Submit */}
            <div className="border-t border-slate-100 pt-6">
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-4 text-sm font-bold text-white shadow-lg shadow-indigo-600/20 transition hover:-translate-y-0.5 hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    {isUpdate ? "Updating Event..." : "Publishing Event..."}
                  </>
                ) : (
                  <>
                    {isUpdate ? "Update Event" : "Publish Event"}
                    <span>→</span>
                  </>
                )}
              </button>

              <p className="mt-4 text-center text-xs text-slate-400">
                Please review your event details before submitting.
              </p>
            </div>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-slate-400">
          Made for communities, powered by people. ✦
        </p>
      </div>
    </main>
  );
}




 

