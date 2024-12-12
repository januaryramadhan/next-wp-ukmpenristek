interface CertificateContentProps {
  namaPeserta: string;
  namaKegiatan: string; 
  tema: string;
  tanggal: string;
  jenisSertifikat: string;
}

export function CertificateContent({ 
  namaPeserta, 
  namaKegiatan, 
  tema, 
  tanggal, 
  jenisSertifikat 
}: CertificateContentProps) {
  const formattedDate = new Date(tanggal).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long', 
    year: 'numeric'
  });

  return (
    <div className="flex flex-col items-center w-full mt-[20px] mb-[30px]">
      <div className="flex flex-col items-center">
        
        <p className="text-[14px] text-muted mb-[10px]">
          Diberikan kepada:
        </p>
        
        <h1 className="text-[30px] text-muted font-bold mb-[20px]">
          {namaPeserta}
        </h1>
        
        <div className="flex flex-col items-center gap-[10px]">
          <p className="text-[14px] text-muted-foreground">
            Atas partisipasinya sebagai <span className="text-muted font-semibold">{jenisSertifikat}</span> dalam kegiatan
          </p>
          <p className="text-[14px] text-muted font-semibold">
            {namaKegiatan}
          </p>
          <p className="text-[14px] text-muted-foreground">
            yang diselenggarakan pada tanggal {formattedDate}
          </p>
        </div>
      </div>
    </div>
  );
}