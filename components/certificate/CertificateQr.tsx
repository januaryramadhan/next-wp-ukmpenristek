import { QRCodeSVG } from "qrcode.react";

interface CertificateQrProps {
  idSertifikat: string;
  size?: number;
}

export function CertificateQr({ idSertifikat, size = 100 }: CertificateQrProps) {
  const verificationUrl = `https://ukmpenristek.site/sertifikat/${idSertifikat}`;

  return (
    <div className="flex flex-col items-center justify-center">
      <QRCodeSVG
        value={verificationUrl}
        size={size}
        level="H" // Tingkat koreksi error tertinggi (30%)
        bgColor="#FFFFFF"
        fgColor="#000000"
        marginSize={1} // Margin 1 modul
        title={`QR Code Verifikasi Sertifikat ${idSertifikat}`}
      />
      <p className="text-xs mt-1 text-gray-600">{idSertifikat}</p>
    </div>
  );
}