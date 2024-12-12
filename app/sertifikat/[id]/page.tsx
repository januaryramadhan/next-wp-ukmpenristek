import { getAbsen } from "@/libs/rest/notion/queries/getAbsen";
import { Section, Container } from "@/components/commons/craft";
import { CertificateImage } from "@/components/certificate/CertificateImage";
import { ClientCertificateActions } from "@/components/certificate/ClientCertificateActions";

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
        <div className="space-y-8">
          {/* Certificate Image */}
          <div>
            <CertificateImage data={sertifikat} />
          </div>

          {/* Download Actions */}
          <div className="flex justify-center">
            <ClientCertificateActions certificateId={id} />
          </div>

          {/* Contact Information */}
          <div className="flex flex-col items-center space-y-4">
            <p className="text-sm text-muted-foreground text-center">
              Untuk pertanyaan terkait sertifikat, silakan hubungi kami melalui{" "}
              <a
                href="mailto:ukm.penristek@gmail.com"
                className="text-primary hover:underline"
              >
                ukm.penristek@gmail.com
              </a>
            </p>
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