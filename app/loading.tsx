import { Section, Container } from "@/components/commons/craft";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function Loading() {
  return (
    <>
      <Section>
        <Container>
          {/* Skeleton for Hero1 */}
          <Skeleton className="h-64 w-full mb-6" />

          {/* Skeleton for ProkerTerdekat */}
          <Skeleton className="h-10 w-[200px] mb-4" />
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-12 w-full rounded-md" />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Skeleton for NewestPost */}
          <Skeleton className="h-10 w-[200px] mt-8 mb-4" />
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                {[...Array(2)].map((_, i) => (
                  <Skeleton key={i} className="h-24 w-full rounded-md" />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Skeleton for VisiMisi */}
          <Skeleton className="h-10 w-[200px] mt-8 mb-4" />
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                {[...Array(2)].map((_, i) => (
                  <Skeleton key={i} className="h-16 w-full rounded-md" />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Skeleton for StrukturOrganisasi */}
          <Skeleton className="h-10 w-[200px] mt-8 mb-4" />
          <Card>
            <CardContent className="p-6">
              <Skeleton className="h-64 w-full rounded-md" />
            </CardContent>
          </Card>

          {/* Skeleton for ProgramKerjaScroll */}
          <Skeleton className="h-10 w-[200px] mt-8 mb-4" />
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-12 w-full rounded-md" />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Skeleton for Stats */}
          <Skeleton className="h-10 w-[200px] mt-8 mb-4" />
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="h-12 w-full rounded-md" />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Skeleton for FAQ */}
          <Skeleton className="h-10 w-[200px] mt-8 mb-4" />
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-12 w-full rounded-md" />
                ))}
              </div>
            </CardContent>
          </Card>
        </Container>
      </Section>
    </>
  );
}