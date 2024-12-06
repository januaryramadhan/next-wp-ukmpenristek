"use client";

import { Button } from "@/components/ui/button";
import BoxReveal from "@/components/ui/box-reveal";
import React from "react";
import Link from "next/link";
import { MoveRight } from "lucide-react";

const PhotoboothHero: React.FC = () => {
  return (
    <div className="w-full">
      <div className="container mx-auto">
        <div className="flex gap-8 py-20 lg:py-40 items-center justify-center flex-col">
          <section className="size-full max-w-lg items-center justify-center overflow-hidden pt-8">
            <BoxReveal boxColor={"hsl(var(--primary))"} duration={0.5}>
              <p className="text-[3.5rem] font-semibold">
                Photobooth<span className="text-primary">.</span>
              </p>
            </BoxReveal>

            <BoxReveal boxColor={"hsl(var(--primary))"} duration={0.5}>
              <h2 className="mt-[.5rem] text-[1rem]">
                Abadikan <span className="text-primary">Momen Bersejarah</span>
              </h2>
            </BoxReveal>

            <BoxReveal boxColor={"hsl(var(--primary))"} duration={0.5}>
              <div className="mt-6">
                <p className="text-muted-foreground">
                  -&gt; Sertijab BPH UKM-UKM & Komunitas Mahasiswa UT Bogor
                  <br />
                  -&gt; Booth foto kece badai untuk kenangan tak terlupakan
                  <br />
                  -&gt; Harga spesial untuk pembelian{" "}
                  <span className="font-semibold text-primary">
                    tiket presale
                  </span>
                </p>
              </div>
            </BoxReveal>

            <BoxReveal boxColor={"hsl(var(--primary))"} duration={0.5}>
              <Link href="https://tally.so/r/wdQb2z">
                <Button size="lg" className="mt-[1.6rem] gap-2">
                  Pesan Sekarang <MoveRight className="w-4 h-4 flex-shrink-0" />
                </Button>
              </Link>
            </BoxReveal>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PhotoboothHero;
