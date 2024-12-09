import { Suspense } from "react";
import { getClient } from "@/libs/config/wordpress/apollo-client";
import { gql } from "@apollo/client";
import { Section, Container } from "@/components/commons/craft";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/libs/utils";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const GET_RECENT_POSTS = gql`
  query GetRecentPosts {
    posts(first: 6, where: { orderby: { field: DATE, order: DESC } }) {
      nodes {
        id
        title
        slug
        date
        excerpt
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        author {
          node {
            name
            avatar {
              url
            }
          }
        }
      }
    }
  }
`;

// Loading component
function PostSkeleton({ isFirst = false }: { isFirst?: boolean }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg border bg-card",
        isFirst && "md:col-span-2 md:row-span-2"
      )}
    >
      <div className={cn(
        "relative overflow-hidden",
        isFirst ? "aspect-[2/1.5]" : "aspect-[2/1]"
      )}>
        <Skeleton className="h-full w-full" />
      </div>
      <div className="p-4 space-y-2">
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-6 rounded-full" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-24" />
        </div>
        <Skeleton className={cn("h-6 w-full", isFirst && "h-8")} />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  );
}

function LoadingState() {
  return (
    <Section className="py-16">
      <Container>
        <div className="text-center mb-12">
          <Skeleton className="h-8 w-64 mx-auto mb-4" />
          <Skeleton className="h-4 w-96 mx-auto" />
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <PostSkeleton isFirst />
          <PostSkeleton />
          <PostSkeleton />
        </div>
      </Container>
    </Section>
  );
}

async function NewestPostContent() {
  try {
    const { data } = await getClient().query({
      query: GET_RECENT_POSTS,
      context: {
        fetchOptions: {
          next: { revalidate: 300 } // 5 minutes
        }
      }
    });

    const recentPosts = data.posts.nodes.slice(0, 3);

    if (!recentPosts.length) {
      return (
        <Section className="py-16">
          <Container>
            <div className="text-center">
              <p className="text-muted-foreground">
                Belum ada artikel yang tersedia.
              </p>
            </div>
          </Container>
        </Section>
      );
    }

    return (
      <Section className="py-16">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Artikel Terbaru
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Temukan wawasan dan pengetahuan terbaru dari anggota UKM PENRISTEK
              melalui artikel-artikel yang informatif dan inspiratif.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {recentPosts.map((post, index) => (
              <Link
                key={post.id}
                href={`/posts/${post.slug}`}
                className={cn(
                  "group relative overflow-hidden rounded-lg border bg-card transition-all hover:shadow-lg",
                  index === 0 && "md:col-span-2 md:row-span-2"
                )}
              >
                <div
                  className={cn(
                    "relative overflow-hidden",
                    index === 0 ? "aspect-[2/1.5]" : "aspect-[2/1]"
                  )}
                >
                  {post.featuredImage?.node ? (
                    <Image
                      src={post.featuredImage.node.sourceUrl}
                      alt={post.featuredImage.node.altText || post.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                      priority={index === 0}
                    />
                  ) : (
                    <div className="bg-muted h-full w-full flex items-center justify-center">
                      <span className="text-muted-foreground">Tidak ada gambar</span>
                    </div>
                  )}
                </div>
                <div className="p-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    {post.author.node.avatar && (
                      <Image
                        src={post.author.node.avatar.url}
                        alt={post.author.node.name}
                        width={24}
                        height={24}
                        className="rounded-full"
                      />
                    )}
                    <span>{post.author.node.name}</span>
                    <span>•</span>
                    <span>
                      {new Intl.DateTimeFormat("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      }).format(new Date(post.date))}
                    </span>
                  </div>
                  <h3
                    className={cn(
                      "font-semibold line-clamp-2",
                      index === 0 ? "text-2xl" : "text-lg"
                    )}
                  >
                    {post.title}
                  </h3>
                  <div
                    className="text-muted-foreground line-clamp-2 text-sm"
                    dangerouslySetInnerHTML={{ __html: post.excerpt }}
                  />
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button variant="outline" asChild>
              <Link href="/posts">Lihat Semua Artikel</Link>
            </Button>
          </div>
        </Container>
      </Section>
    );
  } catch (error) {
    console.error("Error saat mengambil artikel terbaru:", error);
    return (
      <Section className="py-16">
        <Container>
          <div className="text-center">
            <p className="text-red-500 font-semibold mb-2">
              Terjadi Kesalahan
            </p>
            <p className="text-muted-foreground">
              Gagal memuat artikel terbaru. Silakan coba lagi nanti.
            </p>
          </div>
        </Container>
      </Section>
    );
  }
}

// Main component with suspense
export function NewestPost() {
  return (
    <Suspense fallback={<LoadingState />}>
      <NewestPostContent />
    </Suspense>
  );
}