import { Suspense } from "react";
import { getClient } from "@/libs/config/wordpress/apollo-client";
import { GET_POST_BY_SLUG, GET_ALL_POSTS } from "@/libs/graphql";
import { Section, Container, Article } from "@/components/commons/craft";
import { Metadata } from "next";
import { badgeVariants } from "@/components/ui/badge";
import { cn } from "@/libs/utils";
import { notFound } from "next/navigation";
import Link from "next/link";
import Balancer from "react-wrap-balancer";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  params: {
    slug: string;
  };
}

// Using static value for revalidation
export const revalidate = 60; // 5 minutes

// Loading component
function PostLoading() {
  return (
    <Section>
      <Container>
        <article>
          <header className="mb-8">
            <Skeleton className="h-16 w-3/4 mb-4" />
            <div className="flex flex-wrap justify-between items-center gap-4">
              <Skeleton className="h-6 w-48" />
              <div className="flex gap-2">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-6 w-24" />
              </div>
            </div>
          </header>
          <Skeleton className="h-96 w-full mb-8" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
          </div>
        </article>
      </Container>
    </Section>
  );
}

export async function generateStaticParams() {
  const { data } = await getClient().query({
    query: GET_ALL_POSTS,
    variables: { first: 50 },
    context: {
      fetchOptions: {
        next: { revalidate: 3600 }
      }
    }
  });

  return data.posts.nodes.map((post: any) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { data } = await getClient().query({
    query: GET_POST_BY_SLUG,
    variables: { slug: params.slug },
    context: {
      fetchOptions: {
        next: { revalidate: 300 }
      }
    }
  });

  if (!data.post) {
    return {
      title: 'Post Not Found | UKM PENRISTEK UT',
      description: 'The requested post could not be found'
    };
  }

  const { post } = data;

  return {
    title: `${post.title} | UKM PENRISTEK UT`,
    description: post.excerpt?.replace(/<[^>]*>/g, '').slice(0, 160),
    openGraph: {
      title: post.title,
      description: post.excerpt?.replace(/<[^>]*>/g, '').slice(0, 160),
      type: 'article',
      images: [
        {
          url: post.featuredImage?.node?.sourceUrl || '/images/og-default.jpg',
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      publishedTime: post.date,
      modifiedTime: post.modified,
      authors: [post.author?.node?.name],
      tags: post.categories?.nodes?.map((cat) => cat.name) || [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt?.replace(/<[^>]*>/g, '').slice(0, 160),
      images: [post.featuredImage?.node?.sourceUrl || '/images/og-default.jpg'],
    },
    authors: [
      {
        name: post.author?.node?.name,
        url: `/posts/authors/${post.author?.node?.slug}`,
      },
    ],
    keywords: post.categories?.nodes?.map((cat) => cat.name).join(', '),
    alternates: {
      canonical: `/posts/${params.slug}`,
    },
  };
}

async function PostContent({ params }: Props) {
  try {
    const { data } = await getClient().query({
      query: GET_POST_BY_SLUG,
      variables: { slug: params.slug },
      context: {
        fetchOptions: {
          next: { revalidate: 300 }
        }
      }
    });

    if (!data.post) {
      notFound();
    }

    const { post } = data;
    const date = new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(new Date(post.date));

    return (
      <Section>
        <Container>
          <article>
            <header className="mb-8">
              <h1 className="scroll-m-20 text-2xl font-bold tracking-tight lg:text-5xl mb-4">
                <Balancer>{post.title}</Balancer>
              </h1>

              <div className="flex flex-wrap justify-between items-center gap-4 text-sm mb-4">
                <h5 className="text-muted-foreground">
                  {date} | Dibuat Oleh{" "}
                  {post.author?.node && (
                    <Link 
                      href={`/posts/authors/${post.author.node.slug}`}
                      className="hover:underline"
                    >
                      {post.author.node.name}
                    </Link>
                  )}
                </h5>
                <div className="flex flex-wrap gap-2">
                  {post.categories?.nodes?.map((category) => (
                    <Link
                      key={category.id}
                      href={`/posts/?category=${category.slug}`}
                      className={cn(badgeVariants({ variant: "outline" }), "not-prose")}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
            </header>

            {post.featuredImage?.node ? (
              <figure className="h-96 my-12 md:h-[560px] overflow-hidden flex items-center justify-center border rounded-lg bg-accent/25">
                <img
                  className="w-full h-full object-cover"
                  src={post.featuredImage.node.sourceUrl}
                  alt={post.featuredImage.node.altText || post.title}
                  loading="eager"
                />
              </figure>
            ) : (
              <div className="h-96 my-12 md:h-[560px] overflow-hidden flex items-center justify-center border rounded-lg bg-accent/25">
                <span className="text-muted-foreground">No Image Available</span>
              </div>
            )}

            <Article 
              dangerouslySetInnerHTML={{ __html: post.content }} 
              className="mt-8"
            />
          </article>
        </Container>
      </Section>
    );
  } catch (error) {
    console.error('Error loading post:', error);
    return (
      <Section>
        <Container>
          <div className="text-center py-10">
            <h1 className="text-2xl font-bold text-red-500">Error Loading Post</h1>
            <p className="mt-2 text-muted-foreground">
              There was an error loading this post. Please try again later.
            </p>
          </div>
        </Container>
      </Section>
    );
  }
}

// Main component with suspense
export default function PostPage({ params }: Props) {
  return (
    <Suspense fallback={<PostLoading />}>
      <PostContent params={params} />
    </Suspense>
  );
}