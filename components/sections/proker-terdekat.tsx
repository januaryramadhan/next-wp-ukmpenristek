import { Suspense } from "react";
import { getProkerWithRevalidate } from "@/libs/rest/notion/queries/getProker";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, ClockIcon, MapPinIcon } from "lucide-react";
import { Section, Container } from "@/components/commons/craft";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

// Loading skeleton component
const LoadingSkeleton = () => (
  <Section className="py-16">
    <Container>
      <div className="text-center mb-12">
        <Skeleton className="h-8 w-64 mx-auto mb-4" />
        <Skeleton className="h-4 w-96 mx-auto" />
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="flex flex-col h-full">
            <CardHeader className="flex-none space-y-3 pb-4">
              <div className="flex justify-between items-center">
                <Skeleton className="h-5 w-16" />
              </div>
              <Skeleton className="h-10 w-full" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-2/3" />
              </div>
              <Skeleton className="h-5 w-20" />
            </CardContent>
          </Card>
        ))}
      </div>
    </Container>
  </Section>
);

async function ProkerTerdekatContent() {
  const { data: proker, error } = await getProkerWithRevalidate();

  if (error) {
    return (
      <Section className="py-16">
        <Container>
          <Card className="p-8 text-center">
            <div className="max-w-md mx-auto">
              <h3 className="text-lg font-semibold mb-2 text-red-500">
                Gagal Memuat Data
              </h3>
              <p className="text-muted-foreground mb-4">{error}</p>
              <Button variant="outline" asChild>
                <Link href="/program-kerja">
                  Lihat Semua Program Kerja
                </Link>
              </Button>
            </div>
          </Card>
        </Container>
      </Section>
    );
  }

  const now = new Date();
  
  // Filter dan sort proker yang belum lewat
  const upcomingProker = proker
    .filter(item => {
      const eventDate = new Date(item.tanggal);
      if (item.jam !== "upcoming") {
        // Jika ada jam spesifik, bandingkan dengan waktu sekarang
        const [hours, minutes] = item.jam.split(':').map(Number);
        eventDate.setHours(hours, minutes);
        return eventDate > now;
      }
      // Jika tidak ada jam spesifik, bandingkan hanya tanggal
      eventDate.setHours(23, 59, 59);
      return eventDate > now;
    })
    .sort((a, b) => new Date(a.tanggal).getTime() - new Date(b.tanggal).getTime());

  const nextProker = upcomingProker.slice(0, 4);

  return (
    <Section className="py-16">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Program Kerja Terdekat
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Jadwal kegiatan UKM PENRISTEK yang akan datang. Pantau terus agar tidak melewatkan event menarik!
          </p>
        </div>

        {nextProker.length > 0 ? (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {nextProker.map((item) => {
                const date = new Date(item.tanggal);
                const formattedDate = new Intl.DateTimeFormat('id-ID', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                }).format(date);
                const day = new Intl.DateTimeFormat('id-ID', {
                  weekday: 'long',
                }).format(date);

                // Hitung sisa waktu
                const timeRemaining = date.getTime() - now.getTime();
                const daysRemaining = Math.ceil(timeRemaining / (1000 * 60 * 60 * 24));

                return (
                  <Card 
                    key={item.id} 
                    className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col h-full"
                  >
                    <CardHeader className="flex-none space-y-3 pb-4">
                      <div className="flex justify-between items-center">
                        <Badge 
                          variant={item.platform === "Online" ? "default" : "secondary"}
                          className="px-2 py-0.5 text-xs"
                        >
                          {item.platform}
                        </Badge>
                        {daysRemaining <= 7 && (
                          <Badge 
                            variant="destructive"
                            className="px-2 py-0.5 text-xs"
                          >
                            {daysRemaining === 0 ? "Hari Ini!" : 
                             daysRemaining === 1 ? "Besok!" : 
                             `${daysRemaining} hari lagi`}
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-base leading-tight line-clamp-2 min-h-[20px]">
                        {item.namaKegiatan}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <CalendarIcon className="h-4 w-4 flex-shrink-0" />
                            <span className="text-sm font-medium">
                              {day}
                            </span>
                          </div>
                          <div className="ml-6 text-muted-foreground">
                            <span className="text-sm">
                              {formattedDate}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <ClockIcon className="h-4 w-4 flex-shrink-0" />
                          <span className="text-sm">
                            {item.jam === "upcoming" ? "Akan diumumkan" : `${item.jam} WIB`}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPinIcon className="h-4 w-4 flex-shrink-0" />
                          <span className="text-sm line-clamp-1">
                            {item.tempat}
                          </span>
                        </div>
                      </div>
                      <div className="pt-4 mt-4 border-t">
                        <Badge 
                          variant="outline"
                          className="text-xs"
                        >
                          {item.jenis}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="text-center mt-8">
              <Button variant="outline" asChild>
                <Link href="/program-kerja">
                  Lihat Semua Program Kerja
                </Link>
              </Button>
            </div>
          </>
        ) : (
          <Card className="p-8 text-center">
            <div className="max-w-md mx-auto">
              <h3 className="text-lg font-semibold mb-2">
                Belum Ada Program Kerja Terdekat
              </h3>
              <p className="text-muted-foreground mb-4">
                Program kerja baru akan segera diumumkan. Pantau terus halaman ini!
              </p>
              <Button variant="outline" asChild>
                <Link href="/program-kerja">
                  Lihat Semua Program Kerja
                </Link>
              </Button>
            </div>
          </Card>
        )}
      </Container>
    </Section>
  );
}

// Export dengan Suspense wrapper
export default function ProkerTerdekat() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <ProkerTerdekatContent />
    </Suspense>
  );
}