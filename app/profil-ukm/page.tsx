import { Suspense } from "react";
import { Section, Container } from "@/components/commons/craft";
import { DataAnggotaComponent } from "@/components/sections/data-anggota";
import { DataPengurus } from "@/components/sections/data-pengurus";
import VisiMisi from "@/components/sections/visi-misi";
import { Metadata } from "next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { StrukturOrganisasi } from "@/components/charts/strukturOrganisasi";

export const metadata: Metadata = {
  title: "Profil UKM | UKM PENRISTEK UT",
  description:
    "Profil Unit Kegiatan Mahasiswa Pendidikan, Riset, dan Teknologi Universitas Terbuka",
};

export default function ProfilUKMPage() {
  return (
    <main>
      {/* Hero Section */}
      <Section className="bg-muted/50 py-20">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Profil UKM PENRISTEK
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Unit Kegiatan Mahasiswa yang berfokus pada pengembangan kompetensi
              dalam bidang pendidikan, riset, dan teknologi melalui berbagai
              program inovatif dan kolaboratif.
            </p>
          </div>
        </Container>
      </Section>

      {/* Tentang Kami Section */}
      <Section className="py-16">
        <Container>
          <Card className="bg-transparent">
            <CardHeader>
              <h2 className="text-2xl font-bold">Tentang Kami</h2>
            </CardHeader>
            <CardContent className="grid gap-6">
              <p className="text-muted-foreground">
                UKM PENRISTEK adalah organisasi kemahasiswaan yang menghimpun
                dan memberdayakan mahasiswa Universitas Terbuka dalam
                mengembangkan kompetensi di bidang pendidikan, riset, dan
                teknologi melalui kolaborasi, inovasi, dan pengabdian
                masyarakat.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                {FOKUS_AREAS.map((area) => (
                  <Card key={area.title}>
                    <CardContent className="pt-6">
                      <h3 className="font-bold mb-2">{area.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {area.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </Container>
      </Section>

      {/* Visi Misi Section */}
      <Section className="py-16">
        <Container>
          <VisiMisi />
        </Container>
      </Section>

      {/* Struktur Organisasi Section */}
      <Section className="py-16">
        <Container>
          <StrukturOrganisasi />  
        </Container>
      </Section>

      {/* Data Pengurus & Anggota Section */}
      <Section className="py-16">
        <Container>
          <Card className="bg-transparent">
            <CardContent className="mt-10">
              <Tabs defaultValue="pengurus" className="space-y-6">
                <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
                  <TabsTrigger value="pengurus">Data Pengurus</TabsTrigger>
                  <TabsTrigger value="anggota">Data Anggota</TabsTrigger>
                </TabsList>

                <TabsContent value="pengurus">
                  <Suspense fallback={<PengurusSkeleton />}>
                    <DataPengurus />
                  </Suspense>
                </TabsContent>

                <TabsContent value="anggota">
                  <Suspense fallback={<AnggotaSkeleton />}>
                    <DataAnggotaComponent />
                  </Suspense>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </Container>
      </Section>
    </main>
  );
}

const FOKUS_AREAS = [
  {
    title: "Pendidikan",
    description:
      "Mengembangkan program pendidikan yang inovatif dan berkualitas",
  },
  {
    title: "Riset",
    description: "Mendorong budaya penelitian dan pengembangan ilmiah",
  },
  {
    title: "Teknologi",
    description: "Memanfaatkan teknologi untuk solusi inovatif",
  },
] as const;

// Skeleton loading untuk data pengurus
function PengurusSkeleton() {
  return (
    <div className="space-y-8">
      <div>
        <Skeleton className="h-8 w-[200px] mb-2" />
        <Skeleton className="h-4 w-[300px]" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="border rounded-md p-6">
            <div className="flex flex-col items-center space-y-4">
              <Skeleton className="h-20 w-20 rounded-full" />
              <div className="space-y-2 text-center w-full">
                <Skeleton className="h-4 w-[150px] mx-auto" />
                <Skeleton className="h-4 w-[100px] mx-auto" />
                <Skeleton className="h-4 w-[80px] mx-auto" />
                <Skeleton className="h-6 w-[60px] mx-auto rounded-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Skeleton loading untuk data anggota
function AnggotaSkeleton() {
  return (
    <div className="space-y-8">
      <div>
        <Skeleton className="h-8 w-[200px] mb-2" />
        <Skeleton className="h-4 w-[300px]" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="border rounded-md p-6">
            <div className="flex flex-col items-center space-y-4">
              <Skeleton className="h-20 w-20 rounded-full" />
              <div className="space-y-2 text-center w-full">
                <Skeleton className="h-4 w-[150px] mx-auto" />
                <Skeleton className="h-4 w-[100px] mx-auto" />
                <Skeleton className="h-4 w-[80px] mx-auto" />
                <Skeleton className="h-6 w-[60px] mx-auto rounded-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
