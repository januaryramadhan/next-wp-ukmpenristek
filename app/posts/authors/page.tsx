import { getAllAuthors } from "@/lib/wordpress";
import { Section, Container } from "@/components/commons/craft";
import Link from "next/link";
import BackButton from "@/components/commons/back";
import { Metadata } from "next";
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
  title: "Authors | UKM PENRISTEK UT",
  description: "Browse all authors on the site.",
};

export default async function Page() {
  const authors = await getAllAuthors();

  return (
    <Section>
      <Container>
        {/* Hero Section */}
        <div className="bg-muted/50 py-12 mb-12 -mx-6 sm:-mx-8">
          <div className="max-w-3xl mx-auto text-center px-6">
            <h1 className="text-4xl font-bold tracking-tight mb-4">Authors</h1>
            <p className="text-lg text-muted-foreground">
              Meet our talented writers and contributors who share their
              knowledge and insights
            </p>
          </div>
        </div>

        <div className="mb-8">
          <BackButton />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Authors</CardTitle>
            <CardDescription>Found {authors.length} authors</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {authors.map((author: any) => (
                <Link
                  key={author.id}
                  href={`/posts/?author=${author.id}`}
                  className={cn(
                    badgeVariants({ variant: "secondary" }),
                    "text-center h-auto py-8 hover:bg-primary hover:text-primary-foreground transition-colors",
                  )}
                >
                  {author.name}
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </Container>
    </Section>
  );
}
