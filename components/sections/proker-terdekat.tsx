import { getProker } from "@/lib/notion/queries/getProker";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, ClockIcon, MapPinIcon } from "lucide-react";
import { Section, Container } from "@/components/commons/craft";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function ProkerTerdekat() {
  const proker = await getProker();

  const sortedProker = proker.sort((a, b) => {
    const dateA = new Date(a.tanggal);
    const dateB = new Date(b.tanggal);
    return dateA.getTime() - dateB.getTime();
  });

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const upcomingProker = sortedProker.filter(item => {
    const eventDate = new Date(item.tanggal);
    eventDate.setHours(0, 0, 0, 0);
    return eventDate >= today;
  });

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
                const formattedDate = date.toLocaleDateString('id-ID', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                });
                const day = date.toLocaleDateString('id-ID', {
                  weekday: 'long',
                });

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