import { Suspense } from "react";
import { Section, Container } from "@/components/commons/craft";
import VisiMisi from "@/components/sections/visi-misi";
import { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { StrukturOrganisasi } from "@/components/charts/strukturOrganisasi";
import HeroProfil from "@/components/sections/hero-profil";
import FokusArea from "@/components/sections/fokus-area";
import TableAnggota from "@/components/table/table-anggota";

export const metadata: Metadata = {
  title: "Profil UKM | UKM PENRISTEK UT",
  description:
    "Profil Unit Kegiatan Mahasiswa Pendidikan, Riset, dan Teknologi Universitas Terbuka",
};

export default function ProfilUKMPage() {
  return (
    <main>
      {/* Hero Section */}
      <Section>
        <Container>
          <HeroProfil />
        </Container>
      </Section>

      {/* Visi Misi Section */}
      <Section id="visi-misi">
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
              <Suspense fallback={<div>Loading...</div>}>
                <TableAnggota />
              </Suspense>
        </Container>
      </Section>
    </main>
  );
}