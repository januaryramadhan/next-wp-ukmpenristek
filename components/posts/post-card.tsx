import Image from "next/image";
import Link from "next/link";
import { Post } from "@/lib/wordpress.d";
import { cn } from "@/lib/utils";
import {
  getFeaturedMediaById,
  getAuthorById,
  getCategoryById,
} from "@/lib/wordpress";

export default async function PostCard({ post }: { post: Post }) {
  const media = await getFeaturedMediaById(post.featured_media);
  const author = await getAuthorById(post.author);
  const date = new Date(post.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const category = await getCategoryById(post.categories[0]);

  return (
    <Link href={`/posts/${post.slug}`} className="group">
      <div
        className={cn(
          "cursor-pointer overflow-hidden relative rounded-md shadow-lg transition-transform transform hover:scale-105",
          "bg-white dark:bg-card w-full max-w-xs mx-auto h-full flex flex-col"
        )}
      >
        <div
          className="h-48 w-full bg-cover bg-center"
          style={{
            backgroundImage: `url(${media.source_url})`,
          }}
        ></div>
        <div className="p-4 flex flex-col flex-grow">
          <div className="flex items-center space-x-4 mb-4">
            <Image
              height={40}
              width={40}
              alt={author.name}
              src={author.avatar_urls["48"]}
              className="h-10 w-10 rounded-full border-2 object-cover"
            />
            <div className="flex flex-col">
              <p className="font-medium text-gray-900 dark:text-gray-50">
                {author.name}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {category.name}
              </p>
            </div>
          </div>
          <h2
            className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2"
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />
          <div
            className="text-sm text-gray-700 dark:text-gray-300 mb-4 flex-grow"
            dangerouslySetInnerHTML={{
              __html:
                post.excerpt.rendered.split(" ").slice(0, 12).join(" ").trim() +
                "...",
            }}
          />
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-auto">{date}</p>
        </div>
      </div>
    </Link>
  );
}