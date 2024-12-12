import Image from "next/image";

export function CertificateLogo() {
  return (
    <div className="flex px-[60px]">
      <div className="relative w-[60px] pr-[10  px] h-[60px]"> {/* Update dari w-[50] menjadi w-[60px] */}
        <Image
          src="/images/logo-kampus.png"  
          alt="Logo Kampus"
          fill
          className="object-contain"
          priority
        />
      </div>
      <div className="relative w-[60px] h-[60px]"> {/* Update dari w-[40px] menjadi w-[60px] */}
        <Image
          src="/images/logo-ut.png"
          alt="Logo UT"
          fill
          className="object-contain"
          priority
        />
      </div>
      <div className="relative w-[60px] h-[60px]"> {/* Update dari w-[40px] menjadi w-[60px] */}
        <Image
          src="/images/logo-kom.png"
          alt="Logo KOM"
          fill
          className="object-contain"
          priority
        />
      </div>
      <div className="relative w-[60px] h-[60px]"> {/* Update dari w-[40px] menjadi w-[60px] */}
        <Image
          src="/images/logo-ukm.png"
          alt="Logo UKM"
          fill
          className="object-contain"
          priority
        />
      </div>
    </div>
  );
}