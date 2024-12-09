import { Section, Container } from "@/components/commons/craft";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function Loading() {
  return (
    <Section>
      <Container>
        <Skeleton className="h-10 w-[120px] mb-6" /> {/* Pages title */}
        <Skeleton className="h-8 w-[160px] mb-4" /> {/* All Pages subtitle */}
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-12 w-full rounded-md" />
              ))}
            </div>
          </CardContent>
        </Card>
      </Container>
    </Section>
  );
}
