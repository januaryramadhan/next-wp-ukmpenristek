import Image from "next/image";
import Link from "next/link";
import { Post } from "@/libs/types/wordpress"; // Update this import
import { cn } from "@/libs/utils";

interface GraphQLPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  featuredImage: {
    node: {
      sourceUrl: string;
    };
  };
  author: {
    node: {
      name: string;
      slug: string;
      avatar: {
        url: string;
      };
    };
  };
  categories: {
    nodes: {
      id: string;
      name: string;
      slug: string;
    }[];
  };
}

export default function PostCard({ post }: { post: GraphQLPost }) {
  const date = new Date(post.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Link href={`/posts/${post.slug}`} className="group">
      <div
        className={cn(
          "cursor-pointer overflow-hidden relative rounded-md shadow-lg transition-transform transform hover:scale-105",
          "bg-white dark:bg-card w-full max-w-xs mx-auto h-full flex flex-col"
        )}
      >
        {post.featuredImage?.node ? (
          <div
            className="h-48 w-full bg-cover bg-center"
            style={{
              backgroundImage: `url(${post.featuredImage.node.sourceUrl})`,
            }}
          ></div>
        ) : (
          <div className="h-48 w-full bg-gray-200 flex items-center justify-center">
            <span>No Image Available</span>
          </div>
        )}
        <div className="p-4 flex flex-col flex-grow">
          <div className="flex items-center space-x-4 mb-4">
            <Image
              height={40}
              width={40}
              alt={post.author.node.name}
              src={post.author.node.avatar.url}
              className="h-10 w-10 rounded-full border-2 object-cover"
            />
            <div className="flex flex-col">
              <p className="font-medium text-gray-900 dark:text-gray-50">
                {post.author.node.name}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {post.categories.nodes[0]?.name}
              </p>
            </div>
          </div>
          <h2
            className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2"
          >
            {post.title}
          </h2>
          <div
            className="text-sm text-gray-700 dark:text-gray-300 mb-4 flex-grow"
            dangerouslySetInnerHTML={{
              __html: post.excerpt,
            }}
          />
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-auto">{date}</p>
        </div>
      </div>
    </Link>
  );
}