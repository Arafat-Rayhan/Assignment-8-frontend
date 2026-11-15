import PostForm from "@/component/postUi/PostFrom"; // আপনার PostForm ফাইলের আসল পাথ দিন

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <PostForm mode="update" postId={id} />;
}