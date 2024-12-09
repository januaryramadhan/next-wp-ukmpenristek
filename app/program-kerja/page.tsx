import React from "react";
import { Container, Section } from "@/components/commons/craft";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TableProker from "@/components/table/table-proker";
import { Metadata } from "next";
import HeroProker from "@/components/sections/hero-proker";

export const metadata: Metadata = {
  title: "Program Kerja | UKM PENRISTEK UT",
  description:
    "Program Kerja UKM Pendidikan, Riset, dan Teknologi Universitas Terbuka",
};

const prokerData = [
  {
    namaKegiatan: "Sharing Session",
    frekuensi: "2",
    per: "Bulan",
    platform: "Online",
    keterangan:
      "Kegiatan berbagi pengetahuan dan pengalaman antar anggota yang dilaksanakan secara online. Bertujuan untuk meningkatkan wawasan dan keterampilan anggota dalam berbagai bidang.",
  },
  {
    namaKegiatan: "Rapat Umum",
    frekuensi: "1",
    per: "Bulan",
    platform: "Online/Offline",
    keterangan:
      "Pertemuan rutin seluruh anggota untuk membahas perkembangan organisasi, evaluasi kegiatan, dan perencanaan program kerja. Dapat dilaksanakan secara online atau offline.",
  },
  {
    namaKegiatan: "Ruang Aspirasi Mahasiswa",
    frekuensi: "1",
    per: "Bulan",
    platform: "Offline",
    keterangan:
      "Meetup/forum diskusi/perlombaan/pentas seni/kegiatan kolaborasi/kegiatan sosial.",
  },
  {
    namaKegiatan: "Pengangkatan Anggota Aktif",
    frekuensi: "1",
    per: "Triwulan",
    platform: "Online",
    keterangan:
      "Proses rekrutmen anggota baru yang dilakukan secara online. Meliputi tahap pendaftaran, seleksi, dan pengumuman hasil.",
  },
  {
    namaKegiatan: "Orientasi Anggota Baru",
    frekuensi: "1",
    per: "Triwulan",
    platform: "Online",
    keterangan:
      "Program pengenalan organisasi untuk anggota baru yang dilaksanakan secara online. Bertujuan untuk memberikan pemahaman tentang visi, misi, dan struktur organisasi.",
  },
  {
    namaKegiatan: "Workshop/Diklat",
    frekuensi: "2",
    per: "Periode",
    platform: "Offline",
    keterangan:
      "Pelatihan intensif offline yang bertujuan untuk meningkatkan keterampilan spesifik anggota dalam bidang tertentu.",
  },
  {
    namaKegiatan: "Seminar Nasional",
    frekuensi: "1",
    per: "Periode",
    platform: "Offline",
    keterangan:
      "Acara berskala nasional yang menghadirkan pembicara ahli untuk membahas topik-topik relevan dengan fokus organisasi. Dilaksanakan secara offline.",
  },
  {
    namaKegiatan: "Tata Cara Bersidang",
    frekuensi: "1",
    per: "Periode",
    platform: "Offline",
    keterangan:
      "Pelatihan offline tentang prosedur dan etika dalam melaksanakan sidang atau rapat formal. Bertujuan untuk meningkatkan keterampilan berorganisasi anggota.",
  },
  {
    namaKegiatan: "Mubes Penristek",
    frekuensi: "1",
    per: "Periode",
    platform: "Offline",
    keterangan:
      "Musyawarah Besar UKM Pendidikan, Riset Teknologi, merupakan forum tertinggi organisasi yang dilaksanakan secara offline di akhir periode kepengurusan untuk mengevaluasi kinerja dan menetapkan arah organisasi ke depan.",
  },
  {
    namaKegiatan: "English Day",
    frekuensi: "1",
    per: "Minggu",
    platform: "Offline/Online",
    keterangan:
      "Menggunakan bahasa inggris saat berkomunikasi ataupun dikegiatan UKM PENRSITEK bertujuan untuk meningkatkan kemampuan speaking anggota.",
  },
];


const ProgramKerjaPage = async () => {
  return (
    <main>
      {/* Hero Section */}
      <Section className="py-20">
        <Container>
         <HeroProker  />
        </Container>
      </Section>

      {/* Kalender Kegiatan Section */}
      <Section className="py-16">
        <Container>
          <TableProker />
        </Container>
      </Section>

      {/* Program Kerja Cards Section */}
      <Section className="py-16">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {prokerData.map((proker, index) => (
              <Card
                key={index}
                className="h-full hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">
                    {proker.namaKegiatan}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Frekuensi</span>
                      <span className="font-normal text-base">
                        {proker.frekuensi} / {proker.per}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Platform</span>
                      <span className="font-font-normal text-base">{proker.platform}</span>
                    </div>
                    <div className="pt-4 border-t">
                      <span className="text-sm text-muted-foreground block mb-2">Keterangan:</span>
                      <p className="text-base leading-relaxed">{proker.keterangan}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
    </main>
  );
};

export default ProgramKerjaPage;