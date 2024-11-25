import { Section, Container } from "@/components/commons/craft";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

export default function Loading() {
  return (
    <Section>
      <Container>
        <Skeleton className="h-10 w-[100px] mb-8" />

        {/* Filter Skeleton */}
        <div className="grid md:grid-cols-[1fr_1fr_1fr_0.5fr] gap-2 my-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-10" />
          ))}
        </div>

        {/* Posts Grid Skeleton */}
        <div className="grid md:grid-cols-3 gap-4 my-8">
          {[...Array(9)].map((_, i) => (
            <Card key={i} className="border">
              <CardHeader className="p-0">
                <Skeleton className="h-48 rounded-t-lg" />
              </CardHeader>
              <CardContent className="mt-5">
                <Skeleton className="h-4 w-[250px] mb-2" />
                <Skeleton className="h-4 w-[200px] mb-4" />
                <Skeleton className="h-3 w-[150px]" />
              </CardContent>
              <CardFooter className="flex justify-between">
                <Skeleton className="h-5 w-[100px]" />
                <Skeleton className="h-5 w-[60px]" />
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Pagination Skeleton */}
        <div className="flex justify-center gap-2 mt-8">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-10 w-10" />
          ))}
        </div>
      </Container>
    </Section>
  );
}
