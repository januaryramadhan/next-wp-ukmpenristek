'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DownloadIcon } from 'lucide-react';
import { cn } from '@/libs/utils';

interface ClientCertificateActionsProps {
  certificateId: string;
  className?: string;
}

export function ClientCertificateActions({ 
  certificateId,
  className 
}: ClientCertificateActionsProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async () => {
    setIsLoading(true);
    try {
      // Import html2pdf only when needed
      const html2pdf = (await import('html2pdf.js')).default;
      
      const element = document.getElementById('certificate-container');
      if (!element) return;

      const opt = {
        margin: 0,
        filename: `sertifikat-${certificateId}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'landscape' }
      };

      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex justify-center", className)}>
      <Button
        onClick={handleDownload}
        disabled={isLoading}
        className="flex items-center gap-2"
        variant="outline"
      >
        <DownloadIcon className="h-4 w-4" />
        {isLoading ? 'Mengunduh...' : 'Unduh Sertifikat'}
      </Button>
    </div>
  );
}