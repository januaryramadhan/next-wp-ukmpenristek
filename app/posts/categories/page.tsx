import { getAllCategories } from "@/lib/wordpress";
import { Section, Container } from "@/components/commons/craft";
import { Metadata } from "next";
import Link from "next/link";
import BackButton from "@/components/commons/back";
import { badgeVariants } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Categories | UKM PENRISTEK UT",
  description: "Browse all categories on the site.",
};

export default async function Page() {
  const categories = await getAllCategories();

  return (
    <Section>
      <Container>
        {/* Hero Section */}
        <div className="bg-muted/50 py-12 mb-12 -mx-6 sm:-mx-8">
          <div className="max-w-3xl mx-auto text-center px-6">
            <h1 className="text-4xl font-bold tracking-tight mb-4">
              Categories
            </h1>
            <p className="text-lg text-muted-foreground">
              Browse our content organized by main categories
            </p>
          </div>
        </div>

        <div className="mb-8">
          <BackButton />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Categories</CardTitle>
            <CardDescription>
              Found {categories.length} categories
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {categories.map((category: any) => (
                <Link
                  key={category.id}
                  href={`/posts/?category=${category.id}`}
                  className={cn(
                    badgeVariants({ variant: "secondary" }),
                    "text-center h-auto py-8 hover:bg-primary hover:text-primary-foreground transition-colors",
                  )}
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </Container>
    </Section>
  );
}
