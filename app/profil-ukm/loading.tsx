import { Section, Container } from "@/components/commons/craft";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function Loading() {
  return (
    <main>
      {/* Hero Section Skeleton */}
      <Section className="bg-muted/50 py-20">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <Skeleton className="h-12 w-[300px] mx-auto mb-6" />
            <Skeleton className="h-4 w-full max-w-[600px] mx-auto" />
            <Skeleton className="h-4 w-full max-w-[500px] mx-auto mt-2" />
          </div>
        </Container>
      </Section>

      {/* Tentang Kami Section Skeleton */}
      <Section className="py-16">
        <Container>
          <Card className="bg-transparent">
            <CardHeader>
              <Skeleton className="h-8 w-[200px]" />
            </CardHeader>
            <CardContent className="grid gap-6">
              <Skeleton className="h-20 w-full" />
              <div className="grid md:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                  <Card key={i}>
                    <CardContent className="pt-6">
                      <Skeleton className="h-6 w-[150px] mb-4" />
                      <Skeleton className="h-16 w-full" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </Container>
      </Section>

      {/* Struktur Organisasi Skeleton */}
      <Section className="py-16">
        <Container>
          <Skeleton className="h-[400px] w-full rounded-lg" />
        </Container>
      </Section>

      {/* Data Section Skeleton */}
      <Section className="py-16">
        <Container>
          <Card>
            <CardContent className="mt-10">
              <div className="space-y-6">
                <Skeleton className="h-10 w-[400px] mb-8" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="border rounded-md p-6">
                      <div className="flex flex-col items-center space-y-4">
                        <Skeleton className="h-20 w-20 rounded-full" />
                        <div className="space-y-2 text-center w-full">
                          <Skeleton className="h-4 w-[150px] mx-auto" />
                          <Skeleton className="h-4 w-[100px] mx-auto" />
                          <Skeleton className="h-4 w-[80px] mx-auto" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </Container>
      </Section>
    </main>
  );
}
