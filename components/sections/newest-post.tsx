import { getAllPosts, getFeaturedMediaById, getAuthorById } from "@/lib/wordpress";
import { Section, Container } from "@/components/commons/craft";
import Link from "next/link";
import Image from "next/image";
import { Post } from "@/lib/wordpress.d";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export async function NewestPost() {
  // Fetch 3 most recent posts
  const posts = await getAllPosts();
  const recentPosts = posts.slice(0, 3);

  // Fetch featured media and author details for each post
  const postsWithDetails = await Promise.all(
    recentPosts.map(async (post) => {
      const featuredMedia = await getFeaturedMediaById(post.featured_media);
      const author = await getAuthorById(post.author);
      return {
        ...post,
        featuredMedia,
        author,
      };
    })
  );

  return (
    <Section className=" py-16">
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
          {postsWithDetails.map((post, index) => (
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
                <Image
                  src={post.featuredMedia.source_url}
                  alt={post.title.rendered}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-4 space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Image
                    src={post.author.avatar_urls["48"]}
                    alt={post.author.name}
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                  <span>{post.author.name}</span>
                  <span>•</span>
                  <span>
                    {new Date(post.date).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <h3
                  className={cn(
                    "font-semibold line-clamp-2",
                    index === 0 ? "text-2xl" : "text-lg"
                  )}
                  dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                />
                <div
                  className="text-muted-foreground line-clamp-2 text-sm"
                  dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
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
}