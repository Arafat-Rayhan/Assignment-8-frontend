"use client"
import React, { useEffect, useState } from "react";

export default function PostForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [minDate, setMinDate] = useState("");

  useEffect(() => {
    const today = new Date();
    const formatted = [
      today.getFullYear(),
      String(today.getMonth() + 1).padStart(2, "0"),
      String(today.getDate()).padStart(2, "0"),
    ].join("-");

    setMinDate(formatted);
  }, []);

  function getTodayDate() {
    return minDate;
  }


  // ২. Validation Function
  function validate(data:Record<string,string>) {
    const newErrors:Record<string,string> = {};

    if (data.title.trim().length < 3) {
      newErrors.title = "টাইটেল কমপক্ষে ৩ অক্ষরের হতে হবে";
    }

    if (data.content.trim().length < 10) {
      newErrors.content = "কন্টেন্ট কমপক্ষে ১০ অক্ষরের হতে হবে";
    }
    if (!data.eventDate) {
      newErrors.eventDate = "ইভেন্টের তারিখ দিন";
    } else if (data.eventDate < getTodayDate()) {
      newErrors.eventDate = "Past date নির্বাচন করা যাবে না";
    }

    return newErrors;
  }

  // ৩. Input পরিবর্তন হলে Error মুছে ফেলা
 function handleChange(
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) {
  const name = e.currentTarget.name;

  setErrors((prev) => ({
    ...prev,
    [name]: "",
  }));

  setSuccess("");
}

  // ৪. Form Submit Function
  async function handleSubmit(e:React.FormEvent<HTMLFormElement>) {
    e.preventDefault();     

    // Form Element সংরক্ষণ
    const form = e.currentTarget;

    // FormData দিয়ে ইনপুট সংগ্রহ
    const formData = new FormData(form);

    // FormData থেকে Object তৈরি
    const data:Record<string,string> = {};

    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    // Validation চালানো
    const newErrors = validate(data);

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Submit শুরু
    setLoading(true);
    setErrors({});
    setSuccess("");

    try {

      // API Request
      const response = await fetch("http://localhost:4000/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials:"include",
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Post তৈরি করা যায়নি");
      }

      // সফল হলে
      setSuccess("Post সফলভাবে তৈরি হয়েছে!");

      // Form Reset
      form.reset();

    } catch (error: unknown) {

  const message =
    error instanceof Error
      ? error.message
      : "কিছু একটা সমস্যা হয়েছে";

  setErrors({
    submit: message,
  });

}
  }

  // ৫. Input Style
  const inputClass =
    "w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  // ৬. Form UI
  return (
    <div className="mx-auto max-w-xl rounded-2xl bg-white p-6 shadow-lg">

      <h2 className="mb-6 text-2xl font-bold">
        Create New Post
      </h2>

      <form onSubmit={handleSubmit} noValidate>

        {/* Title */}
        <div className="mb-5">

          <label className="mb-2 block font-medium">
            Post Title
          </label>

          <input
            type="text"
            name="title"
            placeholder="Enter post title"
            className={inputClass}
            onChange={handleChange}
          />

          {errors.title && (
            <p className="mt-1 text-sm text-red-500">
              {errors.title}
            </p>
          )}

        </div>

        {/* Content */}
        <div className="mb-5">

          <label className="mb-2 block font-medium">
            Post Content
          </label>

          <textarea
            name="content"
            rows={5}
            placeholder="Write your post..."
            className={inputClass}
            onChange={handleChange}
          />

          {errors.content && (
            <p className="mt-1 text-sm text-red-500">
              {errors.content}
            </p>
          )}

        </div>

        {/* Event Date */}
        <div className="mb-5">

          <label className="mb-2 block font-medium">
            Event Date
          </label>

          <input
            type="date"
            name="eventDate"
            min={getTodayDate()}
            className={inputClass}
            onChange={handleChange}
          />

          {errors.eventDate && (
            <p className="mt-1 text-sm text-red-500">
              {errors.eventDate}
            </p>
          )}

        </div>

        {/* General Error */}
        {errors.submit && (
          <p className="mb-4 text-sm text-red-500">
            {errors.submit}
          </p>
        )}

        {/* Success Message */}
        {success && (
          <p className="mb-4 text-sm text-green-600">
            {success}
          </p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Create Post"}
        </button>

      </form>

    </div>
  );
}