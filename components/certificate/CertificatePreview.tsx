import { CertificateContent } from "./CertificateContent"; 
import { CertificateFooter } from "./CertificateFooter";
import { CertificateHeader } from "./CertificateHeader";
import { CertificateSignature } from "./CertificateSignature";
import { CertificateQr } from "./CertificateQr";
import { CertificateLogo } from "./CertificateLogo";

interface CertificatePreviewProps {
  namaPeserta: string;
  namaKegiatan: string;
  tema: string;
  tanggal: string;
  idSertifikat: string;
  jenisSertifikat: string;
}

export function CertificatePreview({
  namaPeserta,
  namaKegiatan,
  tema,
  tanggal,
  idSertifikat,
  jenisSertifikat,
}: CertificatePreviewProps) {
  return (
    <div 
      id="certificate-container"
      className="w-[297mm] h-[210mm] bg-white"
    >
      <div 
        className="relative w-full h-full bg-cover bg-center bg-no-repeat p-10"
        style={{
          backgroundImage: "url('/bg-sertifikat.svg')"
        }}
      >
        <div className="absolute top-8 right-5">
          <CertificateQr idSertifikat={idSertifikat} size={80} />
        </div>

        <div className="flex flex-col space-y-8">
          <CertificateLogo />
          
          <CertificateHeader idSertifikat={idSertifikat} />
          
          <CertificateContent
            namaPeserta={namaPeserta}
            namaKegiatan={namaKegiatan}
            tema={tema}
            tanggal={tanggal}
            jenisSertifikat={jenisSertifikat}
          />
          
          <CertificateSignature />
          
          <CertificateFooter />
        </div>
      </div>
    </div>
  );
}