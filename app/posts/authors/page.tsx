import { Suspense } from "react";
import { getClient } from "@/libs/config/wordpress/apollo-client";
import { GET_ALL_AUTHORS } from "@/libs/graphql";
import { Section, Container } from "@/components/commons/craft";
import Link from "next/link";
import BackButton from "@/components/commons/back";
import { Metadata } from "next";
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
  title: "Penulis | UKM PENRISTEK UT",
  description: "Kenali para penulis dan kontributor artikel di UKM PENRISTEK UT.",
  openGraph: {
    title: "Penulis | UKM PENRISTEK UT",
    description: "Kenali para penulis dan kontributor artikel di UKM PENRISTEK UT.",
    type: "website",
  },
};

// Generate static params for ISR
export async function generateStaticParams() {
  return [{}]; // Empty object since this is a static page without dynamic params
}

// Set revalidation time for ISR
export const revalidate = 3600; // Revalidate every 1 hour

// Loading component remains the same
function AuthorsLoading() {
  // ... (loading component code remains unchanged)
}

// Main content component with static data fetching
async function AuthorsContent() {
  try {
    // Fetch data at build time and revalidate every hour
    const { data } = await getClient().query({
      query: GET_ALL_AUTHORS,
    });

    const authors = data.users.nodes;

    if (!authors.length) {
      return (
        <Section>
          <Container>
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">
                  Tidak ada penulis yang ditemukan.
                </p>
              </CardContent>
            </Card>
          </Container>
        </Section>
      );
    }

    // Sort authors by name
    const sortedAuthors = [...authors].sort((a, b) => 
      a.name.localeCompare(b.name, 'id')
    );

    return (
      <Section>
        <Container>
          {/* Hero Section */}
          <div className="bg-muted/50 py-12 mb-12 -mx-6 sm:-mx-8">
            <div className="max-w-3xl mx-auto text-center px-6">
              <h1 className="text-4xl font-bold tracking-tight mb-4">Penulis</h1>
              <p className="text-lg text-muted-foreground">
                Kenali para penulis dan kontributor berbakat kami yang berbagi
                pengetahuan dan wawasan mereka
              </p>
            </div>
          </div>

          <div className="mb-8">
            <BackButton />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Semua Penulis</CardTitle>
              <CardDescription>
                Ditemukan {authors.length} penulis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {sortedAuthors.map((author) => (
                  <Link
                    key={author.id}
                    href={`/posts/?author=${author.slug}`}
                    className={cn(
                      badgeVariants({ variant: "secondary" }),
                      "group text-center h-auto py-8 hover:bg-primary hover:text-primary-foreground transition-colors",
                    )}
                  >
                    <span className="block">{author.name}</span>
                    {author.count > 0 && (
                      <span className="text-xs text-muted-foreground group-hover:text-primary-foreground/70 transition-colors mt-1">
                        {author.count} artikel
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
    console.error("Error saat mengambil data penulis:", error);
    return (
      <Section>
        <Container>
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-red-500 font-semibold mb-2">
                Terjadi Kesalahan
              </p>
              <p className="text-muted-foreground">
                Gagal memuat daftar penulis. Silakan coba lagi nanti.
              </p>
            </CardContent>
          </Card>
        </Container>
      </Section>
    );
  }
}

// Main page component
export default function AuthorsPage() {
  return (
    <Suspense fallback={<AuthorsLoading />}>
      <AuthorsContent />
    </Suspense>
  );
}