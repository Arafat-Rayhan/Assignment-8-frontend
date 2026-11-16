import Link from 'next/link'
import {  getCategory } from "@/app/lib/categories";


type Post = {
    _id: string;
    title: string;
    content: string;
    image?: string;
    eventDate?: string;
    location?: string;
    category: string;
}

const PostCard = ({posts}:{posts:Post[]}) => {
    return (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post:Post) => {
            const cat = getCategory(post.category);
            const date = post.eventDate
              ? new Date(post.eventDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              : null;

            return (
              <Link
                key={post._id}
                href={`/postDetail/${post._id}`}
                className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/10"
              >
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
                  <p className="mt-2 line-clamp-2 text-sm text-slate-600">{post.content}</p>

                  <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
                    {date && <span>{date}</span>}
                    {post.location && <span>{post.location}</span>}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
    );
};

export default PostCard;

