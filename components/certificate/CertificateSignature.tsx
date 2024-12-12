import Image from "next/image";

export function CertificateSignature() {
  return (
    <div className="grid grid-cols-2 mt-[20px] mb-[20px]">
      <div className="text-center">
        <div className="relative mx-auto w-[60px] h-[60px]">
          <Image
            src="/images/ttd-ketua.png"
            alt="Tanda tangan ketua"
            className="object-contain"
            fill
          />
        </div>
        <p className="text-base font-semibold text-muted mt-2">Dian Nurjanah</p>
        <p className="text-sm text-muted-foreground">Ketua UKM PENRISTEK</p>
      </div>

      <div className="text-center">
        <div className="relative mx-auto w-[60px] h-[60px]">
          <Image
            src="/images/ttd-sekjen.png"
            alt="Tanda tangan sekretaris" 
            className="object-contain"
            fill
          />
        </div>
        <p className="text-base font-semibold text-muted mt-2">M. Sohibul Wafa</p>
        <p className="text-sm text-muted-foreground">Sekjen UKM PENRISTEK</p>
      </div>
    </div>
  );
}