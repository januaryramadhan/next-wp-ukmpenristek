import { Suspense } from "react";
import { getClient } from "@/libs/config/wordpress/apollo-client";
import { GET_ALL_TAGS } from "@/libs/graphql";
import { Section, Container } from "@/components/commons/craft";
import { Metadata } from "next";
import Link from "next/link";
import BackButton from "@/components/commons/back";
import { badgeVariants } from "@/components/ui/badge";
import { cn } from "@/libs/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata: Metadata = {
  title: "Label | UKM PENRISTEK UT",
  description: "Jelajahi semua label artikel di situs UKM PENRISTEK UT.",
  openGraph: {
    title: "Label | UKM PENRISTEK UT",
    description: "Jelajahi semua label artikel di situs UKM PENRISTEK UT.",
    type: "website",
  },
};

// Using static value for revalidation
export const revalidate = 7200;

// Loading component
function TagsLoading() {
  return (
    <Section>
      <Container>
        <div className="bg-muted/50 py-12 mb-12 -mx-6 sm:-mx-8">
          <div className="max-w-3xl mx-auto text-center px-6">
            <Skeleton className="h-10 w-32 mx-auto mb-4" />
            <Skeleton className="h-6 w-80 mx-auto" />
          </div>
        </div>

        <div className="mb-8">
          <Skeleton className="h-10 w-24" />
        </div>

        <Card>
          <CardHeader>
            <Skeleton className="h-7 w-32 mb-2" />
            <Skeleton className="h-5 w-28" />
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {[...Array(8)].map((_, i) => (
                <Skeleton key={i} className="h-24" />
              ))}
            </div>
          </CardContent>
        </Card>
      </Container>
    </Section>
  );
}

async function TagsContent() {
  try {
    const { data } = await getClient().query({ 
      query: GET_ALL_TAGS,
      context: {
        fetchOptions: {
          next: { revalidate: 3600 }
        }
      }
    });
    
    const tags = data.tags.nodes;

    if (!tags.length) {
      return (
        <Section>
          <Container>
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">
                  Tidak ada label yang ditemukan.
                </p>
              </CardContent>
            </Card>
          </Container>
        </Section>
      );
    }

    // Sort tags by count (most used first)
    const sortedTags = [...tags].sort((a, b) => b.count - a.count);

    return (
      <Section>
        <Container>
          {/* Hero Section */}
          <div className="bg-muted/50 py-12 mb-12 -mx-6 sm:-mx-8">
            <div className="max-w-3xl mx-auto text-center px-6">
              <h1 className="text-4xl font-bold tracking-tight mb-4">Label</h1>
              <p className="text-lg text-muted-foreground">
                Jelajahi konten kami berdasarkan topik dan minat
              </p>
            </div>
          </div>

          <div className="mb-8">
            <BackButton />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Semua Label</CardTitle>
              <CardDescription>
                Ditemukan {tags.length} label
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {sortedTags.map((tag) => (
                  <Link
                    key={tag.id}
                    href={`/posts/?tag=${tag.slug}`}
                    className={cn(
                      badgeVariants({ variant: "secondary" }),
                      "group text-center h-auto py-8 hover:bg-primary hover:text-primary-foreground transition-colors",
                    )}
                  >
                    <span className="block mb-1">{tag.name}</span>
                    {tag.count > 0 && (
                      <span className="text-xs text-muted-foreground group-hover:text-primary-foreground/70 transition-colors">
                        {tag.count} artikel
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </Container>
      </Section>
    );
  } catch (error) {
    console.error("Error saat mengambil label:", error);
    return (
      <Section>
        <Container>
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-red-500 font-semibold mb-2">
                Terjadi Kesalahan
              </p>
              <p className="text-muted-foreground">
                Gagal memuat label. Silakan coba lagi nanti.
              </p>
            </CardContent>
          </Card>
        </Container>
      </Section>
    );
  }
}

// Main component with suspense
export default function TagsPage() {
  return (
    <Suspense fallback={<TagsLoading />}>
      <TagsContent />
    </Suspense>
  );
}