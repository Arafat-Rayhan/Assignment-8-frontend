 

"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { categories } from "@/app/lib/categories";
import { getAuthHeaders } from "@/app/lib/auth-headers";

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

  const CREATE_API = process.env.NEXT_PUBLIC_CREAT_POST;
  const POST_API = process.env.NEXT_PUBLIC_POSTS_URL;

 


  const [minDate] = useState(() => {
  const today = new Date();
  const localToday = new Date(
    today.getTime() - today.getTimezoneOffset() * 60000,
  );
  return localToday.toISOString().slice(0, 10);
});

  // Update mode: পুরনো পোস্ট লোড
  useEffect(() => {
    if (!isUpdate || !postId || !POST_API) return;

    let active = true;

    async function fetchPost() {
      try {
        setFetching(true);

        const headers = await getAuthHeaders();

        const response = await fetch(POST_API + "/" + postId, {
          method: "GET",
          headers,
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
            : "",
        );
        setImagePreview(post.image || null);
      } catch (error) {
        if (active) {
          setErrors({
            submit:
              error instanceof Error ? error.message : "Failed to load post.",
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
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
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
      case "category":
        setCategory(value);
        break;
    }
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrors((prev) => ({ ...prev, image: "Please select a valid image." }));
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

    if (selectedImage) formData.append("image", selectedImage);

    try {
      const headers = await getAuthHeaders();
      const url = isUpdate ? POST_API + "/" + postId : CREATE_API;

      const response = await fetch(url as string, {
        method: isUpdate ? "PUT" : "POST",
        headers,
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
          : "Post published successfully!",
      );

      if (!isUpdate) {
        setTitle("");
        setContent("");
        setEventDate("");
        setLocation("");
        setCategory("");
        removeImage();
      } else {
        router.push("/manageEvent");
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




  const inputClass = "w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10";
  const labelClass = "mb-2.5 block text-sm font-semibold text-slate-700";

  if (fetching) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-indigo-100 border-t-indigo-600" />
          <p className="mt-4 text-sm font-medium text-slate-500">Loading post information...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-slate-50 to-purple-50 px-4 py-10 sm:px-6 lg:py-16">
      <div className="mx-auto max-w-3xl">
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

        <div className="overflow-hidden rounded-3xl border border-white bg-white shadow-[0_20px_60px_-25px_rgba(30,41,59,0.2)]">
          <div className="border-b border-slate-100 bg-slate-50/70 px-5 py-6 sm:px-9">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-100 text-xl">
                📝
              </div>

              <div>
                <h2 className="font-bold text-slate-900">Event Information</h2>
                <p className="mt-1 text-xs text-slate-500">Complete the information below.</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-7 p-5 sm:p-9">
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
              {errors.title && <p className="mt-2 text-sm text-red-500">{errors.title}</p>}
            </div>

            <div>
              <label htmlFor="content" className={labelClass}>
                Description <span className="text-red-500">*</span>
              </label>

              <textarea
                id="content"
                name="content"
                value={content}
                onChange={handleChange}
                rows={6}
                placeholder="Tell people what makes this event special..."
                className={inputClass + " resize-none"}
                disabled={loading}
              />
              {errors.content && <p className="mt-2 text-sm text-red-500">{errors.content}</p>}
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="eventDate" className={labelClass}>
                  Event Date <span className="text-red-500">*</span>
                </label>
                <input
                  id="eventDate"
                  name="eventDate"
                  type="date"
                  min={minDate}
                  value={eventDate}
                  onChange={handleChange}
                  className={inputClass}
                  disabled={loading}
                />
                {errors.eventDate && <p className="mt-2 text-sm text-red-500">{errors.eventDate}</p>}
              </div>

              <div>
                <label htmlFor="location" className={labelClass}>
                  Location <span className="text-red-500">*</span>
                </label>
                <input
                  id="location"
                  name="location"
                  value={location}
                  onChange={handleChange}
                  placeholder="e.g. Dhaka, Bangladesh"
                  className={inputClass}
                  disabled={loading}
                />
                {errors.location && <p className="mt-2 text-sm text-red-500">{errors.location}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="category" className={labelClass}>
                Category <span className="text-red-500">*</span>
              </label>

              <select
                id="category"
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={inputClass}
                disabled={loading}
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat.slug} value={cat.slug}>{cat.slug}</option>
                ))}
              </select>
              {errors.category && <p className="mt-2 text-sm text-red-500">{errors.category}</p>}
            </div>

            <div>
              <label className={labelClass}>
                Event Image {isUpdate ? "" : <span className="text-red-500">*</span>}
              </label>

              <div className="flex flex-col gap-4 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-4 sm:p-5">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="block w-full text-sm text-slate-600 file:mr-4 file:rounded-full file:border-0 file:bg-indigo-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-indigo-500"
                  disabled={loading}
                />

                {imagePreview ? (
                  <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white">
                    <img src={imagePreview} alt="Preview" className="h-56 w-full object-cover" />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700 shadow"
                    >
                      Remove
                    </button>
                  </div>
                ) : null}
              </div>
              {errors.image && <p className="mt-2 text-sm text-red-500">{errors.image}</p>}
            </div>

            {errors.submit && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {errors.submit}
              </div>
            )}

            {success && (
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-600">
                {success}
              </div>
            )}

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => router.back()}
                className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-600/25 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? "Saving..." : isUpdate ? "Update Event" : "Create Event"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
