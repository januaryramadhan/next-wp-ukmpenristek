import { BackgroundPattern } from "./BackgroundPattern";
import { CertificateContent } from "./CertificateContent";
import { CertificateFooter } from "./CertificateFooter";
import { CertificateHeader } from "./CertificateHeader";
import { CertificateSignature } from "./CertificateSignature";

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
    // Wrapper dengan overflow auto untuk scroll
    <div className="w-full overflow-visible">
      {/* Container dengan min-width untuk memastikan ukuran minimum */}
      <div className=" w-[1123px] h-[794px]">
        {/* Certificate container dengan ukuran tetap */}
        <div className="bg-white relative w-[1123px] h-[794px] flex items-center justify-center">
          <div className="flex flex-col justify-center mx-[20]">
            {/* Header - Menyesuaikan tinggi */}
            <div className="">
              <CertificateHeader idSertifikat={idSertifikat} />
            </div>

            <div className="flex items-center justify-center">
              <CertificateContent
                namaPeserta={namaPeserta}
                namaKegiatan={namaKegiatan}
                tema={tema}
                tanggal={tanggal}
                jenisSertifikat={jenisSertifikat}
              />
            </div>

            {/* Footer - Menyesuaikan tinggi */}
            <div>
              <CertificateSignature />
            </div>
            <div>
              <CertificateFooter />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}