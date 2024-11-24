import { Section, Container } from "@/components/commons/craft";

import { ArrowUpRight } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type FAQItem = {
  question: string;
  answer: string;
  link?: string;
};

const content: FAQItem[] = [
  {
    question: "Apa syarat menjadi anggota UKM PENRISTEK?",
    answer:
      "Syarat menjadi anggota UKM PENRISTEK adalah terdaftar sebagai mahasiswa aktif Universitas Terbuka Bogor dan mengisi formulir pendaftaran.",
    link: "https://sl.ut.ac.id",
  },
  {
    question: "Apa perbedaan antara Anggota Aktif dan Anggota Umum?",
    answer:
      "Anggota Aktif adalah mahasiswa yang mengikuti program orientasi anggota baru dan membayar iuran keanggotaan sukarela bulanan. Anggota Umum adalah mahasiswa yang tidak diwajibkan mengikuti program orientasi tetapi tetap membayar iuran keanggotaan sukarela bulanan.",
  },
  {
    question: "Apa hak dan kewajiban Anggota Aktif?",
    answer:
      "Hak Anggota Aktif meliputi mendapatkan informasi terkait kegiatan UKM, mengikuti kegiatan dan pelatihan, menyampaikan pendapat dan usulan dalam rapat anggota, memiliki hak suara dalam pemilihan pengurus, dan dapat berpartisipasi sebagai panitia atau pengisi acara. Kewajiban Anggota Aktif adalah mematuhi AD/ART serta peraturan yang berlaku, aktif berpartisipasi dalam kegiatan UKM, dan memiliki PDH.",
  },
  {
    question: "Apa hak dan kewajiban Anggota Umum?",
    answer:
      "Hak Anggota Umum meliputi mendapatkan informasi terkait kegiatan UKM, mengikuti kegiatan UKM sesuai dengan ketentuan yang berlaku, menyampaikan pendapat dalam rapat tanpa hak suara, dan dapat berpartisipasi sebagai volunteer di kegiatan UKM. Kewajiban Anggota Umum adalah mematuhi AD/ART serta peraturan yang berlaku dan aktif berpartisipasi dalam kegiatan UKM.",
  },
  {
    question: "Bagaimana prosedur pemberhentian anggota?",
    answer:
      "Anggota yang ingin mengundurkan diri wajib mengajukan surat permohonan tertulis kepada pengurus. Keputusan pemberhentian ditetapkan dalam rapat pengurus dengan persetujuan minimal ½ dari anggota aktif.",
  },
  {
    question: "Apa itu uang kas dan bagaimana cara pembayarannya?",
    answer:
      "Uang kas adalah kontribusi bulanan sebesar Rp 15.000 yang wajib dibayarkan oleh setiap anggota UKM PENRISTEK. Pembayaran dilakukan maksimal setiap tanggal 7 per bulan melalui transfer ke rekening bendahara, dan bukti pembayaran dikirim ke bendahara.",
  },
  {
    question: "Apa konsekuensi keterlambatan pembayaran uang kas?",
    answer:
      "Jika anggota terlambat membayar uang kas lebih dari tanggal 7, akan dikenakan sanksi administratif berupa peringatan dari bendahara. Jika keterlambatan terjadi selama lebih dari 2 bulan berturut-turut, anggota akan diberi peringatan kedua dan diharuskan melunasi pembayaran sebelum dapat berpartisipasi dalam kegiatan organisasi.",
  },
  {
    question: "Bagaimana transparansi penggunaan uang kas?",
    answer:
      "Pengurus UKM PENRISTEK wajib memberikan laporan keuangan yang transparan mengenai penggunaan uang kas dalam rapat umum bulanan agar anggota mengetahui alokasi dana yang terkumpul.",
  },
];

const FAQ = () => {
  return (
    <Section>
      <Container>
        <h3 className="!mt-0">Frequently Asked Questions</h3>
        <h4 className="text-muted-foreground">
        Punya pertanyaan yang belum terjawab? Silakan hubungi Humas UKM Penristek untuk mendapatkan bantuan.
        </h4>
        <div className="not-prose mt-4 flex flex-col gap-4 md:mt-8">
          {content.map((item, index) => (
            <Accordion key={index} type="single" collapsible>
              <AccordionItem value={item.question}>
                <AccordionTrigger className="text-left">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-base md:w-3/4">
                  {item.answer}
                  {item.link && (
                    <a
                      href={item.link}
                      className="mt-2 flex w-full items-center opacity-60 transition-all hover:opacity-100"
                    >
                      Daftar <ArrowUpRight className="ml-1" size="16" />
                    </a>
                  )}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      </Container>
    </Section>
  );
};

export default FAQ;