import Image from "next/image";

interface CertificateHeaderProps {
  idSertifikat: string;
}

export function CertificateHeader({ idSertifikat }: CertificateHeaderProps) {
  return (
    <div className="flex flex-col items-center mb-[10px]">
      {/* Logo Container */}
      <div className="relative w-[40px] h-[60px] mb-[10px] flex-col">
        <Image
          src="/logo.png"
          alt="Logo UKM PENRISTEK"
          fill
          className="object-contain"
          priority
        />
      </div>
      <h1 className=" text-gray-500 text-[16px] mb-[20px]">
        Unit Kegiatan Mahasiswa Pendidikan, Riset dan Teknologi
      </h1>

      {/* Text Container */}
      <div className="flex flex-col items-center gap-[8px]">
        <div className="flex flex-col items-center gap-[4px]">
          <h2 className="text-[32px] text-gray-800 font-bold">SERTIFIKAT</h2>
          <p className="text-[16px]  text-gray-500">
            No. {idSertifikat}
          </p>
        </div>
      </div>
    </div>
  );
}
