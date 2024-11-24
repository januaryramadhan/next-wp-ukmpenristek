"use client"
import { Construction } from "lucide-react";
import { Section, Container } from "@/components/commons/craft";

export default function DokumentasiPage() {
  return (
    <Section>
      <Container>
        <div className="min-h-[50vh] flex flex-col items-center justify-center text-center space-y-4">
          <Construction className="w-16 h-16 text-muted-foreground" />
          <h1 className="text-3xl font-bold tracking-tight">
            Halaman Dokumentasi
          </h1>
          <p className="text-muted-foreground max-w-[600px]">
            Halaman ini sedang dalam proses pengembangan. Mohon kembali lagi nanti untuk melihat dokumentasi kegiatan UKM PENRISTEK.
          </p>
        </div>
      </Container>
    </Section>
  );
}