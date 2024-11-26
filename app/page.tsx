import { Section, Container } from "@/components/commons/craft";
import { ProgramKerjaScroll } from "@/components/sections/program-kerja-scroll";
import { Hero1 } from "@/components/sections/hero1";
import { Stats } from "@/components/sections/stats";
import FAQ from "@/components/sections/faq";
import VisiMisi from "@/components/sections/visi-misi";
import { StrukturOrganisasi } from "@/components/charts/strukturOrganisasi";
import { NewestPost } from "@/components/sections/newest-post";
import KegiatanMingguIni from "@/components/sections/upcoming event";

export default async function Home() {
  return (
    <>
      <Hero1 />
      <KegiatanMingguIni />
      <NewestPost />
      <VisiMisi />
      <StrukturOrganisasi />
      <ProgramKerjaScroll />
      <Stats />
      <FAQ />
    </>
  );
}
