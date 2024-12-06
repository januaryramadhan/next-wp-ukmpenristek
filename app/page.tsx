import { ProgramKerjaScroll } from "@/components/sections/program-kerja-scroll";
import { Stats } from "@/components/sections/stats";
import FAQ from "@/components/sections/faq";
import VisiMisi from "@/components/sections/visi-misi";
import { StrukturOrganisasi } from "@/components/charts/strukturOrganisasi";
import { NewestPost } from "@/components/sections/newest-post";
import ProkerTerdekat from "@/components/sections/proker-terdekat";
import PhotoboothHero from "@/components/sections/hero-photo-booth";

export default function Home() {
  return (
    <>
      <PhotoboothHero />
      <ProkerTerdekat />
      <NewestPost />
      <VisiMisi />
      <StrukturOrganisasi />
      <ProgramKerjaScroll />
      <Stats />
      <FAQ />
    </>
  );
}
