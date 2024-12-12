import { getAbsen } from "@/libs/rest/notion/queries/getAbsen";
import { Section, Container } from "@/components/commons/craft";
import { CertificateImage } from "@/components/certificate/CertificateImage";
import { ClientCertificateActions } from "@/components/certificate/ClientCertificateActions";
import { CertificatePreview } from "@/components/certificate/CertificatePreview";

export const revalidate = 3600;

interface SertifikatDetailPageProps {
  params: {
    id: string;
  };
}

const fetchSertifikat = async (id: string) => {
  const data = await getAbsen();
  return data.find((item) => item.idSertifikat === id) || null;
};

const SertifikatDetailPage = async ({ params }: SertifikatDetailPageProps) => {
  const { id } = params;
  let sertifikat;

  try {
    sertifikat = await fetchSertifikat(id);
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return (
      <Section>
        <Container>
          <p className="text-center text-destructive">
            Terjadi kesalahan saat mengambil data.
          </p>
        </Container>
      </Section>
    );
  }

  if (!sertifikat) {
    return (
      <Section>
        <Container>
          <p className="text-center text-muted-foreground">
            Sertifikat tidak ditemukan.
          </p>
        </Container>
      </Section>
    );
  }

  return (
    <Section>
      <Container>
        <div>
          {/* Certificate Image */}
          <div className="py-7">
            <CertificateImage data={sertifikat} />
          </div>

          {/* Certificate Preview */}
          <div className="flex justify-center py-7 hidden">
            <CertificatePreview 
              namaPeserta={sertifikat.nama}
              namaKegiatan={sertifikat.namaKegiatan}
              tema={sertifikat.tema}
              tanggal={sertifikat.tanggal}
              idSertifikat={sertifikat.idSertifikat}
              jenisSertifikat={sertifikat.jenisSertifikat}
            />
          </div>

          {/* Download Actions */}
          <div className="flex justify-center py-7">
            <ClientCertificateActions certificateId={id} />
          </div>

          
        </div>
      </Container>
    </Section>
  );
};

export default SertifikatDetailPage;

export async function generateStaticParams() {
  const data = await getAbsen();
  return data.map((sertifikat) => ({
    id: sertifikat.idSertifikat,
  }));
}