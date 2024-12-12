interface CertificateHeaderProps {
  idSertifikat: string;
}
export function CertificateHeader({ idSertifikat }: CertificateHeaderProps) {
  return (
    <div className="mb-[10px] px-[60px]"> {/* Tambahkan padding */}
      <h1 className="text-gray-500 text-[16px] mb-[20px]">
        Unit Kegiatan Mahasiswa Pendidikan, Riset dan Teknologi
      </h1>

      <div className="space-y-[8px]">
        <div className="space-y-[4px]">
          <h2 className="text-[32px] text-gray-800 font-bold">SERTIFIKAT</h2>
          <p className="text-[16px] text-gray-500">
            No. {idSertifikat}
          </p>
        </div>
      </div>
    </div>
  );
}