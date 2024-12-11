"use client";
import { Section, Container } from "@/components/commons/craft";
import { FlipWords } from "@/components/ui/flip-words";
import { Badge } from "@/components/ui/badge"; // Import Badge component
import Image from "next/image";

export const Hero1 = () => {
  // Function to handle smooth scroll
  const scrollToNextSection = () => {
    const nextSection = document.getElementById("next-section");
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
            <div className="flex my-[-85] flex-col items-center text-center lg:items-start lg:text-left">
              {/* Replace text with Badge component */}
              <Badge 
                variant="default" 
                className="mb-4 text-base px-4"
              >
                Unit Kegiatan Mahasiswa
              </Badge>
              
              <h1 className="my-2">
                <FlipWords
                  words={["PENDIDIKAN", "RISET DAN", "TEKNOLOGI"]}
                  className="text-primary text-5xl font-extrabold dark:text-primary mb-2 md:text-6xl"
                  duration={2000}
                />
              </h1>
              <p className="mb-12 italic text-muted-foreground">
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