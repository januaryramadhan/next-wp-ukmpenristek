import { ProgramKerjaScroll } from "@/components/sections/program-kerja-scroll";
import  {Hero1}  from "@/components/sections/hero1";
import { Stats } from "@/components/sections/stats";
import FAQ from "@/components/sections/faq";
import VisiMisi from "@/components/sections/visi-misi";
import { StrukturOrganisasi } from "@/components/charts/strukturOrganisasi";
import { NewestPost } from "@/components/sections/newest-post";
import ProkerTerdekat from "@/components/sections/proker-terdekat";
import { HeroSharingSession } from "@/components/sections/hero-sharing-session";
import { PendaftaranAnggota } from "@/components/sections/pendaftaran-anggota";

export default function Home() {
  return (
    <>
      <HeroSharingSession />
      <PendaftaranAnggota />
      <Hero1 />
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
