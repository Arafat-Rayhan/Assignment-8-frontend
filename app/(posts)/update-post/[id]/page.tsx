"use client";

import { Suspense } from "react";
import { useParams } from "next/navigation";
import PostForm from "@/component/postUi/PostFrom";

export default function EditPostPage() {
  return (
    <Suspense fallback={<div className="p-6 text-slate-500">Loading post...</div>}>
      <EditPostPageContent />
    </Suspense>
  );
}

function EditPostPageContent() {
  const params = useParams<{ id: string }>();
  const id = params?.id;

  if (!id) {
    return <div className="p-6 text-red-500">Post ID missing.</div>;
  }

  return <PostForm mode="update" postId={id} />;
}