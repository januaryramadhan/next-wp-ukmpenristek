"use client";
import { TypewriterEffect } from "../ui/typewriter-effect";
import { Button } from "../ui/button";
import Link from "next/link";
import { Section, Container } from "../commons/craft";

export function PendaftaranAnggota() {
  const words = [
    {
      text: "Bergabung",
    },
    {
      text: "sekarang",
    },
    {
      text: "dengan",
    },
    {
      text: "UKM",
      className: "text-primary dark:text-primary",
    },
    {
      text: "PENRISTEK",
      className: "text-primary dark:text-primary",
    },
  ];

  return (
    <Section>
      <Container>
        <div className="flex flex-col items-center justify-center min-h-[40rem]">
          <p className="text-muted-foreground text-base mb-4">
            Mari Belajar, Berkarya dan Berinovasi
          </p>

          <TypewriterEffect words={words} className="text-3xl" />

          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4 mt-10">
            <Button asChild>
              <Link
                href="https://sl.ut.ac.id/penristekregist"
                target="_blank"
                rel="noopener noreferrer"
                className="w-40"
              >
                Daftar Sekarang
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
