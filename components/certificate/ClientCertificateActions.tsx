'use client';

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { jsPDF } from "jspdf";
import { useState } from "react";
import html2pdf from 'html2pdf.js';

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

      const opt = {
        margin: 0,
        filename: `sertifikat-${certificateId}.pdf`,
        image: { type: 'auto' },
        html2canvas: { 
          scale: 2,
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#FFFFFF',
          logging: false,
        },
        jsPDF: { 
          unit: 'mm', 
          format: 'a4', 
          orientation: 'landscape',
        }
      };

      await html2pdf().from(certificateElement).set(opt).save();

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