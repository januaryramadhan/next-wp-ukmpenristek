'use client';

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface DownloadButtonProps {
  certificateId: string;
}

export const DownloadButton = ({ certificateId }: DownloadButtonProps) => {
  const handleDownload = async () => {
    const certificateElement = document.getElementById("certificate-container");
    if (!certificateElement) return;

    try {
      const canvas = await html2canvas(certificateElement, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`sertifikat-${certificateId}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Terjadi kesalahan saat mengunduh sertifikat");
    }
  };

  return (
    <Button onClick={handleDownload} className="gap-2">
      <Download size={16} />
      Unduh Sertifikat (PDF)
    </Button>
  );
};