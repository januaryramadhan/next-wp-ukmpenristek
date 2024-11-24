import { Section, Container } from "@/components/commons/craft";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Dokumentasi | UKM PENRISTEK UT",
  description:
    "Dokumentasi kegiatan Unit Kegiatan Mahasiswa Pendidikan, Riset, dan Teknologi Universitas Terbuka",
};

export default function DokumentasiPage() {
  // Contoh data galeri kegiatan
  const galleries = [
    {
      id: 1,
      title: "Pelatihan Python untuk Data Science",
      date: "15 Januari 2024",
      image: "/placeholder.jpg",
      description: "Pelatihan dasar Python untuk analisis data",
    },
    // Tambahkan data galeri lainnya
  ];

  return (
    <Section>
      <Container>In Progress</Container>
    </Section>
  );
}
