"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import { CertificatePreview } from "./CertificatePreview";
import { FormattedAbsen } from "@/libs/types/notion/type";

interface CertificateImageProps {
  data: FormattedAbsen;
  onImageGenerated?: (imageUrl: string) => void;
}

export function CertificateImage({
  data,
  onImageGenerated,
}: CertificateImageProps) {
  const certificateRef = useRef<HTMLDivElement>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const generateImage = async () => {
      if (!certificateRef.current) return;

      try {
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 500));

        const canvas = await html2canvas(certificateRef.current, {
          scale: 2,
          useCORS: true,
          backgroundColor: null,
          logging: true,
          onclone: function(clonedDoc) {
            const clonedElement = clonedDoc.querySelector('.certificate-container');
            if (clonedElement) {
              clonedElement.style.visibility = 'visible';
            }
          }
        });

        const url = canvas.toDataURL("image/png");
        setImageUrl(url);
        onImageGenerated?.(url);
      } catch (error) {
        console.error("Error generating certificate image:", error);
      } finally {
        setIsLoading(false);
      }
    };

    generateImage();
  }, [data, onImageGenerated]);

  return (
    <div className="relative">
      {/* Generated certificate preview */}
      {imageUrl && !isLoading && (
        <div id="certificate-container"> {/* Tambahkan ID di sini */}
          <div className="items-center">
            <Image
              src={imageUrl}
              alt={`Sertifikat untuk ${data.namaPeserta}`}
              width={1123}
              height={794}
              priority
              className="rounded-lg shadow-lg"
              unoptimized
            />
          </div>
        </div>
      )}

      {/* Hidden certificate container for generation */}
      <div
        ref={certificateRef}
        className="certificate-container"
        style={{
          position: 'absolute',
          left: '-9999px',
          width: "1123px",
          height: "794px",
        }}
      >
        <div className="bg-white w-[1123px] h-[794px]">
          <CertificatePreview
            namaPeserta={data.namaPeserta}
            namaKegiatan={data.namaKegiatan}
            tema={data.tema}
            tanggal={data.tanggal}
            idSertifikat={data.idSertifikat}
            jenisSertifikat={data.jenisSertifikat}
          />
        </div>
      </div>

      {/* Loading indicator */}
      {isLoading && (
        <div className="flex items-center justify-center p-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      )}
    </div>
  );
}