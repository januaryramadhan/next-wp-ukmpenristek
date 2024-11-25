import { Section, Container } from "@/components/commons/craft";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export default function Loading() {
  return (
    <Section>
      <Container>
        {/* Back Button Skeleton */}
        <Skeleton className="h-10 w-[100px] mb-6" />

        {/* Title Skeleton */}
        <Skeleton className="h-12 w-3/4 max-w-[600px] mt-12 mb-8" />

        {/* Content Skeleton */}
        <Card className="p-6">
          <div className="space-y-4">
            {/* Paragraphs */}
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[90%]" />
            <Skeleton className="h-4 w-[95%]" />

            {/* Subheading */}
            <Skeleton className="h-8 w-1/3 mt-8 mb-4" />

            {/* More paragraphs */}
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[85%]" />
            <Skeleton className="h-4 w-[92%]" />

            {/* Image placeholder */}
            <Skeleton className="h-[300px] w-full rounded-lg my-8" />

            {/* More text content */}
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[88%]" />
            <Skeleton className="h-4 w-[75%]" />
          </div>
        </Card>
      </Container>
    </Section>
  );
}
