import { getAllTags } from "@/lib/wordpress";
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
  title: "Tags | UKM PENRISTEK UT",
  description: "Browse all tags on the site.",
};

export default async function Page() {
  const tags = await getAllTags();

  return (
    <Section>
      <Container>
        {/* Hero Section */}
        <div className="bg-muted/50 py-12 mb-12 -mx-6 sm:-mx-8">
          <div className="max-w-3xl mx-auto text-center px-6">
            <h1 className="text-4xl font-bold tracking-tight mb-4">Tags</h1>
            <p className="text-lg text-muted-foreground">
              Explore our content organized by topics and interests
            </p>
          </div>
        </div>

        <div className="mb-8">
          <BackButton />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Tags</CardTitle>
            <CardDescription>Found {tags.length} tags</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {tags.map((tag: any) => (
                <Link
                  key={tag.id}
                  href={`/posts/?tag=${tag.id}`}
                  className={cn(
                    badgeVariants({ variant: "secondary" }),
                    "text-center h-auto py-8 hover:bg-primary hover:text-primary-foreground transition-colors",
                  )}
                >
                  {tag.name}
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </Container>
    </Section>
  );
}
