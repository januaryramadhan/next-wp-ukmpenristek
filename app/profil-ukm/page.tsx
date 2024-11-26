import { Suspense } from "react";
import { Section, Container } from "@/components/commons/craft";
import { DataAnggotaComponent } from "@/components/sections/data-anggota";
import VisiMisi from "@/components/sections/visi-misi";
import { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { StrukturOrganisasi } from "@/components/charts/strukturOrganisasi";
import { AnggotaSkeleton } from "@/components/sections/data-anggota";
import HeroProfil from "@/components/sections/hero-profil";
import FokusArea from "@/components/sections/fokus-area";

export const metadata: Metadata = {
  title: "Profil UKM | UKM PENRISTEK UT",
  description:
    "Profil Unit Kegiatan Mahasiswa Pendidikan, Riset, dan Teknologi Universitas Terbuka",
};

export default function ProfilUKMPage() {
  return (
    <main>
      {/* Hero Section */}
      <Section className="py-16">
        <Container>
          <HeroProfil />
        </Container>
      </Section>

      {/* Fokus Area Section */}
      <Section className="py-16">
        <Container>
          <FokusArea />
        </Container>
      </Section>

      {/* Visi Misi Section */}
      <Section className="py-16" id="visi-misi">
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

      {/* Data Anggota Section */}
      <Section className="py-16">
        <Container>
          <Card className="bg-transparent py-5 pt-10">
            <CardContent>
              <Suspense fallback={<AnggotaSkeleton />}>
                <DataAnggotaComponent />
              </Suspense>
            </CardContent>
          </Card>
        </Container>
      </Section>
    </main>
  );
}