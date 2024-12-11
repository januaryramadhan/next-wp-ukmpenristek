"use client";
import { Section, Container } from "@/components/commons/craft";
import { MoveRight, PhoneCall, ArrowDownRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FlipWords } from "@/components/ui/flip-words";
import Image from "next/image";

export const Hero1 = () => {
  // Function to handle smooth scroll
  const scrollToNextSection = () => {
    const nextSection = document.getElementById("next-section"); // Add this ID to your next section
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Section className="py-10">
      <Container>
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <Image
              src="/hero-img.png"
              alt="UKM PENRISTEK"
              className="w-full rounded-md object-cover"
              width={500}
              height={500}
              layout="responsive"
            />
            <div className="flex my-[-95] flex-col items-center text-center lg:items-start lg:text-left">
              <h1 className="my-2 text-muted-foreground text-xl font-regular lg:text-3xl">
                Unit Kegiatan Mahasiswa
                <br />
                <FlipWords
                  words={["PENDIDIKAN", "RISET DAN", "TEKNOLOGI"]}
                  className="text-primary text-5xl font-extrabold dark:text-primary mb-2 md:text-6xl"
                  duration={2000}
                />
              </h1>
              <p className="mb-12 italic text-sm text-muted-foreground  lg:text-md">
                Menuju UKM Terbaik Se-Indonesia Tahun 2045
              </p>
              <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start"></div>
            </div>
          </div>
      </Container>
    </Section>
  );
};

export default Hero1;
