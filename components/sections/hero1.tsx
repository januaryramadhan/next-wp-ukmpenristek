"use client";

import { MoveRight, PhoneCall, ArrowDownRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";

export const Hero1 = () => {
  // Function to handle smooth scroll
  const scrollToVisiMisi = () => {
    const visiMisiSection = document.getElementById("visi-misi");
    if (visiMisiSection) {
      visiMisiSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const scrollToprogramKerja = () => {
    const visiMisiSection = document.getElementById("program-kerja");
    if (visiMisiSection) {
      visiMisiSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section className="py-32 ">
      <div className="container">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <Image
            src="/hero-img.png"
            alt="UKM PENRISTEK"
            className="w-full rounded-md object-cover"
            width={500} // specify the width of the image
            height={500} // specify the height of the image
            layout="responsive" // make the image responsive
          />
          <div className="flex my-[-80] flex-col items-center text-center lg:items-start lg:text-left">
            <h1 className="my-2 text-pretty text-3xl font-bold lg:text-6xl">
              UKM PENDIDIKAN, RISET, DAN TEKNOLOGI
            </h1>
            <p className="mb-12 max-w-xl text-muted-foreground lg:text-xl">
              Menuju Unit Kegiatan Mahasiswa Terbaik Se-Indonesia Tahun 2045
            </p>
            <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
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
    </section>
  );
};

export default Hero1;