import { Suspense } from "react";
import { getClient } from "@/libs/config/wordpress/apollo-client";
import { GET_ALL_CATEGORIES } from "@/libs/graphql";
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
  title: "Kategori | UKM PENRISTEK UT",
  description: "Jelajahi semua kategori artikel di situs UKM PENRISTEK UT.",
  openGraph: {
    title: "Kategori | UKM PENRISTEK UT",
    description: "Jelajahi semua kategori artikel di situs UKM PENRISTEK UT.",
    type: "website",
  },
};

// Using static value for revalidation
export const revalidate = 7200; // 1 hour

// Loading component
function CategoriesLoading() {
  return (
    <Section>
      <Container>
        <div className="bg-muted/50 py-12 mb-12 -mx-6 sm:-mx-8">
          <div className="max-w-3xl mx-auto text-center px-6">
            <Skeleton className="h-10 w-48 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
        </div>

        <div className="mb-8">
          <Skeleton className="h-10 w-24" />
        </div>

        <Card>
          <CardHeader>
            <Skeleton className="h-7 w-40 mb-2" />
            <Skeleton className="h-5 w-32" />
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {[...Array(8)].map((_, i) => (
                <Skeleton key={i} className="h-20" />
              ))}
            </div>
          </CardContent>
        </Card>
      </Container>
    </Section>
  );
}

async function CategoriesContent() {
  try {
    const { data } = await getClient().query({ 
      query: GET_ALL_CATEGORIES,
      context: {
        fetchOptions: {
          next: { revalidate: 3600 }
        }
      }
    });
    
    const categories = data?.categories?.nodes || [];

    if (!categories.length) {
      return (
        <Section>
          <Container>
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">
                  Tidak ada kategori yang ditemukan.
                </p>
              </CardContent>
            </Card>
          </Container>
        </Section>
      );
    }

    return (
      <Section>
        <Container>
          {/* Hero Section */}
          <div className="bg-muted/50 py-12 mb-12 -mx-6 sm:-mx-8">
            <div className="max-w-3xl mx-auto text-center px-6">
              <h1 className="text-4xl font-bold tracking-tight mb-4">
                Kategori
              </h1>
              <p className="text-lg text-muted-foreground">
                Jelajahi konten kami berdasarkan kategori yang tersedia
              </p>
            </div>
          </div>

          <div className="mb-8">
            <BackButton />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Semua Kategori</CardTitle>
              <CardDescription>
                Ditemukan {categories.length} kategori
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/posts/?category=${category.slug}`}
                    className={cn(
                      badgeVariants({ variant: "secondary" }),
                      "text-center h-auto py-6 px-4 hover:bg-primary hover:text-primary-foreground transition-colors",
                    )}
                  >
                    <span className="line-clamp-2">{category.name}</span>
                    {category.count > 0 && (
                      <span className="text-xs text-muted-foreground mt-1">
                        {category.count} artikel
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
    console.error("Error saat mengambil kategori:", error);
    return (
      <Section>
        <Container>
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-red-500 font-semibold mb-2">
                Terjadi Kesalahan
              </p>
              <p className="text-muted-foreground">
                Gagal memuat kategori. Silakan coba lagi nanti.
              </p>
            </CardContent>
          </Card>
        </Container>
      </Section>
    );
  }
}

// Main component with suspense
export default function CategoriesPage() {
  return (
    <Suspense fallback={<CategoriesLoading />}>
      <CategoriesContent />
    </Suspense>
  );
}