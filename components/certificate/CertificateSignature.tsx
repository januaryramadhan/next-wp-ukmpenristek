import Image from "next/image";

export function CertificateSignature() {
  return (
    <div className="grid grid-cols-2 mt-[20px] mb-[20px] px-[60px]"> {/* Tambahkan padding */}
      <div>
        <div className="relative w-[60px] h-[60px]">
          <Image
            src="/images/ttd-ketua.png"
            alt="Tanda tangan ketua"
            className="object-contain"
            fill
          />
        </div>
        <p className="text-[12px] text-gray-800 font-semibold text-muted mt-2">Dian Nurjanah</p>
        <p className="text-[12px] text-gray-500">Ketua UKM PENRISTEK</p>
      </div>

      <div>
        <div className="relative w-[60px] h-[60px]">
          <Image
            src="/images/ttd-sekjen.png"
            alt="Tanda tangan sekretaris" 
            className="object-contain"
            fill
          />
        </div>
        <p className="text-[12px] text-gray-800 font-semibold mt-2">M. Sohibul Wafa</p>
        <p className="text-[12px] text-gray-500">Sekjen UKM PENRISTEK</p>
      </div>
    </div>
  );
}

