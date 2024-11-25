import { Section, Container } from "@/components/commons/craft";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <Section>
      <Container>
        <Skeleton className="h-8 w-[200px] mb-8" />

        <div className="border rounded-lg overflow-hidden">
          {/* Table Header Skeleton */}
          <div className="grid grid-cols-5 gap-4 p-4 bg-muted/50">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-6" />
            ))}
          </div>

          {/* Table Rows Skeleton */}
          {[...Array(10)].map((_, i) => (
            <div key={i} className="grid grid-cols-5 gap-4 p-4 border-t">
              {[...Array(5)].map((_, j) => (
                <Skeleton key={j} className="h-6" />
              ))}
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
