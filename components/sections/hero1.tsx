"use client";

import { MoveRight, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Hero1 = () => {
  // Function to handle smooth scroll
  const scrollToVisiMisi = () => {
    const visiMisiSection = document.getElementById('visi-misi');
    if (visiMisiSection) {
      visiMisiSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const scrollToprogramKerja = () => {
    const visiMisiSection = document.getElementById('program-kerja');
    if (visiMisiSection) {
      visiMisiSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div className="w-full">
      <div className="container mx-auto">
        <div className="flex gap-8 py-20 lg:py-40 items-center justify-center flex-col">
          <div>
            <Button variant="secondary" size="sm" className="gap-2">
              Bergabung dengan UKM PENRISTEK <MoveRight className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex gap-4 flex-col">
            <h1 className="text-3xl md:text-5xl max-w-2xl tracking-tighter text-center font-semibold">
              UKM PENDIDIKAN, RISET, DAN TEKNOLOGI
            </h1>
            <p className="text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center">
              Menuju Unit Kegiatan Mahasiswa Terbaik Se-Indonesia Tahun 2045
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto px-4 sm:px-0">
            <Button
              size="lg"
              className="gap-2 sm:gap-2 w-full sm:w-auto text-sm sm:text-base"
              variant="outline"
              onClick={scrollToVisiMisi}
            >
              Tentang Kami <PhoneCall className="w-4 h-4 flex-shrink-0" />
            </Button>
            <Button
              size="lg"
              className="gap-2 sm:gap-2 w-full sm:w-auto text-sm sm:text-base"
              onClick={scrollToprogramKerja}
            >
              Program Kerja <MoveRight className="w-4 h-4 flex-shrink-0" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};