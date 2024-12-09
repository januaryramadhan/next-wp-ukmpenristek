"use client";
import React from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import Image from "next/image";
import programkerja from '@/public/programkerja.png';
import { RxNotionLogo } from "react-icons/rx";

export function ProgramKerjaScroll() {
  return (
    <div id="program-kerja" className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-black dark:text-white">
              Program Kerja<br />
              1 Tahun Kabinet <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
              </span>
            </h1>
            
            <a 
              href="https://ukmpenristek.notion.site/Program-Kerja-UKM-10515417c02e80a4a9b8ef9166a54623?pvs=74" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 mt-4 text-base font-medium text-white bg-black rounded-lg hover:bg-gray-800 transition-colors duration-200"
            >
              <RxNotionLogo className="w-5 h-5 mr-2" />
              Lihat di Notion
            </a>
          </>
        }
      >
        <Image
          src={programkerja}
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false}
        />
      </ContainerScroll>
    </div>
  );
}