'use client';

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useState } from "react";

interface ClientCertificateActionsProps {
  certificateId: string;
}

export function ClientCertificateActions({ certificateId }: ClientCertificateActionsProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    const certificateElement = document.getElementById("certificate-container");
    if (!certificateElement) {
      alert("Sertifikat belum siap untuk diunduh. Mohon tunggu sebentar.");
      return;
    }

    try {
      setIsDownloading(true);
      const canvas = await html2canvas(certificateElement, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        logging: false,
      });

      const imgWidth = 297; // A4 width in mm
      const imgHeight = 210; // A4 height in mm

      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });

      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      pdf.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight);
      pdf.save(`sertifikat-${certificateId}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Terjadi kesalahan saat mengunduh sertifikat");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="flex gap-4">
      <Button 
        onClick={handleDownload} 
        className="gap-2"
        disabled={isDownloading}
      >
        <Download size={16} />
        {isDownloading ? "Mengunduh..." : "Unduh Sertifikat (PDF)"}
      </Button>
      <Button
        variant="outline"
        onClick={() => window.history.back()}
        className="print:hidden"
        disabled={isDownloading}
      >
        Kembali
      </Button>
    </div>
  );
}