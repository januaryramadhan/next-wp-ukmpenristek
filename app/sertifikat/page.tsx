import { Metadata } from "next";
import TableSertifikat from "@/components/table/table-sertifikat";
import { getAbsen } from "@/libs/rest/notion/queries/getAbsen";

export const metadata: Metadata = {
  title: "Sertifikat | UKM Penristek",
  description: "Daftar sertifikat kegiatan UKM Penristek",
};

export default async function SertifikatPage() {
  const data = await getAbsen();

  return (
    <main className="container mx-auto py-10 space-y-10">
      {/* Hero Section */}
      <section className="space-y-6 text-center">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Sertifikat Kegiatan
        </h1>
        <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
          Daftar sertifikat untuk peserta yang telah mengikuti kegiatan UKM Penristek
        </p>
      </section>

      {/* Table Section */}
      <section>
        <TableSertifikat initialData={data} />
      </section>

      {/* Info Section */}
      <section className="text-center text-sm text-gray-500 dark:text-gray-400">
        <p>
          Untuk pertanyaan terkait sertifikat, silakan hubungi kami melalui{" "}
          <a
            href="mailto:ukm.penristek@gmail.com"
            className="text-primary hover:underline"
          >
            ukm.penristek@gmail.com
          </a>
        </p>
      </section>
    </main>
  );
}