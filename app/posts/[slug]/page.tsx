import {
  getPostBySlug,
  getFeaturedMediaById,
  getAuthorById,
  getCategoryById,
} from "@/lib/wordpress/wordpress";

import { Section, Container, Article } from "@/components/commons/craft";
import { Metadata } from "next";
import { badgeVariants } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { notFound } from "next/navigation"; // Import notFound

import Link from "next/link";
import Balancer from "react-wrap-balancer";

type Props = {
  params: {
    slug: Promise<string> | string;
  };
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const slug = await params.slug;
  const post = await getPostBySlug(slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested post could not be found'
    };
  }

  return {
    title: post.title.rendered,
    description: post.excerpt.rendered,
  };
}

export default async function Page({ params }: Props) {
  const slug = await params.slug;
  const post = await getPostBySlug(slug);

  // If post not found, show 404
  if (!post) {
    notFound();
  }

  // Now we can safely destructure/use post properties since we know it exists
  const featuredMedia = post.featured_media 
    ? await getFeaturedMediaById(post.featured_media) 
    : null;
    
  const author = await getAuthorById(post.author);
  const date = new Date(post.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const category = await getCategoryById(post.categories[0]);

  return (
    <Section>
      <Container>
        <h1>
          <Balancer>
            <span
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            ></span>
          </Balancer>
        </h1>

        <div className="flex justify-between items-center gap-4 text-sm mb-4">
          <h5>
            Published {date} by{" "}
            {author?.name && (
              <span>
                <a href={`/posts/?author=${author.id}`}>{author.name}</a>{" "}
              </span>
            )}
          </h5>
          {category && (
            <Link
              href={`/posts/?category=${category.id}`}
              className={cn(badgeVariants({ variant: "outline" }), "not-prose")}
            >
              {category.name}
            </Link>
          )}
        </div>
        {featuredMedia && featuredMedia.source_url ? (
          <div className="h-96 my-12 md:h-[560px] overflow-hidden flex items-center justify-center border rounded-lg bg-accent/25">
            {/* eslint-disable-next-line */}
            <img
              className="w-full"
              src={featuredMedia.source_url}
              alt={post.title.rendered}
            />
          </div>
        ) : (
          <div className="h-96 my-12 md:h-[560px] overflow-hidden flex items-center justify-center border rounded-lg bg-accent/25">
            <span>No Image Available</span>
          </div>
        )}
        <Article dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
      </Container>
    </Section>
  );
}